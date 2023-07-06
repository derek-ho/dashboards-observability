/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiPageContent,
  EuiSpacer,
  EuiTableFieldDataColumnType,
  EuiText,
} from '@elastic/eui';
import _ from 'lodash';
import React from 'react';
import { AddedIntegrationsTableProps } from './added_integration_overview_page';
import { ASSET_FILTER_OPTIONS } from '../../../../common/constants/explorer';

export function AddedIntegrationsTable(props: AddedIntegrationsTableProps) {
  const integrations = props.data.hits;

  const tableColumns = [
    {
      field: 'name',
      name: 'Asset name',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiLink data-test-subj={`${record.name}IntegrationLink`} href={`#/added/${record.id}`}>
          {_.truncate(record.name, { length: 100 })}
        </EuiLink>
      ),
    },
    {
      field: 'source',
      name: 'Source',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiLink
          data-test-subj={`${record.templateName}IntegrationDescription`}
          href={`#/available/${record.templateName}`}
        >
          {_.truncate(record.templateName, { length: 100 })}
        </EuiLink>
      ),
    },
    {
      field: 'type',
      name: 'Type',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiText data-test-subj={`${record.templateName}IntegrationDescription`}>
          {_.truncate(record.dataSource.sourceType, { length: 100 })}
        </EuiText>
      ),
    },
    {
      field: 'dateAdded',
      name: 'Date Added',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiText data-test-subj={`${record.templateName}IntegrationDescription`}>
          {_.truncate(record.creationDate, { length: 100 })}
        </EuiText>
      ),
    },
    {
      field: 'status',
      name: 'Status',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiText data-test-subj={`${record.name}IntegrationStatus`}>
          {_.truncate(record.status, { length: 100 })}
        </EuiText>
      ),
    },
  ] as Array<EuiTableFieldDataColumnType<any>>;

  const FILTER_OPTIONS = ['logs'];

  const search = {
    box: {
      incremental: true,
    },
    filters: [
      {
        type: 'field_value_selection',
        field: 'type',
        name: 'Type',
        multiSelect: false,
        options: ASSET_FILTER_OPTIONS.map((i) => ({
          value: i,
          name: i,
          view: i,
        })),
      },
    ],
  };

  return (
    <EuiPageContent data-test-subj="addedIntegrationsArea">
      <EuiSpacer />
      {integrations && integrations.length > 0 ? (
        <EuiInMemoryTable
          loading={props.loading}
          items={integrations}
          itemId="id"
          columns={tableColumns}
          tableLayout="auto"
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [5, 10, 15],
          }}
          search={search}
          // sorting={{
          //   sort: {
          //     field: 'dateModified',
          //     direction: 'desc',
          //   },
          // }}
          allowNeutralSort={false}
          isSelectable={true}
          // selection={{
          //   onSelectionChange: (items) => setSelectedApplications(items),
          // }}
        />
      ) : (
        <>
          <EuiFlexGroup direction="column" alignItems="center">
            <EuiFlexItem grow={true}>
              <EuiIcon size="xxl" type="help" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiText textAlign="center" data-test-subj="no-added-integrations">
            <h2>
              There are currently no added integrations. Add them{' '}
              <EuiLink href={'#/available'}>here</EuiLink> to start using pre-canned assets!
            </h2>
          </EuiText>
          <EuiSpacer size="m" />
        </>
      )}
    </EuiPageContent>
  );
}
