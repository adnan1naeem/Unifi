import { StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/Navigation';

const App = () => {


  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </SafeAreaProvider>
  )
}

export default App

