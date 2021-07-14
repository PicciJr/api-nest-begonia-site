import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
