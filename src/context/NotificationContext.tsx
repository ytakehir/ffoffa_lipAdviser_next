'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type NotificationType = {
  isVisible: boolean
  isAnimation: boolean
  status: { success: boolean; error: boolean; info: boolean }
  message: string[]
  link?: string
}

interface NotificationContextType {
  notification: NotificationType
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationContext')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationType>({
    isVisible: false,
    isAnimation: false,
    status: { success: false, error: false, info: false },
    message: [''],
  })

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>{children}</NotificationContext.Provider>
  )
}
