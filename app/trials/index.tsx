import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const API_URL = 'http://localhost:3000/api/trials';

const TrialTable = () => {
  const [trials, setTrials] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTrials, setFilteredTrials] = useState<any[]>([]);

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const response = await axios.get(API_URL);
      setTrials(response.data);
      setFilteredTrials(response.data);
    } catch (error: any) {
      console.error('Error fetching trials:', error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTrials();
      Alert.alert('Success', 'Trial deleted successfully');
    } catch (error: any) {
      console.error('Delete error:', error.message);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = trials.filter((trial) =>
      trial.trial_name.toLowerCase().includes(text.toLowerCase()) ||
      trial.sponsor.toLowerCase().includes(text.toLowerCase()) ||
      trial.status.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTrials(filtered);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={tw`flex-row border-b border-gray-300 py-2 px-2 items-center`}>
      <View style={tw`flex-1`}><Text>{item.trial_name}</Text></View>
      <View style={tw`flex-1`}><Text>{item.sponsor}</Text></View>
      <View style={tw`flex-1`}><Text>{item.status}</Text></View>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          style={tw`bg-red-500 px-3 py-1 rounded`}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={tw`text-white font-semibold`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`p-4 bg-white flex-1`}>
      <Text style={tw`text-xl font-bold mb-4 text-center`}>Trial Data</Text>

      <TextInput
        placeholder="Search Trials..."
        value={search}
        onChangeText={handleSearch}
        style={tw`border border-gray-300 rounded p-2 mb-4`}
      />

      <FlatList
        data={filteredTrials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={tw`text-center text-gray-500`}>No trials found</Text>}
      />
    </View>
  );
};

export default TrialTable;
