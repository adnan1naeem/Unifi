import { StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import { Colors } from './src/Utils/Colors';
import * as Updates from 'expo-updates'

const App = () => {

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (e) {
    }
  }

  return (
    <SafeAreaProvider>

      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <Navigation />
    </SafeAreaProvider>
  )
}

export default App

