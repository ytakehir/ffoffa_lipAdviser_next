'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ProductProps } from '@ytakehir/ffoffa_components/dist/types/productTypes'
import { useState } from 'react'
import { Product, ProductList } from 'src/types'

export const useProduct = () => {
  const router = useRouter()
  const [productId, setProductId] = useState<string>('')
  const [selected, setSelected] = useState<string | number>('')

  const generateSimilarProduct = (result: ProductList, viewProduct: Product) => {
    const similarProduct = result.productList.filter((product) => product.lip.lipId !== viewProduct.lip.lipId)
    if (Array.isArray(similarProduct)) {
      return similarProduct
        .map((product) => createProduct(product))
        .sort((first, second) => second.product.similarLevel - first.product.similarLevel)
        .slice(0, 3) as ProductProps[]
    } else {
      return [createProduct(similarProduct)] as ProductProps[]
    }
  }

  const createProduct = (product: Product): ProductProps => {
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
      productClick: () => redirectToUrl(product.lip.productId, String(product.lip.lipId)),
    }
  }

  const redirectToUrl = (productId: string, lipId: string) => {
    const query = new URLSearchParams({ lipId: lipId }).toString()
    router.push(`/product/${productId}/?${query}`, { scroll: true })
  }

  const redirectToSimilar = (colorCode: string | undefined) => {
    window.open(`/result/${colorCode}/`, '_blank')
  }

  const changeViewProduct = (select: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(select.target.value)
    const query = new URLSearchParams({ lipId: select.target.value }).toString()
    router.replace(`/product/${productId}/?${query}`, { scroll: true })
  }

  const createFullURL = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryString = searchParams.toString()

    return queryString ? `${pathname}?${queryString}` : pathname
  }

  const createColorOptions = (
    productList: ProductList['productList'],
  ): { value: string | number; option: string }[] => {
    if (productList) {
      return productList.map((product) => ({
        value: String(product.lip.lipId),
        option: `#${product.lip.colorCode}`,
      }))
    }

    return []
  }

  const createColorRadio = (productList: ProductList['productList']) => {
    return {
      name: 'color',
      options: createColorOptions(productList),
      type: 'color' as 'color' | 'default',
      colorSize: '40px',
      selected: selected,
      onChange: changeViewProduct,
    }
  }

  const pageBack = () => {
    router.back()
  }

  return {
    generateSimilarProduct,
    selected,
    setSelected,
    setProductId,
    createColorRadio,
    redirectToSimilar,
    createProduct,
    pageBack,
    createFullURL,
  }
}
