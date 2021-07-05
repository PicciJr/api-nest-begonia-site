import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart } from './schemas/cart.schema'
import { generateRandomToken } from '../utils/tokenGenerator'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':token')
  async get(@Req() req, @Param('token') token: string, @Res() res) {
    try {
      const cart = await this.cartService.get(token)
      return res.send(cart)
    } catch (err) {
      throw err
    }
  }

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      createCartDto.token = await generateRandomToken()
      await this.cartService.create(createCartDto)
    } catch (err) {
      throw err
    }
  }
}
