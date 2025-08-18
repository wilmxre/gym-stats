import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckIn, getCheckins } from '../api/services/checkinService'

export const useAllCheckins = () => {
  const [allCheckins, setAllCheckins] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchOnce = useRef(false)

  const fetchAllCheckins = useCallback(async () => {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      toast.error('No authentication token found')
      return
    }

    setIsLoading(true)

    try {
      const metadataResult = await getCheckins(token, 1, 1)

      if (!metadataResult.success) {
        toast.error(metadataResult.error || 'Failed to fetch check-ins')
        return
      }

      const total = metadataResult.total || 0
      setTotal(total)

      if (total === 0) {
        setAllCheckins([])
        return
      }

      const allDataResult = await getCheckins(token, 1, total)

      if (!allDataResult.success || !allDataResult.checkins) {
        toast.error(allDataResult.error || 'Failed to fetch all check-ins')
        return
      }

      setAllCheckins(allDataResult.checkins)
    } catch (error) {
      toast.error('Unable to connect to server')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (fetchOnce.current) {
      return
    }

    fetchOnce.current = true
    fetchAllCheckins()
  }, [fetchAllCheckins])

  return {
    allCheckins,
    isLoading,
    total,
    refetchAllCheckins: fetchAllCheckins
  }
}
