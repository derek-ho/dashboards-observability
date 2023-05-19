import {
  EuiButton,
  EuiCard,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPanel,
  EuiSelectOption,
  EuiSpacer,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiText,
  EuiTitle,
  EuiOverlayMask,
} from '@elastic/eui';
import _ from 'lodash';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';
import React, { ReactChild, useEffect, useState } from 'react';
import { getCustomModal } from '../../custom_panels/helpers/modal_containers';
import {
  AvailableIntegrationsCardViewProps,
  AvailableIntegrationType,
} from './available_integration_overview_page';

export function AvailableIntegrationsCardView(props: AvailableIntegrationsCardViewProps) {
  console.log(props);
  const rowNumber = _.ceil(props.records / 5);
  //   console.log(rowNumber)

  //             title={feature}
  //             onClick={() => {
  //               window.location.assign(`#/placeholder/${feature}`);
  //             }}

  const getImage = (url?: string) => {
    let optionalImg;
    if (url) {
      optionalImg = (
        <img style={{ height: 100, width: 100 }} alt="" className="synopsisIcon" src={url} />
      );
    }
    return optionalImg;
  };

  // const classes = classNames('homSynopsis__card', {
  //   'homSynopsis__card--noPanel': !wrapInPanel,
  // });

  const renderRows = (integrations: AvailableIntegrationType[]) => {
    if (!integrations || !integrations.length) return null;
    return (
      <>
        <EuiFlexGroup gutterSize="l" style={{ flexWrap: 'wrap' }}>
          {integrations.map((i, v) => {
            return (
              <EuiFlexItem key={v} style={{ minWidth: '14rem', maxWidth: '14rem' }}>
                <EuiCard
                  // className={classes}
                  layout="vertical"
                  icon={getImage(i.assetUrl)}
                  titleSize="xs"
                  title={i.templateName}
                  description={i.description}
                  data-test-subj={`homeSynopsisLink${i.templateName.toLowerCase()}`}
                  footer={
                    <div>
                      <EuiButton
                        aria-label="Go to Developers Tools"
                        onClick={() => {
                          window.location.assign(`#/available/${i.templateName}`);
                        }}
                      >
                        View Details
                      </EuiButton>
                      <EuiSpacer />
                      <EuiButton
                        aria-label="Go to Developers Tools"
                        onClick={() => {
                          props.showModal(i.templateName);
                        }}
                        size="s"
                      >
                        Add
                      </EuiButton>
                    </div>
                  }
                />
              </EuiFlexItem>
            );
          })}
        </EuiFlexGroup>
        <EuiSpacer />
      </>
    );
  };

  return <>{renderRows(props.data.data?.integrations)}</>;
}

//   Synopsis.propTypes = {
//     description: PropTypes.string.isRequired,
//     iconUrl: PropTypes.string,
//     iconType: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     url: PropTypes.string,
//     onClick: PropTypes.func,
//     isBeta: PropTypes.bool,
//   };

//   Synopsis.defaultProps = {
//     isBeta: false,
//   };
