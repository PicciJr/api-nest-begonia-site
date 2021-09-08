import { Injectable } from '@nestjs/common'
import { CartDocument } from 'src/cart/schemas/cart.schema'
import { ShippingTariff } from 'src/cart/types'
import { IProduct } from 'src/product/types'

@Injectable()
export class CalculatorService {

  createCalculator(item: IProduct, quantity: number, tariff: ShippingTariff) {
    const subtotal = item.price * quantity
    return {
      subtotal,
      shippingCosts: tariff,
      total: subtotal + tariff,
    }
  }

  recalculateTotals(cart: CartDocument) {
    const subtotal = cart.items.reduce((accumulator, product) => {
      return accumulator + product.price * product.amount
    }, 0)
    const total = subtotal + cart.shippingCosts
    return { subtotal, shippingCosts: cart.shippingCosts, total }
  }
}
