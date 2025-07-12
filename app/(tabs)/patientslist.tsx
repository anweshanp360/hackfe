import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const API_URL = 'http://localhost:3000/api/patients'; // Adjust for your local/hosted API

type PatientForm = {
  id?: number;
  patient_name: string;
  age: string | number;
  gender: string;
  symptom_duration: string;
  muscle_weakness: boolean;
  twitching: boolean;
  speech_difficulty: boolean;
  swallowing_difficulty: boolean;
  breathing_difficulty: boolean;
  family_history: boolean;
  previous_diagnosis: string;
  current_treatment: string;
  biomarker_status: string;
  EMG_result: string;
};


const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
const [form, setForm] = useState<PatientForm>({
  patient_name: '',
  age: '',
  gender: '',
  symptom_duration: '',
  muscle_weakness: false,
  twitching: false,
  speech_difficulty: false,
  swallowing_difficulty: false,
  breathing_difficulty: false,
  family_history: false,
  previous_diagnosis: '',
  current_treatment: '',
  biomarker_status: '',
  EMG_result: ''
});


  // Fetch all patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(API_URL);
      setPatients(res.data || []);
    } catch (error) {
      console.error('❌ Error fetching patients:', error);
    }
  };

  const handleDelete = async (id:any) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this patient?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPatients();
          } catch (err) {
            console.error('❌ Error deleting patient:', err);
          }
        }
      }
    ]);
  };

  const handleEdit = (patient:any) => {
    setEditingId(patient.patient_id);
    setForm(patient);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
      fetchPatients();
    } catch (err) {
      console.error('❌ Error updating patient:', err);
    }
  };

  const renderItem = ({ item }: { item: PatientForm }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={tw`bg-white p-4 my-2 rounded-lg shadow`}>
        {isEditing ? (
          <>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-2`}
              value={form.patient_name}
              onChangeText={(text) => setForm({ ...form, patient_name: text })}
              placeholder="Patient Name"
            />
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-2`}
              value={String(form.age)}
              onChangeText={(text) => setForm({ ...form, age: text })}
              placeholder="Age"
              keyboardType="numeric"
            />
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-2`}
              value={form.gender}
              onChangeText={(text) => setForm({ ...form, gender: text })}
              placeholder="Gender"
            />
            <TouchableOpacity onPress={handleUpdate} style={tw`bg-green-600 p-2 rounded mb-2`}>
              <Text style={tw`text-white text-center`}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingId(null)} style={tw`bg-gray-400 p-2 rounded`}>
              <Text style={tw`text-white text-center`}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={tw`text-lg font-bold`}>{item.patient_name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Gender: {item.gender}</Text>
            <View style={tw`flex-row mt-2`}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={tw`bg-yellow-500 px-3 py-1 rounded mr-2`}
              >
                <Text style={tw`text-white`}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={tw`bg-red-500 px-3 py-1 rounded`}
              >
                <Text style={tw`text-white`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>Patients List</Text>
      <FlatList
        data={patients}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={tw`text-center text-gray-500`}>No patients found.</Text>}
      />
    </View>
  );
};

export default PatientsList;
