# CHIEF for Android

This small native Android shell opens the existing, deployed CHIEF web app in
Android System WebView. It does not change the web app or bundle a server.

## Build

From this directory, run:

```sh
./gradlew assembleDebug
```

The installable debug APK is written to
`app/build/outputs/apk/debug/app-debug.apk`. Debug APKs are signed with the
standard local debug key and are intended for sideloading and testing, not
Google Play distribution. A release build needs a separately managed signing
key.

## Install and use

Install the APK on an Android device, open CHIEF, and enter the public HTTPS
address where the web app is deployed. The address is stored on that device.
The APK needs an internet connection and cannot work until the web app has a
public deployment.

The Android shell does not implement Bluetooth LE or firmware flashing. The
Garage connection and flash progress in the current web project remain
simulated; real scooter support requires a separate native implementation.
