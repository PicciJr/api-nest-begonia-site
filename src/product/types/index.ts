export interface IProductVariant {
  id: number
  price: number
  title: string
}

export interface IProduct {
  id: number
  title: string
  longDescription: string
  price: number
  type: string
  sizes?: string[]
  images: string[]
  hasVariants?: boolean
  variants: IProduct[]
  variantSelected: IProductVariant
  amount?: number
  slug: string
  similarProducts?: IProduct[]
}
