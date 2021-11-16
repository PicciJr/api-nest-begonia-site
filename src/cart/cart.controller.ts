import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
      if (!cart) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Cart not found',
        }, HttpStatus.NOT_FOUND);
      }
      return res.send(cart)
    } catch (err) {
      res.send(err)
      // TODO: add bugsnag as extra layer
    }
  }

  @Post()
  async create(
    @Body('productId') productId: number | string,
    @Body('variantId') variantId: number | string = null,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    try {
      const newCartToken = await generateRandomToken()
      const createdCart = await this.cartService.create(
        newCartToken,
        productId,
        variantId,
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
    @Param('productId') productId: number | string,
    @Body('variantId') variantId: number | string = null,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    const updatedCart = await this.cartService.addItem(
      token,
      productId,
      variantId,
      quantity
    )
    return res.send(updatedCart)
  }

  @Put(':token/address')
  async updateShippingAddress(
    @Param('token') token: string,
    @Body('address') address: IAddress,
    @Res() res
  ) {
    const updatedCart = await this.cartService.updateShippingAddress(
      token,
      address
    )
    return res.send(updatedCart)
  }

  @Put('/:token/:productId')
  async updateItem(
    @Param('token') token: string,
    @Param('productId') productId: number | string,
    @Body('variantId') variantId: number | string,
    @Body('quantity') quantity: number,
    @Res() res
  ) {
    try {
      const updatedCart = await this.cartService.updateItem(
        token,
        productId,
        variantId,
        quantity
      )
      return res.send(updatedCart)
    } catch (err) {
      throw err
    }
  }

  @Delete(':token/:productId')
  async removeItem(
    @Param('token') token: string,
    @Param('productId') productId: number | string,
    @Body('variantId') variantId: number | string,
    @Res() res
  ) {
    try {
      const updatedCart = await this.cartService.removeItem(token, productId, variantId)
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
}
