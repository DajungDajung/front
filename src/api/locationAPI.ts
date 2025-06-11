import axios, { AxiosInstance } from 'axios';
const { VITE_BACK_URL } = import.meta.env;
import { location } from '../types/location.model';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLocation = (id: string) => axiosInstance.get(`/location/${id}`);

export const postLocation = (loaction: location) =>
  axiosInstance.post('/locations', loaction);

export const putLocation = (loaction: location) =>
  axiosInstance.put('/locations', loaction);
