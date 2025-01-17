
export interface Betshop {
  _id: string;
  name: string;
  address: string;
  ipClient: string;
  cityId: any;
  currencyId: any;
  coordinates: { latitude: number; longitude: number };
  isVisible: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
