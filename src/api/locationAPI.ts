import axios, { AxiosInstance } from 'axios';
const { VITE_BACK_URL } = import.meta.env;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLocation = (id: string) => axiosInstance.get(`/location/${id}`);

export const postLocation = (loaction: Location) =>
  axiosInstance.post('/location', loaction);

export const putLocation = (id: string, loaction: Location) =>
  axiosInstance.put(`/location/${id}`, loaction);
