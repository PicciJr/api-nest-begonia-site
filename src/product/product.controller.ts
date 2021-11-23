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
    async get(@Param('productId') productId: number | string, @Res() res) {
      try {
        const product = await this.productService.get(productId)
        return res.send(product)
      } catch (err) {
        throw err
      }
    }

    @Get('/slug/:productSlug')
    async getProductBySlug(@Param('productSlug') productSlug: string, @Res() res) {
      try {
        const product = await this.productService.getProductBySlug(productSlug)
        return res.send(product)
      } catch (err) {
        throw err
      }
    }

    @Get('/tienda/all')
    async getAllProducts(@Res() res, sortCriteria: String = 'orden_aparicion', sort: String = 'ASC') {
      try {
        const products = await this.productService.getAllProducts(sortCriteria, sort)
        return res.send(products)
      } catch (err) {
        throw err
      }
    }
  }
  