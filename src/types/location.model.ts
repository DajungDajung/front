export interface Coordination {
  coordinateX: number;
  coordinateY: number;
}

export interface Location extends Coordination {
  userId: number;
  itemId: number;
  title: string;
  address: string;
}
