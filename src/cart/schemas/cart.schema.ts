import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Address } from './address.schema'
import { Product } from './product.schema'

export type CartDocument = Cart & Document

@Schema()
export class Cart {
  @Prop([Product])
  items: Product[]

  @Prop()
  subtotal: number

  @Prop()
  status: string

  @Prop(Address)
  shippingAddress: Address
}

export const CartSchema = SchemaFactory.createForClass(Cart)