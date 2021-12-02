import { ContentProtection } from "chromecast-caf-receiver/cast.framework";
import { ContentProtectionConfigEnricher } from "./ContentProtectionConfigEnricher";
import { WidevineKeySystemConfiguration } from "../source/DrmConfiguration";

export class WidevineConfigEnricher extends ContentProtectionConfigEnricher {
    constructor(protected readonly _widevineConfiguration: WidevineKeySystemConfiguration,
                private readonly _fallbackLicenseUrl?: string) {
        super(_widevineConfiguration);
    }

    get licenseUrl(): string | undefined {
        return this._widevineConfiguration.licenseAcquisitionURL ?? this._fallbackLicenseUrl;
    }

    get protectionSystem(): ContentProtection {
        return ContentProtection.WIDEVINE;
    }
}
