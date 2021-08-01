import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { generateRandomToken } from '../utils/tokenGenerator'

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
    @Body('productId') productId: string,
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
  async addItem(@Param('token') token: string, @Param('productId') productId) {
    await this.cartService.addItem(token, productId)
  }

  @Put('/:token/:productId')
  async updateItem(
    @Param('token') token: string,
    @Param('productId') productId,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    try {
      const updatedCart = await this.cartService.updateItem(
        token,
        Number(productId),
        quantity
      )
      return res.send(updatedCart)
    } catch (err) {
      throw err
    }
  }

  @Put('/checkout/complete/:token')
  async completeOrder(
    @Param('token') token: string,
    @Res() res
  ) {
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
    @Param('productId') productId,
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
