export interface coordination {
  coordinate_x: number;
  coordinate_y: number;
}

export interface location extends coordination {
  id: number;
  title: string;
  address: string;
}
