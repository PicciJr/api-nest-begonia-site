export enum CartStatus {
  InProgress = 'NEW',
  Addressed = 'ADDRESSED',
  Completed = 'COMPLETED',
}

export interface IAddress {
  street: string
  province: string
  postalCode: number
  phoneNumber: string
}

export interface IProduct {
  title: string
  longDescription: string
  price: number
  type: string
  sizes?: string[]
  images: string[]
  hasVariants?: boolean
  similarProducts?: IProduct[]
}

export interface ICart {
  items: IProduct[]
  subtotal: number
  status: CartStatus
  shippingAddress?: IAddress
  email?: string
}
