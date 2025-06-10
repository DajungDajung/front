import axiosInstance from './axiosInstance';

export const getSearchItems = (query, category) => {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (category) params.append('category', category);

  return axiosInstance.get(`/items?${params.toString()}`);
};

export const getItemDetail = id => axiosInstance(`/items/${id}`);

export const postItem = credentials =>
  axiosInstance.post(`/items`, credentials);

export const deleteItem = id => axiosInstance.delete(`/items/${id}`);
