// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen name="patientslist" options={{ title: 'Show Patients' }} />
      <Tabs.Screen name="triallist" options={{ title: 'Show Trials' }} />
      <Tabs.Screen name="patientdetails" options={{ title: 'Patient Form' }} />
      <Tabs.Screen name="trialdetails" options={{ title: 'Trial Form' }} />
      <Tabs.Screen name="patient_match" options={{ title: 'Matched Patients' }} />
    </Tabs>
  );
}
