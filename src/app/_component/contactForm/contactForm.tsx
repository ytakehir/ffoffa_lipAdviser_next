'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './contactForm.module.css'
import React from 'react'
import { useNotification } from 'src/context/NotificationContext'
import { Text, ContactForm } from '@ytakehir/ffoffa_components'

export const ContactFormView = React.memo(() => {
  const { setNotification } = useNotification()
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <Text size={'h3'} text={'お問い合わせフォーム'} />
      </div>
      <div className={styles.form}>
        <ContactForm
          emailJS={{
            serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
            templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
            publicId: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID ?? '',
          }}
          buttonClick={(status) => {
            setNotification({ isVisible: true, isAnimation: true, status: status.status, message: [status.message] })
          }}
        />
      </div>
    </div>
  )
})
