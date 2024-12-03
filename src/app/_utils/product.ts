import { ProductProps } from '@ytakehir/ffoffa_components/dist/types/productTypes'
import { Product } from 'src/types'

export const createProduct = (product: Product, productClick: () => void): ProductProps => {
  return {
    color: `#${product.lip.colorCode}`,
    product: {
      imgUrl: product.imageList[0].path ? [product.imageList[0].path] : [],
      lipId: product.lip.lipId,
      brandName: product.lip.brandName,
      productName: product.lip.productName,
      productColor: `${product.lip.colorNumber} ${product.lip.colorName}`,
      productAmount: product.lip.amount ?? '',
      officialUrl: product.lip.officialURL,
      amazonUrl: product.lip.amazonURL,
      qooTenUrl: product.lip.qooTenURL,
      similarLevel: product.lip.similarPoint ?? '',
      limitedProductFlag: product.lip.limitedProductFlag,
      salesStopFlag: product.lip.salesStopFlag,
      PRFlag: product.lip.prFlag,
    },
    tagList: product.tagList.map((tag) => {
      return { type: 'hash', text: tag.tagName }
    }),
    productClick: () => productClick(),
  }
}
