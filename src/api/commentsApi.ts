import axiosInstance from './axiosInstance';

export const getComments = id => axiosInstance.get(`/comments/${id}`);
