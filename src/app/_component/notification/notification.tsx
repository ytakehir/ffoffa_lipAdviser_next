'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './notification.module.css'
import React from 'react'
import { useNotification } from 'src/context/NotificationContext'
import clsx from 'clsx'
import classNames from 'classnames'
import { NotificationBar } from '@ytakehir/ffoffa_components'

export const Notification = React.memo(() => {
  const { notification } = useNotification()

  return (
    notification.isVisible && (
      <div
        className={classNames(styles.content, clsx(notification.isAnimation ? styles.animation : styles.noAnimation))}
      >
        <NotificationBar
          message={notification.message}
          type={
            notification.status.error
              ? 'error'
              : notification.status.success
                ? 'success'
                : notification.status.info
                  ? 'info'
                  : 'info'
          }
          link={notification.link ?? undefined}
        />
      </div>
    )
  )
})
