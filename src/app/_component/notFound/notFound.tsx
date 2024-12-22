'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './notFound.module.css'
import React from 'react'
import { Button, Text } from '@ytakehir/ffoffa_components'
import { useRouter } from 'next/navigation'

export const NotFoundView = React.memo(() => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Text
        size={'h5'}
        text={
          <>
            申し訳ございませんが、
            <br />
            お探しのページは見つかりませんでした。
          </>
        }
      />
      <Button buttonType={'noneIcon'} visual={'primary'} onClick={() => router.replace('/')}>
        トップページに戻る
      </Button>
    </div>
  )
})
