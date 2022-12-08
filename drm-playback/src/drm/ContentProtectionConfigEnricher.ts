import { framework } from "chromecast-caf-receiver";
import { ContentProtection, PlaybackConfig } from "chromecast-caf-receiver/cast.framework";
import { DrmConfiguration } from "../source/DrmConfiguration";

export abstract class ContentProtectionConfigEnricher {

    protected constructor(readonly drmConfiguration: DrmConfiguration) {
    }

    // Enrich PlaybackConfig with KeySystem configuration properties.
    abstract enrich(playbackConfig: PlaybackConfig): void;

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

