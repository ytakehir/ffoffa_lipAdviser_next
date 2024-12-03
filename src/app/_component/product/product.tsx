'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './product.module.css'
import { postColorCodeHistory } from 'src/api/PostColorCodeHistory'
import { postLipHistory } from 'src/api/PostLipHistory'
import { useProduct } from './hooks'
import React from 'react'
import { Product, ProductList } from 'src/types'
import { Loading } from '../loading/loading'
import { Button, Icon, ProductPage } from '@ytakehir/ffoffa_components'
import { useParams, useSearchParams } from 'next/navigation'
import { useMount } from 'react-use'

type ProductViewProps = {
  productId: string
  product: Product[]
  similarLipList: ProductList
}

export const ProductView = React.memo(async (props: ProductViewProps) => {
  const {
    setSelected,
    setProductId,
    generateSimilarProduct,
    createProduct,
    createColorRadio,
    redirectToSimilar,
    pageBack,
    createFullURL,
  } = useProduct()

  const params = useParams<{ productId: string }>()
  const searchParams = useSearchParams()
  const lipId = searchParams.get('lipId')
  const viewProduct = props.product.find((product) => String(product.lip.lipId) === lipId) ?? props.product[0]

  useMount(() => {
    if (lipId) {
      setSelected(lipId)
    }
    setProductId(params.productId)

    if (viewProduct) {
      postColorCodeHistory(viewProduct.lip.colorCode)
      postLipHistory(viewProduct.lip.lipId)
    }
  })

  if (props.productId && props.product && props.similarLipList) {
    return (
      <div className={styles.content}>
        <div className={styles.back}>
          <Button
            buttonType={'iconOnly'}
            visual={'iconOnly'}
            icon={<Icon type={'back'} />}
            onClick={() => pageBack()}
          />
        </div>
        <ProductPage
          {...createProduct(viewProduct)}
          colorRadio={createColorRadio(props.product)}
          similarProduct={{
            productList: generateSimilarProduct(props.similarLipList, viewProduct),
            buttonClick: () => redirectToSimilar(viewProduct.lip.colorCode),
          }}
          campaignText={{ official: undefined, amazon: undefined, qooTen: undefined }}
          share={{
            title: `FFOFFA LIPADVISER | ${viewProduct.lip.brandName + ' ' + viewProduct.lip.productName + ' ' + viewProduct.lip.colorName}`,
            text: `${viewProduct.lip.brandName + ' ' + viewProduct.lip.productName + ' ' + viewProduct.lip.colorName}に色味が似ているリップの検索結果です。`,
            url: createFullURL(),
          }}
        />
      </div>
    )
  } else {
    return <Loading />
  }
})
