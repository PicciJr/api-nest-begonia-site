import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductService } from 'src/product/product.service'
import { IProduct } from 'src/product/types'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart, CartDocument } from './schemas/cart.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private httpservice: HttpService,
    private productService: ProductService
  ) {}

  get(cartToken: string) {
    return this.cartModel.findOne({ token: cartToken })
  }

  async create(cartToken: string, productId: string, quantity: number) {
    const product = await this.productService.get(productId)
    product.amount = quantity
    const shippingCosts = 4.95
    const subtotal = product.price * product.amount
    const newCart: CreateCartDto = {
      token: cartToken,
      items: [product],
      subtotal,
      shippingCosts,
      total: shippingCosts + subtotal,
      status: 'In progress',
    }
    const createdCart = new this.cartModel(newCart)
    return createdCart.save()
  }

  async updateItem(cartToken: string, productId: number, quantity: number) {
    const cart = await this.get(cartToken)
    const productInCart = cart.items.find((product) => product.id === productId)
    productInCart.amount = quantity
    cart.subtotal = productInCart.price * productInCart.amount
    cart.total = cart.subtotal + cart.shippingCosts
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, { new : true })
    return cartUpdated
  }

  async addItem(cartToken: string, productId: string) {
    // get carrito de BBDD
    // actualizar objeto totals y devolver la info de carrito
  }

  async removeItem(cartToken: string, productId: number) {
    const cart = await this.get(cartToken)
    cart.items = cart.items.filter((product) => product.id === productId)
    let newSubtotal = 0
    let shippingCosts = 0
    if (cart.items.length > 0) {
      shippingCosts = 4.95
      cart.items.forEach((item) => {
        newSubtotal += item.amount * item.price
      })
    }
    cart.shippingCosts = shippingCosts
    cart.subtotal = newSubtotal
    cart.total = newSubtotal + shippingCosts
    return cart
  }

  async completeOrder(cartToken: string) {
    const cart = await this.get(cartToken)
    cart.status = 'Completed'
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, { new : true })
    return cartUpdated
  }
}
