'use client'

import styles from './Result.module.css'
import '../../../global.css'
import React from 'react'
import { ProductProps } from '@ytakehir/ffoffa_components/dist/types/productTypes'
import { useResult } from './hook'
import { Loading } from '../loading/loading'
import {
  ComparisonModal,
  Modal,
  Button,
  Text,
  ResultBar,
  Icon,
  PageJump,
  Product,
  Share,
} from '@ytakehir/ffoffa_components'

export const Result = React.memo(() => {
  const {
    page,
    modalIsOpen,
    setModalIsOpen,
    sortState,
    slicedProductList,
    createPage,
    redirectToHome,
    handleComparisonButton,
    handleDeleteButtonClick,
    modalOptions,
    searchResult,
    tags,
    colorCode,
    selectTag,
    tagList,
    filterIsOpen,
    setFilterIsOpen,
    createPageIndex,
    comparisonList,
  } = useResult()

  if (searchResult && tags) {
    return (
      <div className={styles.content}>
        <div className={styles.resultBar}>
          <ResultBar
            color={`#${colorCode}`}
            selectTag={{
              ...selectTag,
            }}
            tagList={tagList}
            modalOptions={modalOptions}
            modal={{
              modalIsOpen: filterIsOpen,
              setModalIsOpen: setFilterIsOpen,
            }}
          />
        </div>
        {(searchResult.productList.length === 0 || !sortState) && (
          <div className={styles.resultZero}>
            <Text size={'h5'} text={'見つかりませんでした…'} />
            <div className={styles.searchButton}>
              <Button
                buttonType={'icon'}
                visual={'primary'}
                icon={<Icon type={'search'} />}
                iconPosition={'left'}
                onClick={redirectToHome}
              >
                別の色で再検索する
              </Button>
            </div>
          </div>
        )}
        {(searchResult.productList.length !== 0 || sortState) && slicedProductList.length > 0 && (
          <>
            <div className={styles.notes}>
              <Text size={'default'} text={`${searchResult?.productList.length}件あります`} />
              <Text size={'default'} text={`${page}/${createPageIndex(searchResult?.productList.length)}ページ目`} />
              <Text size={'default'} text={'必ず、各ブランドの公式HPや実店舗でご確認の上、ご購入ください。'} />
            </div>
            <div className={styles.products}>
              {slicedProductList[page - 1].map((product: ProductProps, index: number) => {
                return (
                  <div key={index} className={styles.product}>
                    <Product
                      {...product}
                      key={index}
                      comparisonButtonClick={() => handleComparisonButton(product)}
                      alreadyComparison={
                        !comparisonList.some((comparison) => comparison.product.lipId === product.product.lipId)
                      }
                    />
                  </div>
                )
              })}
            </div>
            {comparisonList.length > 0 && !filterIsOpen && (
              <div className={styles.comparisonArea}>
                <div className={styles.comparisonButton}>
                  <Button buttonType={'noneIcon'} visual={'secondary'} onClick={() => setModalIsOpen(true)}>
                    {comparisonList.length}件のリップを詳しく比較する
                  </Button>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  modalWidth={'100%'}
                  modal={
                    <ComparisonModal
                      setModalIsOpen={setModalIsOpen}
                      product={comparisonList}
                      deleteButtonClick={handleDeleteButtonClick}
                    />
                  }
                />
              </div>
            )}
            <div className={styles.share}>
              <Share
                title={'FFOFFA LIPADVISER | 商品や写真・画像などから似ている色味を持つ別の商品を検索できるサイト'}
                text={'FFOFFA LIPADVISER | 商品や写真・画像などから似ている色味を持つ別の商品を検索できるサイト'}
                url={`/result/${colorCode}`}
              />
            </div>
            <div className={styles.pageJump}>
              <PageJump pageJump={createPage(searchResult?.productList.length)} />
            </div>
          </>
        )}
      </div>
    )
  } else {
    return <Loading />
  }
})
