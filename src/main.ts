// app entrypoint and start
require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // allow CORS requests - https://docs.nestjs.com/security/cors
  app.enableCors()
  await app.listen(8000)
}
bootstrap()
