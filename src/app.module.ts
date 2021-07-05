import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { CartModule } from './cart/cart.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://dbAdmin:${process.env.MONGODB_PASS}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&ssl=true`
    ),
    CartModule,
  ],
})
export class AppModule {}
