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
  async create(@Body() createCartDto: CreateCartDto, @Res() res) {
    try {
      createCartDto.token = await generateRandomToken()
      const createdCart = await this.cartService.create(createCartDto)
      return res.send(createdCart)

    } catch (err) {
      throw err
    }
  }

  @Post(':token/:productId')
  async addItem(@Param('token') token: string, @Param('productId') productId) {
    await this.cartService.addItem(token, productId)
  }

  @Put(':token/:productId')
  async updateItem(
    @Param('token') token: string,
    @Param('productId') productId,
    @Body() quantity: number
  ) {
    await this.cartService.updateItem(token, productId, quantity)
  }

  @Delete(':token/:productId')
  async removeItem(
    @Param('token') token: string,
    @Param('productId') productId
  ) {
    await this.cartService.removeItem(token, productId)
  }
}
