export class CreateCartDto {
  token: string
  items: object[]
  subtotal: number
  status: string
  shippingAddress?: object
  email?: string
}
