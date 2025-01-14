'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import { ContactFormView } from 'src/app/_component/contactForm/contactForm'
import Head from 'next/head'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function Page() {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${baseURL}/contactForm`} />
      </Head>
      <ContactFormView />
    </>
  )
}
