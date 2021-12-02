import { CastReceiverContext, PlaybackConfig, PlayerManager } from "chromecast-caf-receiver/cast.framework";
import {
    ErrorData,
    ErrorReason,
    ErrorType, LoadRequestData,
    MessageType,
} from "chromecast-caf-receiver/cast.framework.messages";
import { EventType, MediaElementEvent, ErrorEvent } from "chromecast-caf-receiver/cast.framework.events";
import { ContentProtectionConfigEnricher } from "./drm/ContentProtectionConfigEnricher";
import { DrmConfiguration } from "./source/DrmConfiguration";
import { VudrmWidevineConfigEnricher } from "./drm/VudrmWidevineConfigEnricher";
import { WidevineConfigEnricher } from "./drm/WidevineConfigEnricher";
import { VudrmConfiguration } from "./drm/VudrmConfiguration";
import { Source, SourceDescription } from "./source/SourceDescription";
import { CastDebugLogger } from "chromecast-caf-receiver/cast.debug";

const LOG_RECEIVER_TAG = 'SampleReceiver';

export class SampleReceiver {
    private readonly _context: CastReceiverContext;
    private readonly _playerManager: PlayerManager;
    private readonly _castDebugLogger: CastDebugLogger;

    constructor() {
        this._context = CastReceiverContext.getInstance();
        this._playerManager = this._context.getPlayerManager();

        this._castDebugLogger = CastDebugLogger.getInstance();
        this._castDebugLogger.setEnabled(true);
        this._castDebugLogger.loggerLevelByEvents = {
            'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
            'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
        };
        if (!this._castDebugLogger.loggerLevelByTags) {
            this._castDebugLogger.loggerLevelByTags = {};
        }
        this._castDebugLogger.loggerLevelByTags[LOG_RECEIVER_TAG] = cast.framework.LoggerLevel.DEBUG;
        // Set to true to show debug overlay.
        this._castDebugLogger.showDebugLogs(false);

        // Provide an interceptor for LOAD messages.
        this._playerManager.setMessageInterceptor(MessageType.LOAD, this._handleLoad);

        // Add basic event listeners
        this._playerManager.addEventListener(EventType.PLAY, this.handlePlayEvent_);
        this._playerManager.addEventListener(EventType.PAUSE, this.handlePauseEvent_);
        this._playerManager.addEventListener(EventType.ERROR, this.handleErrorEvent_);
    }

    // Start receiving requests from senders.
    public start() {
        this._context.start();
    }

    // Setup playbackConfig with a sourceDescription license information passed by loadRequestData.
    private readonly _handleLoad = (loadRequestData: LoadRequestData) => {
        // If the loadRequestData is incomplete, return an error message
        if (!loadRequestData || !loadRequestData.media) {
            const error = new ErrorData(ErrorType.LOAD_FAILED);
            error.reason = ErrorReason.INVALID_REQUEST;
            return error;
        }

        // Check for sourceDescription
        const sourceDescription: SourceDescription = loadRequestData?.customData?.sourceDescription;
        const selectedSource = sourceDescription?.sources?.find((source: Source) => {
            return source.src === loadRequestData.media.contentId || source.src === loadRequestData.media.contentUrl;
        });
        if (selectedSource) {
            const playbackConfig = Object.assign(new PlaybackConfig(), this._playerManager.getPlaybackConfig());

            // Check for contentProtection (DRM)
            const contentProtection = selectedSource.contentProtection;
            if (contentProtection) {
                // Enrich playbackConfig with contentProtection properties.
                createContentProtectionConfigEnricher(contentProtection)?.enrich(playbackConfig);
            }

            this._playerManager.setPlaybackConfig(playbackConfig);
        }

        return loadRequestData;
    };

    private readonly handlePlayEvent_ = (event: MediaElementEvent): void => {
        this._castDebugLogger.debug(LOG_RECEIVER_TAG, 'PLAY event received', event.currentMediaTime);
    };

    private readonly handlePauseEvent_ = (event: MediaElementEvent): void => {
        this._castDebugLogger.debug(LOG_RECEIVER_TAG, 'PAUSE event received', event.currentMediaTime);
    };

    private readonly handleErrorEvent_ = (event: ErrorEvent): void => {
        this._castDebugLogger.error(LOG_RECEIVER_TAG, 'Detailed Error Code - ' + event.detailedErrorCode);
    };
}

// Create an enricher to apply the contentProtection properties to a playbackConfig instance.
export function createContentProtectionConfigEnricher(contentProtection: DrmConfiguration): ContentProtectionConfigEnricher | undefined {
    // Widevine DRM
    if (contentProtection.widevine) {
        switch (contentProtection.integration) {
            case 'vudrm':
                return new VudrmWidevineConfigEnricher(contentProtection.widevine, contentProtection as VudrmConfiguration);
            case 'ezdrm':
            default:
                return new WidevineConfigEnricher(contentProtection.widevine);
        }
    }
    return undefined;
}
