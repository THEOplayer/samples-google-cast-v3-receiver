import { framework } from "chromecast-caf-receiver";
import { ContentProtection, NetworkRequestInfo, PlaybackConfig } from "chromecast-caf-receiver/cast.framework";
import { KeySystemConfiguration } from "../source/DrmConfiguration";

export abstract class ContentProtectionConfigEnricher {

    protected constructor(private readonly _keySystemConfiguration: KeySystemConfiguration) {
    }

    // Enrich PlaybackConfig with KeySystem configuration properties.
    enrich(playbackConfig: PlaybackConfig) {
        playbackConfig.licenseUrl = this.licenseUrl;
        playbackConfig.licenseHandler = (data: Uint8Array): Uint8Array | Promise<Uint8Array> => this._handleLicense(data);
        playbackConfig.licenseRequestHandler = (request: NetworkRequestInfo) => {
            request.withCredentials = this._keySystemConfiguration.useCredentials ?? false;
            request.headers = {
                ...request.headers,
                ...this._keySystemConfiguration.headers
            };
            this._handleLicenseRequest(request);
        };
        playbackConfig.protectionSystem = this.protectionSystem;
    }

    abstract licenseUrl?: string;

    // noinspection JSMethodCanBeStatic
    _handleLicense(data: Uint8Array): Uint8Array | Promise<Uint8Array> {
        // By default, just pass the unmodified license.
        return data;
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _handleLicenseRequest(_request: framework.NetworkRequestInfo): void {
        // By default, do not modify the request.
    }

    abstract protectionSystem: ContentProtection;
}

