export enum ShippingTariff {
  FREE = 0.0,
  NORMAL = 4.95,
}

export interface IAddress {
  street: string
  province: string
  postalCode: string
  phoneNumber: string
  email: string
}
