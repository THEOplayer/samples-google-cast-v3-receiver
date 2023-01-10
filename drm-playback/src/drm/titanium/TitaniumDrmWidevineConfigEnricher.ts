import { NetworkRequestInfo } from "chromecast-caf-receiver/cast.framework";
import { WidevineConfigEnricher } from "../WidevineConfigEnricher";
import { TitaniumDrmConfiguration } from "./TitaniumDrmConfiguration";
import { createTitaniumHeaders, TitaniumCDMType } from "./TitaniumBaseRegistration";
import { isTitaniumDRMConfiguration } from "./TitaniumUtils";
import { DrmConfiguration } from "../../source/DrmConfiguration";

export class TitaniumDrmWidevineConfigEnricher extends WidevineConfigEnricher {

    constructor(drmConfiguration: DrmConfiguration,
                private readonly _titaniumDrmConfiguration: TitaniumDrmConfiguration) {
        super(drmConfiguration);
        if (!isTitaniumDRMConfiguration(drmConfiguration)) {
            throw Error('Invalid Titanium DRM configuration.')
        }
    }

    _handleLicenseRequest(request: NetworkRequestInfo): void {
        request.headers = {
            ...request.headers,
            ...createTitaniumHeaders(this._titaniumDrmConfiguration, TitaniumCDMType.WIDEVINE)
        };
    }
}
