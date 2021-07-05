import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  title: string
  @Prop()
  longDescription: string
  @Prop()
  price: number
  @Prop()
  type: string
  @Prop({ required: false })
  sizes?: string[]
  @Prop()
  images: string[]
  @Prop({ required: false })
  hasVariants?: boolean
  @Prop({ required: false })
  similarProducts?: Product[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
