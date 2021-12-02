# THEOplayer Cast Receiver Reference App

### Table of contents

1. [Overview](#overview)
2. [Building the Cast App](#building-the-cast-app)
3. [Creating a SampleReceiver instance](#creating-a-samplereceiver-instance)
4. [Processing load events](#processing-load-events)
5. [Source description](#source-description)
6. [DRM configuration](#drm-configuration)
7. [Targeting the Cast Receiver application](#targeting-the-cast-receiver-application)
8. [Conclusion](#conclusion)

### Overview
The sample application outlined in this document demonstrates the creation of a
[Custom CAFv3 Web Receiver app](https://developers.google.com/cast/docs/web_receiver#custom_web_receiver)
with the ability to play-out content, either clear or DRM protected, provided by a connected THEOplayer sender application.

### Building the Cast App

1. Install the NPM dependencies by running `npm install`

2. Bundle the Javascript into a library with `npm run build`.
   
The library will be created under `dist/bundle.js` and is referred to by `index.html`. 

```javascript
<script type="text/javascript" src="dist/bundle.js"/>
```

### Creating a SampleReceiver instance

The rest of `index.html` creates an instance of `SampleReceiver`, the actual receiver,
and initializes the receiver context so it can receive requests from senders.

```javascript
// Create new sample Receiver.
const receiver = new THEOdemo.SampleReceiver();

// Start receiving requests from senders.
receiver.start();
```

### Processing load events
A message interceptor for 
[`MessageType.LOAD`](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages#.MessageType) 
events is 
[registered](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.PlayerManager#setMessageInterceptor)
during construction of the `SampleReceiver`.
It allows adding custom logic on incoming load requests from a sender device.

```javascript
// Provide an interceptor for LOAD messages.
this._playerManager.setMessageInterceptor(MessageType.LOAD, this._handleLoad);
```

The load interceptor from the sample application demonstrates how to:

- Extract a source description from the incoming [`LoadRequestData`](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.LoadRequestData)
- Optionally configure content protection (DRM)

### Source description

The content's source description is passed in `LoadRequestData`'s
[`customData`](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.LoadRequestData#customData)
property. A typical source description for a content protected DASH stream, in this case using the VuDrm integration, looks like this:

```javascript
{
    sources: [
        {
            src: '<manifest_url>',
            contentProtection: {
                widevine: {
                    licenseAcquisitionURL: '<license_url>'
                },
                preferredKeySystems: ['widevine'],
                integration: 'vudrm',
                integrationParameters: {
                    token: '<vudrm_token>',
                    keyId: '<keyId>'
                }
            }
        }
    ],
}
```

For a full overview of the `SourceDescription` interface we refer to the
[THEOplayer API documentation](https://docs.theoplayer.com/api-reference/web/theoplayer.sourcedescription.md).

### DRM configuration

In case the content is DRM protected, the `contentProtection` field of the source description contains an instance of
[`DRMConfiguration`](https://docs.theoplayer.com/api-reference/web/theoplayer.drmconfiguration.md/#drmconfiguration-interface).
The `integration` value tells the player what the expected format of the license request and response are. 
In the sample receiver app we demonstrate just these two Widevine integrations:

- "_ezdrm_": as the name implies, the EZDRM integration passes license requests and responses without modification.
- "_vudrm_": the Vualto VuDRM integration wraps the license request with extra token and keyId properties.

Details on these and other DRM integrations, along with comprehensive samples, can be found in the
[THEOplayer DRM integrations](https://github.com/THEOplayer/samples-drm-integration) project.

In the sample receiver app the drm properties are configured on the playbackConfig object through the
[`ContentProtectionConfigEnricher`](./src/drm/ContentProtectionConfigEnricher.ts).
It reads the `contentProtection` object and, depending on the integration, adds the necessary properties.
Most importantly:

- _protectionSystem_: the content proptection type, e.g. "widevine"
- _licenseUrl_: the license server url
- _licenseRequestHandler_: a hook function to modify the license request sent to the license server
- _licenseHandler_: a hook function to alter the license response returned from the license server

The remaining part of the SampleReceiver involves setup and the attachment of some event listeners that log
PLAY, PAUSE and ERROR events, for demonstration purposes only.

Debug logs can be viewed by connecting remotely to the cast device or as an overlay to the content by calling `showDebugLogs` in `SampleReceiver.ts`
```javascript
this._castDebugLogger.showDebugLogs(true);
```

### Targeting the Cast Receiver application

Before the receiver app can be used as a target, it needs to be publicly hosted and registered with
[Google Cast SDK Developer Console](https://cast.google.com/publish) to receive an _application ID_.
When a sender app references this application ID in THEOplayer's configuration, the receiver device
knows which application to run:

```javascript
const player = new THEOplayer.Player(element, {
    cast: {
        chromecast: {
            appID: '<YOUR_APP_ID>'
        }
    }
});
```

### Conclusion

This document showed how a sample Web Cast Receiver app loads an optionally drm-protected resource passed 
by a cast sender app integrated with THEOplayer.

Consult the [THEOplayer documentation](https://docs.theoplayer.com/) for more information,
or reach out to the THEO support team with specific questions.
