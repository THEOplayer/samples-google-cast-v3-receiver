/**
 * NOTICE: the DRMConfiguration interfaces in this file are limited to the properties required in the SampleReceiver app.
 *
 * For a full reference we refer to the API documentation:
 * https://docs.theoplayer.com/api-reference/web/theoplayer.drmconfiguration.md/#drmconfiguration-interface
 */

export type DrmIntegrationId = 'vudrm' | 'ezdrm';

/**
 * Describes the key system configuration.
 *
 * @public
 */
export interface KeySystemConfiguration {

    /**
     * The licence acquisition URL.
     *
     * @remarks
     * <br/> - If provided, the player will send license requests for the intended DRM scheme to the provided value.
     * <br/> - If not provided, the player will use the default license acquisition URLs.
     */
    licenseAcquisitionURL?: string;

    /**
     * The licence type.
     *
     * @internal
     */
    licenseType?: LicenseType;

    /**
     * Record of HTTP headers for the licence acquisition request.
     * Each entry contains a header name with associated value.
     */
    headers?: { [headerName: string]: string };

    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     *
     * @remarks
     * <br/> - Credentials are cookies, authorization headers or TLS client certificates.
     *
     * @defaultValue `false`
     */
    useCredentials?: boolean;

    /**
     * Record of query parameters for the licence acquisition request.
     * Each entry contains a query parameter name with associated value.
     */
    queryParameters?: { [key: string]: any }; /* eslint-disable-line @typescript-eslint/no-explicit-any */
}

/**
 * The type of the licence, represented by a value from the following list :
 * <br/> - `'temporary'`
 * <br/> - `'persistent'`
 *
 * @public
 */
export type LicenseType = 'temporary' | 'persistent';

/**
 * Describes the Widevine key system configuration.
 *
 * @public
 */
export type WidevineKeySystemConfiguration = KeySystemConfiguration

/**
 * Describes the ClearKey key system configuration.
 *
 * @public
 */
export interface ClearkeyKeySystemConfiguration extends KeySystemConfiguration {

    /**
     * List of decryption keys.
     */
    keys?: ClearkeyDecryptionKey[];
}

/**
 * Describes the ClearKey decryption key.
 *
 * @public
 */
export interface ClearkeyDecryptionKey {

    /**
     * The identifier of the key.
     *
     * @remarks
     * <br/> - This is a base64url encoding of the octet sequence containing the key ID.
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#clear-key-license-format | Clear Key License Format}.
     */
    id: string;

    /**
     * The value of the key.
     *
     * @remarks
     * <br/> - The base64url encoding of the octet sequence containing the symmetric key value.
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#clear-key-license-format | Clear Key License Format}.
     */
    value: string;
}

/**
 * Describes the configuration of the DRM.
 *
 * @public
 */
export interface DrmConfiguration {

    /**
     * The identifier of the DRM integration.
     */
    integration?: DrmIntegrationId;

    /**
     * The configuration of the Widevine key system.
     */
    widevine?: WidevineKeySystemConfiguration;

    /**
     * The configuration of the ClearKey key system.
     */
    clearkey?: ClearkeyKeySystemConfiguration;
}
