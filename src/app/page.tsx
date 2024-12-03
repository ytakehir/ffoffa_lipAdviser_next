'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../global.css'
import { Home } from './_component/home/home'
import ViewLayout from './(pages)/layout'

export default function Page() {
  return (
    <ViewLayout>
      <Home />
    </ViewLayout>
  )
}
