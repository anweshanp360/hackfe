import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

interface MatchedPatient {
  patientName: string;
  trialName: string;
  eligible: boolean;
}

const MatchedPatientsTable: React.FC = () => {
  const [matchedData, setMatchedData] = useState<MatchedPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch matched patient trial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ matches: MatchedPatient[] }>(
          'http://localhost:3000/api/matched-patients'
        );
        setMatchedData(response.data.matches || []);
      } catch (error) {
        console.error('Failed to fetch matched patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={tw`p-4`}>
      <Text style={tw`text-xl font-bold text-center mb-4`}>
        Matched Patients Trial Status
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#734BD1" />
      ) : (
        <View style={tw`border rounded-md overflow-hidden`}>
          {/* Table Header */}
          <View style={tw`flex-row bg-gray-200`}>
            <Text style={tw`flex-1 p-2 font-bold border-r`}>Patient Name</Text>
            <Text style={tw`flex-1 p-2 font-bold border-r`}>Trial Name</Text>
            <Text style={tw`flex-1 p-2 font-bold`}>Eligibility</Text>
          </View>

          {/* Table Rows */}
          {matchedData.length > 0 ? (
            matchedData.map((item, index) => (
              <View
                key={index}
                style={tw`flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                <Text style={tw`flex-1 p-2 border-r`}>{item.patientName}</Text>
                <Text style={tw`flex-1 p-2 border-r`}>{item.trialName}</Text>
                <Text
                  style={tw`flex-1 p-2 ${
                    item.eligible ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.eligible ? 'Eligible' : 'Not Eligible'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={tw`p-4 text-center text-gray-500`}>
              No matches found.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default MatchedPatientsTable;
