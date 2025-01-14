'use client'

import '../global.css'
import ViewLayout from './(pages)/layout'
import { ErrorView } from './_component/Error/Error'

export default function Page() {
  return (
    <ViewLayout>
      <ErrorView />
    </ViewLayout>
  )
}
