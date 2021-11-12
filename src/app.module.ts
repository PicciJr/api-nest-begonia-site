import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { CartModule } from './cart/cart.module'
import { ProductModule } from './product/product.module'
import { HttpModule } from '@nestjs/axios'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://dbAdmin:${process.env.MONGODB_PASS}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&ssl=true`
    ),
    CartModule,
    ProductModule,
    MailModule
  ],
})
export class AppModule {}
