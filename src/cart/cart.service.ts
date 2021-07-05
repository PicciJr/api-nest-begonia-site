import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart, CartDocument } from './schemas/cart.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>
  ) {}

  get(cartToken) {
    return this.cartModel.findOne({ token: cartToken })
  }

  async create(createCartDto: CreateCartDto) {
    const createdCart = new this.cartModel(createCartDto)
    await createdCart.save()
  }
}
