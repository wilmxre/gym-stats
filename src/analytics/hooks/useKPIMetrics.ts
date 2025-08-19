import { useMemo } from 'react'
import { useAllCheckins } from '../../hooks/useAllCheckins'
import { KPIMetrics } from '../types'
import { calculateKPIMetrics } from '../utils/kpiCalculations'

/**
 * Hook to calculate and return KPI metrics for the dashboard
 */
export const useKPIMetrics = (): {
  metrics: KPIMetrics | null
  isLoading: boolean
  hasData: boolean
} => {
  const { allCheckins, isLoading } = useAllCheckins()

  const metrics = useMemo(() => {
    return calculateKPIMetrics(allCheckins)
  }, [allCheckins])

  const hasData = allCheckins.length > 0

  return {
    metrics,
    isLoading,
    hasData
  }
}
