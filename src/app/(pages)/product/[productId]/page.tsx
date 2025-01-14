import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../../global.css'
import React from 'react'
import { ProductView } from 'src/app/_component/product/product'
import { getProductId } from 'src/api/GetProductId'
import { getSameLip } from 'src/api/GetSameLip'
import { getSimilarLip } from 'src/api/GetSimilarLip'
import type { Metadata } from 'next'
import thumbnail from '/public/img/thumbnail.png'
import { ProductList } from 'src/types'

type PageProps = {
  params: Promise<Record<'productId', string>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { productId } = await params
  const product = await getSameLip(productId).then((result: ProductList) => result.productList[0])

  return {
    title: `FFOFFA LIPADVISER | ${product.lip.brandName + ' ' + product.lip.productName}`,
    description: `${product.lip.brandName + ' ' + product.lip.productName}に似ている色味を持つ別のリップの検索結果です。`,
    keywords: `リップ,コスメ,似てる,色,プチプラ,韓国,類似,デパコス,グロス,ティント,口紅,ルージュ,比較,${product.lip.brandName},${product.lip.productName}`,
    openGraph: {
      title: `FFOFFA LIPADVISER | ${product.lip.brandName + ' ' + product.lip.productName}`,
      description: `${product.lip.brandName + ' ' + product.lip.productName}に似ている色味を持つ別のリップの検索結果です。`,
      url: `https://ffoffa.com/product/${productId}`,
      images: product.imageList ? product.imageList[0].path : thumbnail.src,
    },
    twitter: {
      title: `FFOFFA LIPADVISER | ${product.lip.brandName + ' ' + product.lip.productName}`,
      description: `${product.lip.brandName + ' ' + product.lip.productName}に似ている色味を持つ別のリップの検索結果です。FFOFFA LIPADVISERは、商品や写真・画像などから似ている色味を持つ別のリップやコスメを検索することができます。また、AIを利用し画像から色の取得・検索も可能です。`,
      images: [product.imageList ? product.imageList[0].path : thumbnail.src],
    },
    alternates: {
      canonical: `${baseURL}/product/${productId}`,
    },
  }
}

export async function generateStaticParams() {
  const response = (await getProductId()) as { productIdList: { productId: string }[] }

  return response.productIdList.map(({ productId }) => ({ productId }))
}

export default async function Page(props: PageProps) {
  const { productId } = await props.params
  const { lipId } = await props.searchParams

  const [product, similarLipList] = await Promise.all([
    getSameLip(productId)
      .then((result) => result.productList)
      .then((productList) => productList.sort((first, second) => first.lip.colorNumber - second.lip.colorNumber)),
    getSameLip(productId)
      .then((result) => result.productList)
      .then((productList) =>
        getSimilarLip(
          lipId
            ? productList.find((product) => String(product.lip.lipId) === lipId).lip.colorCode
            : productList[0].lip.colorCode,
        ),
      ),
  ])

  return <ProductView productId={productId} product={product} similarLipList={similarLipList} />
}
