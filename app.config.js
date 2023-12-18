module.exports = {
  name: "Unifi Hotspot Manager",
  slug: "Unifi_native",
  version: "1.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  updates: {
    enabled: true,
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/27756e8b-a80e-4206-a5cb-1df4ce0f0932"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.frg-technology.unifihotspotmanager",
    buildNumber: "1.0.2"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.unifimanager.hotspot"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  runtimeVersion: "1.0.0",
  extra: {
    eas: {
      projectId: "27756e8b-a80e-4206-a5cb-1df4ce0f0932"
    }
  }
};