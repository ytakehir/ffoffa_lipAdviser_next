'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import React from 'react'
import { Text } from '@ytakehir/ffoffa_components'

export const NotFoundView = React.memo(() => {
  return <Text size={'h1'} text={'Sorry, 404 NotFound'} />
})
