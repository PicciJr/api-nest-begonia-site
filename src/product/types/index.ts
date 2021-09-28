export interface IProduct {
  id: number
  title: string
  longDescription: string
  price: number
  type: string
  sizes?: string[]
  images: string[]
  hasVariants?: boolean
  amount?: number
  slug: string
  similarProducts?: IProduct[]
}
