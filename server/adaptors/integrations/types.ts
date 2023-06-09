/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

interface IntegrationTemplate {
  name: string;
  version: string;
  integrationType: string;
  license: string;
  author?: string;
  description?: string;
  sourceUrl?: string;
  statics?: {
    logo?: StaticAsset;
    gallery?: StaticAsset[];
    darkModeLogo?: StaticAsset;
    darkModeGallery?: StaticAsset[];
  };
  components: IntegrationComponent[];
  assets: {
    savedObjects?: {
      name: string;
      version: string;
    };
  };
}

interface StaticAsset {
  annotation?: string;
  path: string;
}

interface IntegrationComponent {
  name: string;
  version: string;
}

interface DisplayAsset {
  body: string;
}

interface IntegrationTemplateSearchResult {
  hits: IntegrationTemplate[];
}

interface IntegrationTemplateQuery {
  name?: string;
}

interface IntegrationInstance {
  name: string;
  templateName: string;
  dataSource: {
    sourceType: string;
    dataset: string;
    namespace: string;
  };
  creationDate: string;
  tags?: string[];
  status: string;
  assets: AssetReference[];
}

interface IntegrationInstanceResult extends IntegrationInstance {
  id: string;
}

interface AssetReference {
  assetType: string;
  assetId: string;
  status: string;
  isDefaultAsset: boolean;
  description: string;
}

interface IntegrationInstancesSearchResult {
  hits: IntegrationInstanceResult[];
}

interface IntegrationInstanceQuery {
  added?: boolean;
  id?: string;
}
