import { Body, Controller, Get, Post } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { Cart } from './schemas/cart.schema'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      await this.cartService.create(createCartDto)
    } catch (err) {
      throw err
    }
  }
}
