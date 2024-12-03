'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { StringOption } from 'src/types'

interface BrandContextType {
  brandNameList: StringOption[]
  setBrandNameList: React.Dispatch<React.SetStateAction<StringOption[]>>
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

export const useBrand = () => {
  const context = useContext(BrandContext)
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandContext')
  }
  return context
}

interface BrandProviderProps {
  children: ReactNode
}

export const BrandProvider = ({ children }: BrandProviderProps) => {
  const [brandNameList, setBrandNameList] = useState<StringOption[]>([{ label: '', value: '' }])

  return <BrandContext.Provider value={{ brandNameList, setBrandNameList }}>{children}</BrandContext.Provider>
}
