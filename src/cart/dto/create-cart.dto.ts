import { IProduct } from "src/product/types"

export class CreateCartDto {
  token: string
  items: IProduct[]
  subtotal: number
  shippingCosts: number
  total: number
  status: string
  shippingAddress?: object
  email?: string
}
