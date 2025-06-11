import { location } from './location.model';
import { seller } from './user.model';

export interface itemDetail {
  id: number;
  img_id: number;
  title: string;
  price: number;
  create_at: string;
  category?: string;
  category_id?: number;
  contents?: string;
  like?: number;
  liked?: string;
  seller?: string;
}

export interface item {
  item: itemDetail;
  user: seller;
  location: location;
}
