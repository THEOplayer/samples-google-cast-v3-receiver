import { NetworkRequestInfo } from "chromecast-caf-receiver/cast.framework";
import { fromUint8ArrayToNumberArray } from "../utils/TypeUtils";
import { WidevineConfigEnricher } from "./WidevineConfigEnricher";
import { WidevineKeySystemConfiguration } from "../source/DrmConfiguration";
import { VudrmConfiguration } from "./VudrmConfiguration";

export class VudrmWidevineConfigEnricher extends WidevineConfigEnricher {
    constructor(widevineContentProtection: WidevineKeySystemConfiguration,
                private readonly _vuDrmConfiguration: VudrmConfiguration) {
        super(widevineContentProtection, 'https://widevine-proxy.drm.technology/proxy');
    }

    _handleLicenseRequest(request: NetworkRequestInfo): void {
        request.headers = {
            ...request.headers,
            'Content-Type': 'text/plain;charset=UTF-8'
        };

        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const drmInfo = fromUint8ArrayToNumberArray(request.content!);
        request.content = JSON.stringify({
            drm_info: drmInfo,
            token: this._vuDrmConfiguration.token,
            kid: this._vuDrmConfiguration.keyId
        }) as any; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    }
}
