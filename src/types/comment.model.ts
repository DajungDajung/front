export interface RawCom {
  content: string;
  created_at: string;
  id: number;
  img_id: number;
  nickname: string;
}

export interface Com extends Omit<RawCom, 'created_at' | 'img_id'> {
  createdAt: string;
  imgId: number;
}
