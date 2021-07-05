import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop()
  street: string

  @Prop()
  province: string

  @Prop()
  postalCode: string

  @Prop()
  phoneNumer: number
}

export const AddressSchema = SchemaFactory.createForClass(Address);