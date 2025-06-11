import { comment } from '../types/comment.model';
import axiosInstance from './axiosInstance';

export const getComments = (id: string): Promise<comment[]> =>
  axiosInstance.get(`/comments/${id}`).then((res) => res.data);
