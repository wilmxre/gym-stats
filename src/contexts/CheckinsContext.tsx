import React, { createContext, useContext, ReactNode } from 'react'
import { useAllCheckins } from '../hooks/useAllCheckins'
import { CheckIn } from '../api/services/checkinService'

interface CheckinsContextValue {
  allCheckins: CheckIn[]
  isLoading: boolean
  total: number
  refetchAllCheckins: () => Promise<void>
}

const CheckinsContext = createContext<CheckinsContextValue | undefined>(undefined)

interface CheckinsProviderProps {
  children: ReactNode
}

export const CheckinsProvider: React.FC<CheckinsProviderProps> = ({ children }) => {
  const checkinsData = useAllCheckins()

  return (
    <CheckinsContext.Provider value={checkinsData}>
      {children}
    </CheckinsContext.Provider>
  )
}

export const useCheckins = (): CheckinsContextValue => {
  const context = useContext(CheckinsContext)
  if (context === undefined) {
    throw new Error('useCheckins must be used within a CheckinsProvider')
  }
  return context
}
