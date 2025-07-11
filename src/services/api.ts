// api.ts
import axios from 'axios';

// Base URL of your backend
const BASE_URL = 'http://localhost:3000/api'; // replace with your LAN IP if testing on a device

// Axios instance for preconfigured requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------
// Patients API Functions
// ----------------------

export const getAllPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatientById = async (id: number) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (data: any) => {
  const response = await api.post('/patients', data);
  return response.data;
};

export const updatePatient = async (id: number, data: any) => {
  const response = await api.put(`/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

// ----------------------
// Trials API Functions
// ----------------------

export const getAllTrials = async () => {
  const response = await api.get('/trials');
  return response.data;
};

export const getTrialById = async (id: number) => {
  const response = await api.get(`/trials/${id}`);
  return response.data;
};

export const createTrial = async (data: any) => {
  const response = await api.post('/trials', data);
  return response.data;
};

export const updateTrial = async (id: number, data: any) => {
  const response = await api.put(`/trials/${id}`, data);
  return response.data;
};

export const deleteTrial = async (id: number) => {
  const response = await api.delete(`/trials/${id}`);
  return response.data;
};

export default api;
