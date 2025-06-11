import { item } from '../types/item.model';
import axiosInstance from './axiosInstance';

export const getSearchItems = (
  query: string,
  category: string,
): Promise<item[]> => {
  const params = new URLSearchParams();
  if (query) {
    params.append('q', query);
  }
  if (category) {
    params.append('category', category);
  }

  return axiosInstance.get(`/items?${params.toString()}`);
};

export const getItemDetail = (id: string): Promise<item> =>
  axiosInstance.get(`/items/${id}`).then((res) => res.data);

export const postItem = (credentials: item): Promise<item> =>
  axiosInstance.post('/items', credentials);

export const deleteItem = (id: string) => axiosInstance.delete(`/items/${id}`);
