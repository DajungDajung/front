export interface RawItem {
  id: number;
  img_id: number;
  title: string;
  price: number;
  created_at: string;
  category?: string;
  category_id?: number;
  contents?: string;
  like?: number;
  liked?: boolean;
  seller?: boolean;
  locatino?: Location;
}

export interface ItemDetail
  extends Omit<RawItem, 'img_id' | 'created_at' | 'category_id'> {
  imgId: number;
  createdAt: string;
  categoryId: number;
}

export interface Item extends Pick<RawItem, 'id' | 'title' | 'price'> {
  imgId: number;
  time: string;
}
