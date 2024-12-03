'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './loading.module.css'
import { Text, Progress } from '@ytakehir/ffoffa_components'
import React from 'react'

export const Loading = React.memo(() => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.progress}>
        <div className={styles.progressLine}>
          <Progress type={'line'} />
        </div>
        <Text size={'h5'} text={'読み込み中です…'} />
      </div>
    </div>
  )
})
