# THEOplayer Cast Receiver Reference App

### License
This project falls under the license as defined in [https://github.com/THEOplayer/license-and-disclaimer](https://github.com/THEOplayer/license-and-disclaimer).

### Introduction
The sample application outlined in this project demonstrates the creation of a
[Custom CAFv3 Web Receiver app](https://developers.google.com/cast/docs/web_receiver#custom_web_receiver)
with the ability to play-out content provided by a connected THEOplayer sender application.

Building a receiver app using the v3 Cast Application Framework (CAFv3) 
[is considered to be preferable](https://developers.google.com/cast/docs/migrate_v2/android_sender)
to using the v2 Cast SDK because it is more consistent with the new CAF sender APIs, and has, among other things, 
support for voice control with Google Assistant, built-in ads and better queueing.
However, it currently does not support a user-provided player, so it is mandatory to use the integrated player,
either Shaka or MPL. The example project shows how the receiver can interact with a THEOplayer sender application.

A _Web Receiver application_ is an HTML5/JavaScript application that runs on the Web Receiver device,
such as a Chromecast. It comes with a built-in media player that provides a seamless and easy
playback experience. It also allows a customized player UI and provides the ability to intercept 
and override messages and methods to execute custom business logic.

The _sender application_ runs on the device held by the user, and manages the user's interaction
with the content. For sender applications, Google Cast supports app development for
Android, iOS, and Cast-supported web platforms.
The sender application will not be covered in this document. We refer to the THEOplayer sample repositories
for the corresponding platforms:

- Android: https://github.com/THEOplayer/samples-android-sdk
- iOS: https://github.com/THEOplayer/samples-ios-sdk
- Web: https://github.com/THEOplayer/samples-html5-sdk

Read more about how THEOplayer works with Chromecast in the
[THEOplayer documentation](https://docs.theoplayer.com/how-to-guides/03-cast/01-chromecast/00-introduction.md). 

### Getting started
- [Play-out of DRM protected content](./drm-playback/README.MD)
