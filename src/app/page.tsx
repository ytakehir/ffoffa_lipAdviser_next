'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../global.css'
import { Home } from './_component/home/home'
import ViewLayout from './(pages)/layout'
import Head from 'next/head'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function Page() {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${baseURL}/`} />
      </Head>
      <ViewLayout>
        <Home />
      </ViewLayout>
    </>
  )
}
