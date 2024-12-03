import type { Viewport } from 'next'
import type { Metadata } from 'next'
import thumbnail from '/public/img/サムネイル.png'
import { BrandProvider } from 'src/context/brandContext'
import { NotificationProvider } from 'src/context/NotificationContext'

export const metadata: Metadata = {
  title: 'FFOFFA LIPADVISER',
  description: 'FFOFFA LIPADVISERは、商品や写真・画像などから似ている色味を持つ別のリップを検索することができます。',
  keywords: 'リップ,コスメ,似てる,色,プチプラ,韓国,類似,デパコス,グロス,ティント,口紅,ルージュ,比較',
  metadataBase: new URL('https://ffoffa.com'),
  openGraph: {
    title: 'FFOFFA LIPADVISER',
    description: 'FFOFFA LIPADVISERは、商品や写真・画像などから似ている色味を持つ別のリップを検索することができます。',
    type: 'website',
    url: 'https://ffoffa.com',
    images: thumbnail.src,
    siteName: 'ffoffa',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ffoffa_official',
    creator: '@ffoffa_official',
    title: 'FFOFFA LIPADVISER',
    description: 'FFOFFA LIPADVISERは、商品や写真・画像などから似ている色味を持つ別のリップを検索することができます。',
    images: [thumbnail.src],
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <NotificationProvider>
          <BrandProvider>{children}</BrandProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
