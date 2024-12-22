'use client'

import { getSimilarLip } from 'src/api/GetSimilarLip'
import { getTags } from 'src/api/GetTag'
import { SortFilterModalProps } from 'node_modules/@ytakehir/ffoffa_components/dist/components/Modal/types'
import { useState, useCallback, useEffect } from 'react'
import { ProductProps } from '@ytakehir/ffoffa_components/dist/types/productTypes'
import { ProductList, TagList } from 'src/types'
import { useMount } from 'react-use'
import { useBrand } from 'src/context/brandContext'
import { useRouter, useParams, usePathname } from 'next/navigation'

export const useResult = () => {
  const min = 500
  const max = 7000
  const minDistance = 500
  const showIndex = 12

  const router = useRouter()
  const params = useParams<{ colorCode: string }>()
  const { colorCode } = params
  const { brandNameList } = useBrand()

  const [tags, setTags] = useState<TagList | null>(null)
  const [searchResult, setSearchResult] = useState<ProductList | null>(null)
  const [sortType, setSortType] = useState<string>('類似度が高い順')
  const [page, setPage] = useState<number>(1)
  const [brandChecked, setBrandChecked] = useState<string[]>([])
  const [tagChecked, setTagChecked] = useState<string[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [similarSelected, setSimilarSelected] = useState<number>(0)
  const [rangeValue, setRangeValue] = useState<number[]>([min, max])
  const [sortState, setSortState] = useState<boolean>(true)
  const [slicedProductList, setSlicedProductList] = useState<ProductProps[][]>([])
  const [comparisonList, setComparisonList] = useState<ProductProps[]>([])
  const [current, setCurrent] = useState<number>(1)

  const redirectToUrl = (productId: string, lipId: string) => {
    const query = new URLSearchParams({ lipId: lipId }).toString()
    router.push(`/product/${productId}/?${query}`, { scroll: true })
  }

  const redirectToHome = () => {
    router.push('/', { scroll: true })
  }

  const createPageIndex = (length: number) => {
    return length < showIndex ? 1 : Math.ceil(length / showIndex)
  }

  const createPage = (length: number) => {
    return [...Array(createPageIndex(length))].map((_, i) => {
      const link: { index: number; jump: () => void } = {
        index: i + 1,
        jump: () => {
          setPage(i + 1)
          setCurrent(current)
        },
      }
      return link
    })
  }

  useEffect(() => {
    if (modalIsOpen || filterIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modalIsOpen, filterIsOpen])

  const sliceList = (arr: ProductProps[], size: number) =>
    arr.flatMap((_, i, a) => (i % size ? [] : [a.slice(i, i + size)]))

  const setProduct = useCallback(
    (product: ProductList | null) => {
      if (!product) return [] // ヌルチェックを追加して、nullの場合に空の配列を返す

      const filteredList = product.productList.filter(
        (value) =>
          value.lip.amount >= rangeValue[0] &&
          value.lip.amount <= rangeValue[1] &&
          value.lip.similarPoint >= similarSelected &&
          (brandChecked.length === 0 || brandChecked.includes(value.lip.brandName)) &&
          (tagChecked.length === 0 || value.tagList.some((tag) => tagChecked.includes(tag.tagName))),
      )

      let sortStateValue = false // 初期値を設定

      if (filteredList.length > 0) {
        sortStateValue = true // フィルタリング結果がある場合はソート可能として設定
      }

      setSortState(sortStateValue) // 最後に一度だけ setSortState を呼び出す

      // sortTypeに基づくソートロジック
      switch (sortType) {
        case '価格が低い順':
          filteredList.sort((first, second) => first.lip.amount - second.lip.amount)
          break
        case '価格が高い順':
          filteredList.sort((first, second) => second.lip.amount - first.lip.amount)
          break
        case '類似度が高い順':
          filteredList.sort((first, second) => second.lip.similarPoint - first.lip.similarPoint)
          break
        case '五十音順':
          filteredList.sort((first, second) => first.lip.productName.localeCompare(second.lip.productName, 'ja'))
          break
        default:
          break
      }

      // Product 形式に変換して返す
      const productList = filteredList.map(
        (lip): ProductProps => ({
          color: `#${lip.lip.colorCode}`,
          product: {
            imgUrl: lip.imageList[0].path ? [lip.imageList[0].path] : [],
            lipId: lip.lip.lipId,
            brandName: lip.lip.brandName,
            productName: lip.lip.productName,
            productColor: `${lip.lip.colorNumber} ${lip.lip.colorName}`,
            productAmount: lip.lip.amount ?? '',
            officialUrl: lip.lip.officialURL,
            amazonUrl: lip.lip.amazonURL,
            qooTenUrl: lip.lip.qooTenURL,
            similarLevel: lip.lip.similarPoint ?? '',
            limitedProductFlag: lip.lip.limitedProductFlag,
            salesStopFlag: lip.lip.salesStopFlag,
            PRFlag: lip.lip.prFlag,
          },
          tagList: lip.tagList.map((tag) => {
            return { type: 'hash', text: tag.tagName }
          }),
          productClick: () => redirectToUrl(lip.lip.productId, String(lip.lip.lipId)),
        }),
      )

      return productList
    },
    [rangeValue, similarSelected, brandChecked, tagChecked, sortType],
  )

  useEffect(() => {
    if (searchResult) {
      const slicedProducts = sliceList(setProduct(searchResult), showIndex)
      setSlicedProductList(slicedProducts)
    }
  }, [searchResult, setProduct])

  const brandHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (brandChecked.includes(e.target.value)) {
      setBrandChecked(brandChecked.filter((check: string) => check !== e.target.value))
    } else {
      setBrandChecked([...brandChecked, e.target.value])
    }
  }

  const tagHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tagChecked.includes(e.target.value)) {
      setTagChecked(tagChecked.filter((check: string) => check !== e.target.value))
    } else {
      setTagChecked([...tagChecked, e.target.value])
    }
  }

  const closeModal = () => {
    setFilterIsOpen(false)
  }

  const handleClearButton = () => {
    setSortType('類似度が高い順')
    setSimilarSelected(0)
    setBrandChecked([])
    setTagChecked([])
    setRangeValue([min, max])
  }

  const changeSortSelected = (select: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(select.target.value)
  }

  const changeSimilarSelected = (select: React.ChangeEvent<HTMLInputElement>) => {
    setSimilarSelected(Number(select.target.value))
  }

  const handleComparisonButton = (product: ProductProps) => {
    const isAlreadyInComparisonList = comparisonList.some(
      (comparison) => comparison.product.lipId === product.product.lipId,
    )

    if (isAlreadyInComparisonList) {
      setComparisonList(comparisonList.filter((check) => check.product.lipId !== product.product.lipId))
    } else {
      setComparisonList([...comparisonList, product])
    }
  }

  const handleDeleteButtonClick = (productToDelete: ProductProps) => {
    const prevList = comparisonList.filter((check) => check.product.lipId !== productToDelete.product.lipId)
    setComparisonList(prevList)
    if (prevList.length === 0) {
      setModalIsOpen(false)
    }
  }

  const handleChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setRangeValue([Math.min(newValue[0], rangeValue[1] - minDistance), rangeValue[1]])
    } else {
      setRangeValue([rangeValue[0], Math.max(newValue[1], rangeValue[0] + minDistance)])
    }
  }

  const selectTag = {
    options: [
      { value: '価格が低い順', label: '価格が低い順' },
      { value: '価格が高い順', label: '価格が高い順' },
      { value: '類似度が高い順', label: '類似度が高い順' },
      { value: '五十音順', label: '五十音順' },
    ],
    defaultValue: { value: sortType, label: sortType },
    optionChange: changeSortSelected,
    value: { value: sortType, label: sortType },
  }

  const sortOptions = selectTag.options.map((option, index) => {
    return { id: option.label, value: option.value, label: option.label }
  })

  const similarOptions = [
    { id: '1', value: 0, label: '全て' },
    { id: '2', value: 6, label: '6以上' },
    { id: '3', value: 7, label: '7以上' },
    { id: '4', value: 8, label: '8以上' },
    { id: '5', value: 9, label: '9以上' },
  ]

  const modalOptions: SortFilterModalProps = {
    brandCheckList: brandNameList.map((brand, index) => {
      return {
        id: brand.value,
        name: 'brand',
        onChange: brandHandleChange,
        checked: brandChecked.includes(brand.value),
        value: brand.value,
      }
    }),

    tagCheckList:
      tags && tags.tagList && tags.tagList.length > 0
        ? tags.tagList.map((tag, index) => {
            return {
              id: tag.tagName,
              name: 'tag',
              onChange: tagHandleChange,
              checked: tagChecked.includes(tag.tagName),
              value: tag.tagName,
            }
          })
        : [],

    sortRadio: {
      id: '1',
      name: 'sort',
      onChange: changeSortSelected,
      options: sortOptions,
      selected: sortType,
      type: 'default',
    },
    similarRadio: {
      id: '1',
      name: 'similar',
      onChange: changeSimilarSelected,
      options: similarOptions,
      selected: similarSelected,
      type: 'default',
    },

    range: {
      value: rangeValue,
      handleChange: handleChange,
    },
    handleSubmitButton: closeModal,
    handleClearButton: handleClearButton,
  }

  const tagList: {
    type: 'hash' | 'sort' | 'amount' | 'similar' | 'brand'
    text: string
  }[] = [
    { type: 'amount', text: `￥${rangeValue[0]} ～ ￥${rangeValue[1]}` },
    {
      type: 'similar',
      text: similarSelected === 0 ? '全て' : `${similarSelected}以上`,
    },
  ]

  brandChecked.map((brand: string) => {
    tagList.push({ type: 'brand', text: brand })
  })

  tagChecked.map((tag: string) => {
    tagList.push({ type: 'hash', text: tag })
  })

  useMount(() => {
    if (colorCode) {
      getSimilarLip(colorCode).then((result) => {
        setSearchResult(result)
      })
      getTags().then((result) => {
        setTags(result)
      })
    }
  })

  return {
    current,
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
  }
}
