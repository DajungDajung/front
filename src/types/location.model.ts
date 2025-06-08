export interface Coordination {
  coordinateX: number;
  coordinateY: number;
}

export interface Location extends Coordination {
  id: number;
  title: string;
  address: string;
}
