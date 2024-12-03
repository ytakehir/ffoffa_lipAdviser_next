'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './rules.module.css'
import React from 'react'
import { Rules } from '@ytakehir/ffoffa_components'

export const RulesView = React.memo(() => {
  return (
    <div className={styles.content}>
      <Rules />
    </div>
  )
})
