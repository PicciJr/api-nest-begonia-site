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
import { MailService } from './mail.service'

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/encargo')
  async newEncargoPersonalizado(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('longDescription') longDescription: string,
    @Res() res
  ) {
    try {
      const response = await this.mailService.sendEncargoPersonalizadoEmail({
        email,
        name,
        longDescription,
      })
      return res.send(response)
    } catch (err) {
      throw err
    }
  }
}
