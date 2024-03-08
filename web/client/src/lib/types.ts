export interface Coffee {
  id: string;
  name: string;
  stock: number;
  type: string;
  maxOrder: number;
  roastedLevel: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DONE = 'DONE',
  CANCELED = 'CANCELED'
}

export interface Order {
  id: string;
  name: string;
  village: Village;
  status: OrderStatus;
  qty: number;
  coffee: Coffee;
}

export interface Province {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  province: Province;
}

export interface SubDistrict {
  id: string;
  name: string;
  district: District;
}

export interface Village {
  id: string;
  name: string;
  subDistrict: SubDistrict;
}
