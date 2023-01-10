import { DrmConfiguration } from "./DrmConfiguration";

/**
 * NOTICE: the SourceDescription interfaces in this file are limited to the properties required in the
 * SampleReceiver app.
 *
 * For a full reference we refer to the API documentation:
 * https://docs.theoplayer.com/api-reference/web/theoplayer.sourcedescription.md
 */

/**
 * Describes the configuration of a player's source.
 *
 * @public
 */
export interface SourceDescription {
    sources: Source[];
}

/**
 * Represents a media resource characterized by a URL to the resource and optionally information about the resource.
 *
 * @public
 */
export interface Source {

    /**
     * The source URL of the media resource.
     */
    src: string | undefined;

    /**
     * The content protection parameters for the media resource.
     */
    contentProtection: DrmConfiguration | undefined;

    /**
     * The content protection parameters for the media resource.
     *
     * @deprecated Superseded by {@link contentProtection}.
     */
    drm: DrmConfiguration | undefined;
}
