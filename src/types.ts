import { ReactNode } from 'react'

export type BaseLip = {
  lipId: number
  productId: string
  brandName: string
  productName: string
  colorNumber: string
  colorName: string
  colorCode: string
  amount: number
  limitedProductFlag: string
  salesStopFlag: string
  prFlag: string
  officialURL: string
  amazonURL: string
  qooTenURL: string
}

export type SimilarLip = BaseLip & {
  similarPoint: number
}

export type SimilarLipList = {
  similarLip: SimilarLip[]
}

export type Tag = {
  tagId: number
  tagName: string
  tagGenre: number
}

export type TagList = {
  tagList: Tag[]
}

export type ImageType = {
  alt: string
  path: string
}

export type ImageList = {
  imageList: ImageType[]
}

export type Product = {
  imageList: ImageType[]
  lip: SimilarLip
  tagList: Tag[]
}

export type ProductList = {
  productList: Product[]
}

export type LipOption = {
  value: {
    colorCode: string
    lip: string
    lipId: number
  }
  label: ReactNode
}

export type StringOption = {
  value: string
  label: string
}
