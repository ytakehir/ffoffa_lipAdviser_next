import { MetadataRoute } from 'next'
import { getProductId } from 'src/api/GetProductId'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''
  const lastModified = new Date()
  const productIds = (await getProductId()) as { productIdList: { productId: string }[] }

  const staticPaths = [
    {
      url: baseURL,
    },
    {
      url: `${baseURL}/result`,
    },
    {
      url: `${baseURL}/rules`,
    },
    {
      url: `${baseURL}/privacyPolicy`,
    },
    {
      url: `${baseURL}/contactForm`,
    },
  ]

  const dynamicPaths = productIds.productIdList.map((productId: { productId: string }) => {
    return {
      url: `${baseURL}/product/${productId.productId}`,
      lastModified,
    }
  })

  return [...staticPaths, ...dynamicPaths]
}
