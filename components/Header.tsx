import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import tw from 'twrnc';

const CENTER_TABS = [
  { title: 'Show Patients', path: '/patientslist' },
  { title: 'Show Trials', path: '/triallist' },
  { title: 'Patient Form', path: '/patientdetails' },
  { title: 'Trial Form', path: '/trialdetails' },
  { title: 'Matched Patients', path: '/patient_match' },
];

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const NavButton = ({ title, path }: { title: string; path: string }) => {
    const isActive = pathname === path;
    return (
      <TouchableOpacity onPress={() => router.push(path as any)}>
        <Text
          style={tw.style(
            'text-base font-semibold mx-2',
            isActive ? 'text-purple-700 bold' : 'text-gray-600'
          )}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`bg-white py-4 px-3 border-b border-gray-200`}>
      <View style={tw`flex-row justify-between items-center`}>
        {/* Left: Logo (Clickable) */}
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() => router.push('/')}
        >
          <Image
            source={require('../assets/images/trialmatch.png')}
            style={tw`w-8 h-8 mr-2`}
            resizeMode="contain"
          />
          <Text style={tw`text-lg font-bold text-purple-700`}>Trial Match by P360 Solutions</Text>
        </TouchableOpacity>

        {/* Center: Navigation Tabs */}
        <View style={tw`flex-row items-center`}>
          {CENTER_TABS.map((tab) => (
            <NavButton key={tab.path} title={tab.title} path={tab.path} />
          ))}
        </View>

        {/* Right: Contact Us */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.p360.com/')}
        >
          <Text style={tw`text-base font-semibold text-purple-700 ml-4`}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
