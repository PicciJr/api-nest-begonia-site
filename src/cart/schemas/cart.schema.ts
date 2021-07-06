import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CartDocument = Cart & Document

@Schema()
export class Cart {
  @Prop({ required: true })
  token: string

  @Prop({ type: [Object], required: true })
  items: object[]

  @Prop({ required: true })
  subtotal: number

  @Prop({ required: true })
  status: string

  @Prop({ type: Object })
  shippingAddress: object

  @Prop()
  email: string
}

export const CartSchema = SchemaFactory.createForClass(Cart)
