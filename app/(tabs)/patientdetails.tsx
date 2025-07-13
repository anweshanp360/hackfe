import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    gender: "",
    symptom_duration: "",
    muscle_weakness: false,
    twitching: false,
    speech_difficulty: false,
    swallowing_difficulty: false,
    breathing_difficulty: false,
    family_history: false,
    previous_diagnosis: "",
    current_treatment: "",
    biomarker_status: "",
    EMG_result: "",
  });
  const [pythonResult, setPythonResult] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const requiredFields = [
      "patient_name",
      "age",
      "gender",
      "symptom_duration",
      "previous_diagnosis",
      "current_treatment",
      "biomarker_status",
      "EMG_result",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        errors[field] = "This field is required.";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }
const payload = {
  ...formData,
  age: parseInt(formData.age, 10),
  symptom_duration: parseInt(formData.symptom_duration, 10),
};
    try {
      const response = await axios.post(
        "http://localhost:3000/api/patients",
        payload
      );
      const data = response.data;

      if (data.success) {
        // Call the Python GET API after POST
const getResponse = await axios.post(
  "http://localhost:5001/match_trial",
  payload,
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
        const getData = getResponse.data;

        setPythonResult(
          getData.message || "Analysis completed but no result was returned."
        );
        Alert.alert("Success", "Patient record created and analysis fetched!");

        setFormData({
          patient_name: "",
          age: "",
          gender: "",
          symptom_duration: "",
          muscle_weakness: false,
          twitching: false,
          speech_difficulty: false,
          swallowing_difficulty: false,
          breathing_difficulty: false,
          family_history: false,
          previous_diagnosis: "",
          current_treatment: "",
          biomarker_status: "",
          EMG_result: "",
        });
        setValidationErrors({});
      } else {
        setPythonResult(null);
        Alert.alert("Error", "Failed to create patient record.");
      }
    } catch (error) {
      console.error(error);
      setPythonResult(null);
      Alert.alert(
        "Error",
        "Something went wrong during submission or analysis."
      );
    }
  };

  const requiredFields = [
    "patient_name",
    "age",
    "gender",
    "symptom_duration",
    "previous_diagnosis",
    "current_treatment",
    "biomarker_status",
    "EMG_result",
  ];

  const canSubmit = requiredFields.every(
    (field) =>
      formData[field as keyof typeof formData]?.toString().trim() !== ""
  );

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white min-h-full`}>
      <Text style={tw`text-xl font-bold mb-4 text-center text-purple-700`}>
        New Patient Form
      </Text>

      {/* Standard Text Inputs */}
      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
        placeholder="Patient Name"
        value={formData.patient_name}
        onChangeText={(text) => handleChange("patient_name", text)}
      />
      {validationErrors.patient_name && (
        <Text style={tw`text-red-600 text-sm mt-1`}>
          {validationErrors.patient_name}
        </Text>
      )}

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
        placeholder="Age (Years)"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => handleChange("age", text)}
      />
      {validationErrors.age && (
        <Text style={tw`text-red-600 text-sm mt-1`}>
          {validationErrors.age}
        </Text>
      )}

      <View style={tw`mb-4`}>
        <Text style={tw`text-base text-gray-700 mb-2`}>Gender:</Text>
        <View style={tw`border border-gray-300 rounded-md bg-white`}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue: string) =>
              handleChange("gender", itemValue)
            }
            style={tw`h-12`}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {validationErrors.gender && (
            <Text style={tw`text-red-600 text-sm mt-1`}>
              {validationErrors.gender}
            </Text>
          )}
        </View>
      </View>

      <TextInput
        style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
        placeholder="Symptom Duration (days)"
        keyboardType="numeric"
        value={formData.symptom_duration}
        onChangeText={(text) => handleChange("symptom_duration", text)}
      />
      {validationErrors.symptom_duration && (
        <Text style={tw`text-red-600 text-sm mt-1`}>
          {validationErrors.symptom_duration}
        </Text>
      )}

      {/* Switches */}
      {[
        "muscle_weakness",
        "twitching",
        "speech_difficulty",
        "swallowing_difficulty",
        "breathing_difficulty",
        "family_history",
      ].map((field) => (
        <View
          key={field}
          style={tw`flex-row justify-between items-center border border-gray-200 rounded px-3 py-2 mb-3 h-12`}
        >
          <Text style={tw`text-base text-gray-700 capitalize`}>
            {field.replace(/_/g, " ")}
          </Text>
          <Switch
            value={formData[field as keyof typeof formData] as boolean}
            onValueChange={(value) => handleChange(field, value)}
          />
        </View>
      ))}

      {/* Dropdowns */}
      {[
        {
          key: "previous_diagnosis",
          label: "Previous Diagnosis",
          options: ["ALS", "MS", "None"],
        },
        {
          key: "current_treatment",
          label: "Current Treatment",
          options: ["Riluzole", "Edaravone", "None"],
        },
        {
          key: "biomarker_status",
          label: "Biomarker Status",
          options: ["Positive", "Negative", "Unknown"],
        },
        {
          key: "EMG_result",
          label: "EMG Result",
          options: ["Normal", "Abnormal", "Pending"],
        },
      ].map(({ key, label, options }) => (
        <View
          key={key}
          style={tw`border border-white rounded mb-3 px-2 justify-center h-12 bg-white`}
        >
          <Picker
            selectedValue={formData[key as keyof typeof formData]}
            onValueChange={(value) => handleChange(key, value)}
            style={tw`text-base text-gray-800`}
            dropdownIconColor="#6B7280"
            mode="dropdown"
          >
            <Picker.Item label={`Select ${label}`} value="" />
            {options.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
      ))}

      <View style={tw`mb-8`}>
        <Button
          title="Submit"
          color="#734BD1"
          onPress={handleSubmit}
          disabled={!canSubmit}
        />
      </View>
      {pythonResult && (
        <View style={tw`p-4 bg-purple-100 border border-purple-300 rounded`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>
            ML Logic Output
          </Text>
          <Text style={tw`text-base text-gray-800`}>{pythonResult}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PatientForm;
