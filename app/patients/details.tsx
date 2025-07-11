import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";

const API_BASE = "http://localhost:3000/api/patients";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
    patient_name: string;
    age: string;
  }>({ patient_name: "", age: "" });

  const router = useRouter();

  const handleViewDetails = () => {
    router.push("/patients/details");
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(API_BASE, {
        params: { patient_name: search },
      });
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchPatients();
      Alert.alert("Success", `Deleted patient ID ${id}`);
    } catch (err) {
      Alert.alert("Error", "Failed to delete patient");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`${API_BASE}/${id}`, editedData);
      setEditing(null);
      fetchPatients();
      Alert.alert("Updated", `Patient ${id} updated`);
    } catch (err) {
      Alert.alert("Error", "Failed to update patient");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const renderItem = ({ item }: { item: any }) => {
    const isEditing = editing === item.patient_id;

    return (
      <View
        style={tw`flex-row items-center justify-between px-4 py-2 border-b border-gray-300`}
      >
        {isEditing ? (
          <>
            <TextInput
              style={tw`flex-1 border border-gray-400 rounded px-2 py-1 mr-2`}
              value={editedData.patient_name}
              onChangeText={(text) =>
                setEditedData({ ...editedData, patient_name: text })
              }
            />
            <TextInput
              style={tw`w-16 border border-gray-400 rounded px-2 py-1 mr-2`}
              value={String(editedData.age)}
              onChangeText={(text) =>
                setEditedData({ ...editedData, age: text })
              }
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => handleUpdate(item.patient_id)}
              style={tw`bg-green-500 px-3 py-1 rounded mr-1`}
            >
              <Text style={tw`text-white text-xs`}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditing(null)}
              style={tw`bg-gray-400 px-3 py-1 rounded`}
            >
              <Text style={tw`text-white text-xs`}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={tw`flex-1 text-sm text-gray-800`}>
              {item.patient_name}
            </Text>
            <Text style={tw`w-16 text-sm text-gray-800 text-center`}>
              {item.age}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditing(item.patient_id);
                setEditedData({
                  patient_name: item.patient_name,
                  age: item.age.toString(),
                });
              }}
              style={tw`bg-blue-500 px-3 py-1 rounded mr-1`}
            >
              <Text style={tw`text-white text-xs`}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.patient_id)}
              style={tw`bg-red-500 px-3 py-1 rounded`}
            >
              <Text style={tw`text-white text-xs`}>Delete</Text>
            </TouchableOpacity>
            <View style={tw`flex-1 justify-center items-center bg-white`}>
              <TouchableOpacity
                style={tw`bg-[#734BD1] py-3 px-6 rounded-lg`}
                onPress={handleViewDetails}
              >
                <Text style={tw`text-white text-base font-bold`}>
                  View Patient Details
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white px-4 py-6`}>
      <Text style={tw`text-xl font-bold mb-4 text-purple-700`}>
        Patient Records
      </Text>

      <TextInput
        style={tw`border border-gray-400 rounded px-3 py-2 mb-4`}
        placeholder="Search by name..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.patient_id.toString()}
      />
    </View>
  );
};

export default PatientTable;
