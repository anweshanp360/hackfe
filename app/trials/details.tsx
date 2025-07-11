import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import tw from "twrnc"; // Tailwind for React Native

const TrialForm = () => {
  const [formData, setFormData] = useState({
    trial_name: "",
    sponsor: "",
    min_age: "",
    max_age: "",
    gender_requirement: "",
    min_symptom_duration: "",
    requires_muscle_weakness: false,
    requires_twitching: false,
    requires_positive_biomarker: "",
    requires_abnormal_emg: "",
    allowed_treatments: "",
    exclusion_previous_diagnosis: "",
    location: "",
    status: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        min_age: parseInt(formData.min_age),
        max_age: parseInt(formData.max_age),
        min_symptom_duration: parseInt(formData.min_symptom_duration),
        start_date: new Date(formData.start_date),
        end_date: new Date(formData.end_date),
      };

      const response = await axios.post(
        "http://<YOUR-IP>:<PORT>/trials",
        payload
      );
      Alert.alert("Success", "Trial created successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create trial.");
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>
        Create Clinical Trial
      </Text>

      {(
        [
          { key: "trial_name", label: "Trial Name" },
          { key: "sponsor", label: "Sponsor" },
          { key: "min_age", label: "Min Age" },
          { key: "max_age", label: "Max Age" },
          { key: "gender_requirement", label: "Gender Requirement" },
          { key: "min_symptom_duration", label: "Min Symptom Duration (days)" },
          { key: "requires_positive_biomarker", label: "Requires Biomarker" },
          { key: "requires_abnormal_emg", label: "Requires Abnormal EMG" },
          { key: "allowed_treatments", label: "Allowed Treatments" },
          { key: "exclusion_previous_diagnosis", label: "Exclusion Diagnosis" },
          { key: "location", label: "Location" },
          { key: "status", label: "Status" },
          { key: "start_date", label: "Start Date (YYYY-MM-DD)" },
          { key: "end_date", label: "End Date (YYYY-MM-DD)" },
        ] as { key: keyof typeof formData; label: string }[]
      ).map((field) => (
        <TextInput
          key={field.key}
          placeholder={field.label}
          style={tw`border border-gray-300 rounded px-3 py-2 mb-3`}
          value={
            typeof formData[field.key] === "boolean"
              ? String(formData[field.key])
              : formData[field.key]
          }
          onChangeText={(text) => handleChange(field.key, text)}
        />
      ))}

      <View style={tw`flex-row items-center justify-between mb-3`}>
        <Text style={tw`text-base`}>Requires Muscle Weakness</Text>
        <Switch
          value={formData.requires_muscle_weakness}
          onValueChange={(val) => handleChange("requires_muscle_weakness", val)}
        />
      </View>

      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text style={tw`text-base`}>Requires Twitching</Text>
        <Switch
          value={formData.requires_twitching}
          onValueChange={(val) => handleChange("requires_twitching", val)}
        />
      </View>

      <View style={tw`mb-6`}>
        <Button title="Submit Trial" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default TrialForm;
