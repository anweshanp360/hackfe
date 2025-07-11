// app/index.tsx
import React from 'react';
import { View, Text } from 'react-native';
// import MainApp from './MainApp'; // Uncomment if you have a new main component

export default function Index() {
  // return <MainApp />; // Use your new root component here

  // Temporary fallback UI if no navigator exists yet
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App</Text>
    </View>
  );
}
