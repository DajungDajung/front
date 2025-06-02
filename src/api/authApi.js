import axiosInstance from './axiosInstance';

export const login = credentials =>
  axiosInstance.post('/auth/signin', credentials);

export const logout = () => axiosInstance.post('/logout');
