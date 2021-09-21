import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Req,
    Res,
  } from '@nestjs/common'
import { ProductService } from './product.service'
  
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Get(':productId')
    async get(@Param('productId') productId: number, @Res() res) {
      try {
        const product = await this.productService.get(productId)
        return res.send(product)
      } catch (err) {
        throw err
      }
    }
  }
  