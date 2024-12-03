'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './privacyPolicy.module.css'
import React from 'react'
import { PrivacyPolicy } from '@ytakehir/ffoffa_components'

export const PrivacyPolicyView = React.memo(() => {
  return (
    <div className={styles.content}>
      <PrivacyPolicy />
    </div>
  )
})
