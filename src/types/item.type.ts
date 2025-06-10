import { Seller } from './user.type';

export interface Item {
  id: number;
  imgId: number;
  title: string;
  price: number;
  createdAt?: string;
}

export interface ItemDetail {
  id: number;
  imgId: number;
  categoryId: number;
  category: string;
  title: string;
  price: number;
  createdAt: string;
  contents: string;
  like: number;
  liked?: string;
  seller?: string;
  user: Seller;
}

export interface ChatItemInfo {
  id: number;
  imgId: number;
  title: string;
  price: number;
}
