import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CalculatorService } from 'src/calculator/calculator.service'
import { IAddress, ShippingTariff } from 'src/cart/types'
import { Model } from 'mongoose'
import { ProductService } from 'src/product/product.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart, CartDocument } from './schemas/cart.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private productService: ProductService,
    private calculator: CalculatorService
  ) {}

  get(cartToken: string) {
    return this.cartModel.findOne({ token: cartToken })
  }

  async create(cartToken: string, productId: string, quantity: number) {
    const product = await this.productService.get(productId)
    product.amount = quantity
    const { subtotal, shippingCosts, total } = this.calculator.createCalculator(
      product,
      quantity,
      ShippingTariff.NORMAL
    )
    const newCart: CreateCartDto = {
      token: cartToken,
      items: [product],
      subtotal,
      shippingCosts,
      total,
      status: 'In progress',
    }
    const createdCart = new this.cartModel(newCart)
    return createdCart.save()
  }

  async updateItem(cartToken: string, productId: number, quantity: number) {
    const cart = await this.get(cartToken)
    const productInCart = cart.items.find((product) => product.id === productId)
    productInCart.amount = quantity
    const { subtotal, shippingCosts, total } =
      this.calculator.recalculateTotals(cart)
    cart.subtotal = subtotal
    cart.total = total
    cart.shippingCosts = shippingCosts
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, {
      new: true,
    })
    return cartUpdated
  }

  async addItem(cartToken: string, productId: string, quantity: number) {
    const cart = await this.get(cartToken)
    const product = await this.productService.get(productId)
    product.amount = quantity
    cart.items = [...cart.items, product]
    const { subtotal, shippingCosts, total } =
      this.calculator.recalculateTotals(cart)
    cart.subtotal = subtotal
    cart.total = total
    cart.shippingCosts = shippingCosts
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, {
      new: true,
    })
    return cartUpdated
  }

  async removeItem(cartToken: string, productId: number) {
    const cart = await this.get(cartToken)
    cart.items = cart.items.filter((product) => product.id === productId)
    const { subtotal, shippingCosts, total } =
      this.calculator.recalculateTotals(cart)
    cart.shippingCosts = shippingCosts
    cart.subtotal = subtotal
    cart.total = total
    return cart
  }

  async updateShippingAddress(cartToken: string, address: IAddress) {
    const cart = await this.get(cartToken)
    cart.shippingAddress = address
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, {
      new: true,
    })
    return cartUpdated
  }

  async completeOrder(cartToken: string) {
    const cart = await this.get(cartToken)
    cart.status = 'Completed'
    const cartUpdated = await this.cartModel.findByIdAndUpdate(cart._id, cart, {
      new: true,
    })
    return cartUpdated
  }
}
