import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IoSearchOutline, IoNotificationsOutline, IoPersonCircleOutline } from 'react-icons/io5';
import tw from 'twrnc';

const Header = () => {
  return (
    <View style={tw`flex-row items-center justify-between bg-white p-4 shadow`}>
      
      {/* Logo */}
      <Image
        source={{ uri: 'https://your-logo-url.com/logo.png' }} // replace with your logo
        style={tw`w-10 h-10`}
        resizeMode="contain"
      />

      {/* Tabs */}
      <View style={tw`flex-row space-x-4 ml-4`}>
        {['Home', 'About', 'Services', 'Contact'].map((tab, index) => (
          <TouchableOpacity key={index}>
            <Text style={tw`text-base text-gray-800 font-semibold`}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Right side: Search + Icons */}
      <View style={tw`flex-row items-center space-x-4`}>
        
        {/* Search Bar */}
        <View style={tw`flex-row items-center border border-gray-300 rounded-full px-3 py-1`}>
          <IoSearchOutline size={16} color="#888" />
          <TextInput
            placeholder="Search"
            style={tw`ml-2 w-24 text-sm text-gray-700`}
            placeholderTextColor="#888"
          />
        </View>

        {/* Notification Icon */}
        <TouchableOpacity>
          <IoNotificationsOutline size={24} color="#333" />
        </TouchableOpacity>

        {/* User Icon */}
        <TouchableOpacity>
          <IoPersonCircleOutline size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
