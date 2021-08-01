import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { Cart, CartSchema } from './schemas/cart.schema'
import { ProductService } from 'src/product/product.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CartController],
  providers: [CartService, ProductService],
})
export class CartModule {}