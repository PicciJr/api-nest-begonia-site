import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart, CartDocument } from './schemas/cart.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private httpservice: HttpService
  ) {}

  get(cartToken: string) {
    return this.cartModel.findOne({ token: cartToken })
  }

  create(createCartDto: CreateCartDto) {
    const createdCart = new this.cartModel(createCartDto)
    return createdCart.save()
  }

  async updateItem(cartToken: string, productId: string, quantity: number) {
    // get carrito de BBDD
    // actualizar objeto totals y devolver la info de carrito
  }

  async addItem(cartToken: string, productId: string) {
    // get carrito de BBDD
    // actualizar objeto totals y devolver la info de carrito
  }

  async removeItem(cartToken: string, productId: string) {
    // get carrito de BBDD
    // actualizar objeto totals y devolver la info de carrito
  }
}
