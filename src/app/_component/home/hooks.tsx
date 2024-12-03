'use client'

import { getBrandLogoImage } from 'src/api/GetBrandLogoImage'
import { getBrandName } from 'src/api/GetBrandName'
import { getBrandLip } from 'src/api/GetBrandLip'
import { postColorCodeHistory } from 'src/api/PostColorCodeHistory'
import { postLipHistory } from 'src/api/PostLipHistory'
import { useState, useRef, useEffect } from 'react'
import { useMount } from 'react-use'
import { ImageType, LipOption, Product, StringOption } from 'src/types'
import { SingleValue } from 'react-select'
import { useRouter } from 'next/navigation'
import { useBrand } from 'src/context/brandContext'
import { Image, ColorPreview } from '@ytakehir/ffoffa_components'
import { getLipRanking } from 'src/api/GetLipRanking'
import { getLip } from 'src/api/GetLip'
import { ProductProps } from '@ytakehir/ffoffa_components/dist/types/productTypes'

export const useHome = () => {
  const router = useRouter()
  const { brandNameList, setBrandNameList } = useBrand()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [colorCode, setColorCode] = useState<string>('')
  const [ranking, setRanking] = useState<(ProductProps & { count: number; buttonClick: () => void })[] | null>(null)
  const [lipId, setLipId] = useState<number | null>(null)
  const [selectOptions, setSelectOptions] = useState<string>()
  const [selectSecondOptions, setSelectSecondOptions] = useState<{
    colorCode: string
    lip: string
    lipId: number
  }>()
  const [lipOptions, setLipOptions] = useState<LipOption[]>([])
  const [logoImageList, setLogoImageList] = useState<ImageType[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rankingInterval = 7 //days

  const mediaQuery = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }
    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value
    setColorCode(colorValue)
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pixel = ctx.getImageData(x, y, 1, 1).data

    const color = rgbToHex(pixel[0], pixel[1], pixel[2])
    setColorCode(color)
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const optionChange = (changeValue: SingleValue<StringOption>) => {
    setSelectOptions(String(changeValue?.value))
  }

  const secondOptionChange = (changeValue: SingleValue<LipOption>) => {
    setSelectSecondOptions(changeValue?.value)
    if (!selectSecondOptions?.colorCode) return
    setColorCode(`#${selectSecondOptions?.colorCode}`)

    if (!selectSecondOptions?.lipId) return
    setLipId(selectSecondOptions?.lipId)
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

  const createRanking = (
    product: Product,
    count: number,
  ): ProductProps & { count: number; buttonClick: () => void } => {
    return {
      ...createProduct(product),
      count,
      buttonClick: () => detailClick(product.lip.colorCode, product.lip.lipId),
    }
  }

  useEffect(() => {
    if (!selectSecondOptions?.colorCode) return
    setColorCode(`#${selectSecondOptions?.colorCode}`)
  }, [selectSecondOptions?.colorCode])

  useEffect(() => {
    if (!selectSecondOptions?.lipId) return
    setLipId(selectSecondOptions?.lipId)
  }, [selectSecondOptions?.lipId])

  useMount(async () => {
    mediaQuery()

    const rank = await getLipRanking(rankingInterval).then(
      (result: { lipRankingList: { lipId: number; count: number }[] }) => result,
    )

    const pl: (ProductProps & { count: number; buttonClick: () => void })[] = await Promise.all(
      rank.lipRankingList.map((lipRanking: { lipId: number; count: number }) => {
        return getLip(lipRanking.lipId).then((lip: Product) => createRanking(lip, lipRanking.count * 90))
      }),
    )
    setRanking(pl)

    const bn: { value: string; label: string }[] = []
    getBrandName().then((result) => {
      result.brandNameList.map((brandName: { brandName: string }) => {
        bn.push({
          value: brandName.brandName,
          label: brandName.brandName,
        })
      })
      setBrandNameList(bn)
    })

    const li: { alt: string; path: string }[] = []
    getBrandLogoImage().then((result) => {
      result.imageList.map((image: { alt: string; path: string }) => {
        li.push({
          alt: image.alt,
          path: image.path,
        })
      })
      setLogoImageList([...new Set(li)])
    })
  })

  useEffect(() => {
    const lo: LipOption[] = []
    if (selectOptions) {
      getBrandLip(selectOptions).then((result) => {
        result.lipColorList.map(
          (lipName: {
            colorCode: string
            colorName: string
            colorNumber: string
            productName: string
            lipId: number
          }) => {
            lo.push({
              value: {
                colorCode: lipName.colorCode,
                lip: lipName.colorNumber
                  ? `${lipName.productName} (${lipName.colorNumber} ${lipName.colorName})`
                  : `${lipName.productName} (${lipName.colorName})`,
                lipId: lipName.lipId,
              },
              label: (
                <>
                  <ColorPreview type={'icon'} color={`#${lipName.colorCode}`} />
                  {lipName.colorNumber
                    ? `${lipName.productName} (${lipName.colorNumber} ${lipName.colorName})`
                    : `${lipName.productName} (${lipName.colorName})`}
                </>
              ),
            })
          },
        )
        setLipOptions(lo)
      })
    }
  }, [selectOptions])

  const buttonClick = () => {
    if (colorCode) {
      router.push(`/result/${colorCode.replace('#', '')}`, { scroll: true })
      postColorCodeHistory(colorCode.replace('#', ''))
      if (lipId) {
        postLipHistory(lipId)
      }
    }
  }

  const detailClick = (colorCode: string, lipId: number) => {
    router.push(`/result/${colorCode}`, { scroll: true })
    postColorCodeHistory(colorCode)
    if (lipId) {
      postLipHistory(lipId)
    }
  }

  const brandLogo: React.ReactElement[] = logoImageList.map((logoImage) => {
    return <Image key={logoImage.path} url={logoImage.path} alt={logoImage.alt} width={'100'} height={'auto'} />
  })

  return {
    isMobile,
    colorCode,
    canvasRef,
    ranking,
    handleColorChange,
    handleCanvasMouseDown,
    optionChange,
    secondOptionChange,
    brandNameList,
    lipOptions,
    buttonClick,
    brandLogo,
  }
}
