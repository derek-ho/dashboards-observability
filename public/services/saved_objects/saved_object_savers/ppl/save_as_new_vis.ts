/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { uuidRx } from '../../../../../public/components/custom_panels/redux/panel_slice';
import {
  SAVED_OBJECT_ID,
  SAVED_OBJECT_TYPE,
  SAVED_VISUALIZATION,
} from '../../../../../common/constants/explorer';
import { ISavedObjectsClient } from '../../saved_object_client/client_interface';
import { SavedQuerySaver } from './saved_query_saver';

export class SaveAsNewVisualization extends SavedQuerySaver {
  constructor(
    private readonly saveContext,
    protected readonly dispatchers,
    private readonly saveClient: ISavedObjectsClient,
    private readonly panelClient,
    private readonly saveParams
  ) {
    super(dispatchers);
  }

  save(): void {
    const { batch, dispatch, changeQuery, updateTabName } = this.dispatchers;
    const {
      tabId,
      history,
      notifications,
      addVisualizationToPanel,
      appLogEvents,
    } = this.saveContext;
    const { name, selectedPanels } = this.saveParams;

    this.saveClient
      .create({ ...this.saveParams })
      .then((res: any) => {
        notifications.toasts.addSuccess({
          title: 'Saved successfully.',
          text: `New visualization '${name}' has been successfully saved.`,
        });

        if (selectedPanels?.length)
          this.addToPanel({ selectedPanels, saveTitle: name, notifications, visId: res.objectId });

        if (appLogEvents) {
          addVisualizationToPanel(res.objectId, name);
        } else {
          history.replace(`/event_analytics/explorer/${res.objectId}`);
        }

        batch(() => {
          dispatch(
            changeQuery({
              tabId,
              query: {
                [SAVED_OBJECT_ID]: res.objectId,
                [SAVED_OBJECT_TYPE]: SAVED_VISUALIZATION,
              },
            })
          );
          dispatch(
            updateTabName({
              tabId,
              tabName: name,
            })
          );
        });
      })
      .catch((error: any) => {
        notifications.toasts.addError(error, {
          title: `Cannot save Visualization '${name}'`,
        });
      });
  }

  addToPanel({ selectedPanels, saveTitle, notifications, visId }) {
    const soPanels = selectedPanels.filter((panel) => panel.panel.id.test(uuidRx));
    const opsPanels = selectedPanels.filter((panel) => !panel.panel.id.test(uuidRx));
    this.panelClient
      .updateBulk({
        selectedCustomPanels: opsPanels,
        savedVisualizationId: visId,
      })
      .then((res: any) => {
        notifications.toasts.addSuccess({
          title: 'Saved successfully.',
          text: `Visualization '${saveTitle}' has been successfully saved to operation panels.`,
        });
      })
      .catch((error: any) => {
        notifications.toasts.addError(error, {
          title: 'Failed to save',
          text: `Cannot add Visualization '${saveTitle}' to operation panels`,
        });
      });
  }
}
