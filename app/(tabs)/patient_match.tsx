import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import tw from "twrnc";

type TrialMatch = {
  id: number;
  name: string;
  age: number;
  gender: string;
  trialName: string;
  matchedFields: string[];
  resultStatus: string;
};

const TrialMatchTable = () => {
  const [trialMatches, setTrialMatches] = useState<TrialMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrialMatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/matched-patients"
      ); 
      setTrialMatches(response.data);
    } catch (error) {
      console.error("Failed to fetch trial matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrialMatches();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#4B5563" />
        <Text style={tw`mt-4 text-base text-gray-700`}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      <View>
        {/* Table Header */}
        <View style={tw`flex-row bg-purple-700 p-2`}>
          {[
            "ID",
            "Name",
            "Age",
            "Gender",
            "Trial Name",
            "Matched Fields",
            "Result",
          ].map((header, index) => (
            <Text key={index} style={tw`text-white font-bold px-2 w-40`}>
              {header}
            </Text>
          ))}
        </View>

        {/* Table Body */}
        {trialMatches.map((item) => (
          <View key={item.id} style={tw`flex-row border-b border-gray-300 p-2`}>
            <Text style={tw`px-2 w-40`}>{item.id}</Text>
            <Text style={tw`px-2 w-40`}>{item.name}</Text>
            <Text style={tw`px-2 w-40`}>{item.age}</Text>
            <Text style={tw`px-2 w-40`}>{item.gender}</Text>
            <Text style={tw`px-2 w-40`}>{item.trialName}</Text>
            <Text style={tw`px-2 w-40`}>
              {Array.isArray(item.matchedFields)
                ? item.matchedFields.join(", ")
                : String(item.matchedFields || "")}
            </Text>
            <Text style={tw`px-2 w-40 text-green-700 font-semibold`}>
              {item.resultStatus}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TrialMatchTable;
