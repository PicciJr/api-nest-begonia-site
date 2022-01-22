import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { IProduct } from './types'

@Injectable()
export class ProductService {
  constructor(private httpservice: HttpService) {}

  async get(
    productId: number | string,
    variantId: number | string = null
  ): Promise<IProduct> {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos/${productId}`)
      .toPromise()
    if (response?.data && response?.status === 200) {
      let {
        id,
        imagenes,
        descripcion,
        precio,
        precio_min,
        precio_max,
        titulo,
        variantes,
        slug,
        tipo_producto,
      } = response.data
      let variantSelected = null
      if (variantId !== null) {
        variantSelected = variantes
          .map(({ id, precio, variante }) => {
            return {
              id,
              price: precio,
              variant: variante,
            }
          })
          .find(({ id }) => variantId === id)
        precio = variantSelected.price
      }
      return {
        id,
        images: imagenes,
        longDescription: descripcion,
        price: precio,
        minPrice: precio_min,
        maxPrice: precio_max,
        title: titulo,
        type: tipo_producto,
        slug,
        hasVariants: variantes?.length > 0 || false,
        variantSelected,
        variants: variantes.map(({ id, precio, variante }) => {
          return {
            id,
            price: precio,
            variant: variante,
          }
        }),
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
          ({
            id,
            imagenes,
            descripcion,
            precio,
            precio_min,
            precio_max,
            titulo,
            variantes,
            slug,
            tipo_producto,
            Relacionados,
          }) => {
            return {
              id,
              images: imagenes,
              longDescription: descripcion,
              price: precio,
              minPrice: precio_min,
              maxPrice: precio_max,
              title: titulo,
              type: tipo_producto,
              slug,
              hasVariants: variantes?.length > 0 || false,
              variants: variantes.map(({ id, precio, variante }) => {
                return {
                  id,
                  price: precio,
                  variant: variante,
                }
              }),
              relatedProducts:
                Relacionados.map(({ productos }) => productos) || [],
            }
          }
        )
        .find((product) => product.slug === productSlug)
    }
  }

  async getAllProducts(sortCriteria: String = 'orden_aparicion', sort: String = 'ASC') {
    const response = await this.httpservice
      .get(`${process.env.STRAPI_BACK_BASE_URL}/productos?_sort=${sortCriteria}:${sort}`)
      .toPromise()
    return response.data.map(
      ({
        id,
        imagenes,
        descripcion,
        precio,
        precio_min,
        precio_max,
        titulo,
        variantes,
        slug,
        tipo_producto,
      }) => {
        return {
          id,
          images: imagenes,
          longDescription: descripcion,
          price: precio,
          minPrice: precio_min,
          maxPrice: precio_max,
          title: titulo,
          type: tipo_producto,
          slug,
          hasVariants: variantes?.length > 0 || false,
          variants: variantes.map(({ id, precio, variante }) => {
            return {
              id,
              price: precio,
              variant: variante,
            }
          }),
        }
      }
    )
  }
}
