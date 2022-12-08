import { DrmConfiguration } from '../../source/DrmConfiguration'
import { TitaniumIntegrationParameters } from "./TitaniumIntegrationParameters";

export type TitaniumIntegrationID = 'titaniumdrm';

export interface TitaniumDrmConfiguration extends DrmConfiguration {
  integration: TitaniumIntegrationID;

  integrationParameters: TitaniumIntegrationParameters;
}
