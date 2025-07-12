import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Switch, Alert } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const PatientForm = () => {
  const [formData, setFormData] = useState({
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
    EMG_result: '',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/patients', formData);
      Alert.alert('Success', 'Patient record created successfully!');
      setFormData({
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
        EMG_result: '',
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create patient record.');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white min-h-full`}>
      <Text style={tw`text-xl font-bold mb-4 text-center text-purple-700`}>New Patient Form</Text>

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Patient Name"
        value={formData.patient_name}
        onChangeText={(text) => handleChange('patient_name', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => handleChange('age', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Gender"
        value={formData.gender}
        onChangeText={(text) => handleChange('gender', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Symptom Duration (days)"
        keyboardType="numeric"
        value={formData.symptom_duration}
        onChangeText={(text) => handleChange('symptom_duration', text)}
      />

      {[
        'muscle_weakness',
        'twitching',
        'speech_difficulty',
        'swallowing_difficulty',
        'breathing_difficulty',
        'family_history',
      ].map((field) => (
        <View key={field} style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`text-base text-gray-700 capitalize`}>
            {field.replace(/_/g, ' ')}
          </Text>
          <Switch
            value={formData[field as keyof typeof formData] as boolean}
            onValueChange={(value) => handleChange(field, value)}
          />
        </View>
      ))}

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Previous Diagnosis"
        value={formData.previous_diagnosis}
        onChangeText={(text) => handleChange('previous_diagnosis', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Current Treatment"
        value={formData.current_treatment}
        onChangeText={(text) => handleChange('current_treatment', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3`}
        placeholder="Biomarker Status"
        value={formData.biomarker_status}
        onChangeText={(text) => handleChange('biomarker_status', text)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-4`}
        placeholder="EMG Result"
        value={formData.EMG_result}
        onChangeText={(text) => handleChange('EMG_result', text)}
      />

      <View style={tw`mb-8`}>
        <Button title="Submit" color="#734BD1" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default PatientForm;
