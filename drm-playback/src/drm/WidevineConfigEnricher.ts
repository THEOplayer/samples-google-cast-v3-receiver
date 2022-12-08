import { ContentProtection, NetworkRequestInfo, PlaybackConfig } from "chromecast-caf-receiver/cast.framework";
import { ContentProtectionConfigEnricher } from "./ContentProtectionConfigEnricher";
import { DrmConfiguration } from "../source/DrmConfiguration";

export class WidevineConfigEnricher extends ContentProtectionConfigEnricher {
    constructor(drmConfiguration: DrmConfiguration,
                private readonly _fallbackLicenseUrl?: string) {
        super(drmConfiguration);
    }

    // Enrich PlaybackConfig with KeySystem configuration properties.
    enrich(playbackConfig: PlaybackConfig): void {
        playbackConfig.licenseUrl = this.licenseUrl;
        playbackConfig.licenseHandler = (data: Uint8Array): Uint8Array | Promise<Uint8Array> => this._handleLicense(data);
        playbackConfig.licenseRequestHandler = (request: NetworkRequestInfo) => {
            request.withCredentials = this.drmConfiguration.widevine?.useCredentials ?? false;
            request.headers = {
                ...request.headers,
                ...this.drmConfiguration.widevine?.headers
            };
            this._handleLicenseRequest(request);
        };
        playbackConfig.protectionSystem = this.protectionSystem;
    }

    get licenseUrl(): string | undefined {
        return this.drmConfiguration.widevine?.licenseAcquisitionURL ?? this._fallbackLicenseUrl;
    }

    get protectionSystem(): ContentProtection {
        return ContentProtection.WIDEVINE;
    }
}
