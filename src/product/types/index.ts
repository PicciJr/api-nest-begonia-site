export interface IProductVariant {
  id: number
  price: number
  title: string
}

export interface IHoroscope {
  firstHand: string
  secondHand: string
  firstHandGender: string
  secondHandGender: string
}

export interface IProduct {
  id: number
  title: string
  longDescription: string
  price: number
  minPrice?: number
  maxPrice?: number
  type: string
  sizes?: string[]
  images: string[]
  hasVariants?: boolean
  variants: IProduct[]
  variantSelected: IProductVariant
  customHoroscopes: Array<any>
  customOptionSelected?: IHoroscope
  amount?: number
  slug: string
  similarProducts?: IProduct[]
}
