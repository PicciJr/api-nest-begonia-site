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
      const { id, imagenes, descripcion, precio, titulo, variantes, slug } =
        response.data
      return {
        id,
        images: imagenes,
        longDescription: descripcion,
        price: precio,
        title: titulo,
        type: null,
        slug,
        hasVariants: variantes?.length > 0 || false,
      }
    }
    // TODO: si no se encuentra el producto, devolver un error
  }

  async getProductBySlug(productSlug: string): Promise<IProduct> {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos?slug=${productSlug}`)
      .toPromise()
    if (response?.data && response?.status === 200) {
      return response.data
        .map(
          ({ id, imagenes, descripcion, precio, titulo, variantes, slug }) => {
            return {
              id,
              images: imagenes,
              longDescription: descripcion,
              price: precio,
              title: titulo,
              type: null,
              slug,
              hasVariants: variantes?.length > 0 || false,
            }
          }
        )
        .find((product) => product.slug === productSlug)
    }
  }

  async getAllProducts() {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos`)
      .toPromise()
    return response.data.map(
      ({ id, imagenes, descripcion, precio, titulo, variantes, slug }) => {
        return {
          id,
          images: imagenes,
          longDescription: descripcion,
          price: precio,
          title: titulo,
          type: null,
          slug,
          hasVariants: variantes?.length > 0 || false,
        }
      }
    )
  }
}
