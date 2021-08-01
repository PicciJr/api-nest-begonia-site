import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IProduct } from 'src/product/types'

export type CartDocument = Cart & Document

@Schema()
export class Cart {
  @Prop({ required: true })
  token: string

  @Prop({ type: [Object], required: true })
  items: IProduct[]

  @Prop({ required: true })
  subtotal: number

  @Prop({ required: true })
  shippingCosts: number

  @Prop({ required: true })
  total: number

  @Prop({ required: true })
  status: string

  @Prop({ type: Object })
  shippingAddress: object

  @Prop()
  email: string
}

export const CartSchema = SchemaFactory.createForClass(Cart)
