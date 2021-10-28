import { Injectable } from '@nestjs/common'
import { CartDocument } from 'src/cart/schemas/cart.schema'
const sgMail = require('@sendgrid/mail')

@Injectable()
export class MailService {

  sendOrderCompletedEmailToAdmin(cart: CartDocument) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: process.env.SENDGRID_ADMIN_TO,
      from: process.env.SENDGRID_ADMIN_FROM,
      templateId: 'd-24097dda770c44279b2070b5f470431f',
      dynamicTemplateData: {
        subject: `Nuevo pedido Begoña Ilustraciones ${cart.token}`,
        id: cart.token,
        items: cart.items,
        shippingAddress: cart.shippingAddress,
        total: cart.total
      }
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error('error al enviar email', error)
      })
  }
}
