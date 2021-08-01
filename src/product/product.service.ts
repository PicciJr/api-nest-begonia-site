import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { IProduct } from './types'

@Injectable()
export class ProductService {
  constructor(private httpservice: HttpService) {}

  async get(productId: string): Promise<IProduct> {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos`)
      .toPromise()
    const product = response.data.find(
      (product) => product.id === productId
    )
    return {
      id: product.id,
      images: product.imagenes,
      longDescription: product.descripcion,
      price: product.precio,
      title: product.titulo,
      type: null,
      hasVariants: product.es_configurable,
    }
  }
}
