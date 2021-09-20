import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { IProduct } from './types'

@Injectable()
export class ProductService {
  constructor(private httpservice: HttpService) {}

  async get(productId: number): Promise<IProduct> {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos/${productId}`)
      .toPromise()
    if (response?.data && response?.status === 200) {
      const { id, imagenes, descripcion, precio, titulo, variantes } =
        response.data
      return {
        id,
        images: imagenes,
        longDescription: descripcion,
        price: precio,
        title: titulo,
        type: null,
        hasVariants: variantes?.length > 0 || false,
      }
    }
    // TODO: si no se encuentra el producto, devolver un error
  }
}
