import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { generateRandomToken } from '../utils/tokenGenerator'
import { IAddress } from './types'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':token')
  async get(@Param('token') token: string, @Res() res) {
    try {
      const cart = await this.cartService.get(token)
      return res.send(cart)
    } catch (err) {
      throw err
    }
  }

  @Post()
  async create(
    @Body('productId', ParseIntPipe) productId: number,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    try {
      const newCartToken = await generateRandomToken()
      const createdCart = await this.cartService.create(
        newCartToken,
        productId,
        quantity
      )
      return res.send(createdCart)
    } catch (err) {
      throw err
    }
  }

  @Post(':token/:productId')
  async addItem(
    @Param('token') token: string,
    @Param('productId', ParseIntPipe) productId: number,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    const updatedCart = await this.cartService.addItem(token, productId, quantity)
    return res.send(updatedCart)
  }

  @Put(':token/address')
  async updateShippingAddress(
    @Param('token') token: string,
    @Body('address') address: IAddress,
    @Res() res
  ) {
    const updatedCart = await this.cartService.updateShippingAddress(token, address)
    return res.send(updatedCart)
  }

  @Put('/:token/:productId')
  async updateItem(
    @Param('token') token: string,
    @Param('productId', ParseIntPipe) productId: number,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    try {
      const updatedCart = await this.cartService.updateItem(
        token,
        productId,
        quantity
      )
      return res.send(updatedCart)
    } catch (err) {
      throw err
    }
  }

  @Put('/checkout/complete/:token')
  async completeOrder(@Param('token') token: string, @Res() res) {
    try {
      const updatedCart = await this.cartService.completeOrder(token)
      return res.send(updatedCart)
    } catch (err) {
      throw err
    }
  }

  @Delete(':token/:productId')
  async removeItem(
    @Param('token') token: string,
    @Param('productId', ParseIntPipe) productId: number,
    @Res() res
  ) {
    try {
      const updatedCart = await this.cartService.removeItem(token, productId)
      return res.send(updatedCart)
    } catch (err) {
      throw err
    }
  }
}
