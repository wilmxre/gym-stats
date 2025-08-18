import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckIn, getCheckins } from '../api/services/checkinService'

/**
 * Hook to fetch all checkins for analytics purposes
 * This fetches all pages of checkins data to provide complete statistics
 */
export const useAllCheckins = () => {
  const [allCheckins, setAllCheckins] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchAllCheckins = useCallback(async () => {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      toast.error('No authentication token found')
      return
    }

    setIsLoading(true)

    try {
      // First, get the first page to know total pages
      const firstResult = await getCheckins(token, 1, 50) // Get more per page for efficiency

      if (!firstResult.success || !firstResult.checkins) {
        toast.error(firstResult.error || 'Failed to fetch check-ins')
        return
      }

      let allData: CheckIn[] = [...firstResult.checkins]
      setTotal(firstResult.total || 0)

      // If there are more pages, fetch them all
      const totalPages = firstResult.total_pages || 1
      if (totalPages > 1) {
        const promises = []
        for (let page = 2; page <= totalPages; page++) {
          promises.push(getCheckins(token, page, 50))
        }

        const results = await Promise.all(promises)

        for (const result of results) {
          if (result.success && result.checkins) {
            allData = [...allData, ...result.checkins]
          }
        }
      }

      // Sort by date (newest first)
      allData.sort(
        (a, b) =>
          new Date(b.date_checkin).getTime() -
          new Date(a.date_checkin).getTime()
      )

      setAllCheckins(allData)
    } catch (error) {
      toast.error('Unable to connect to server')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllCheckins()
  }, [fetchAllCheckins])

  return {
    allCheckins,
    isLoading,
    total,
    refetchAllCheckins: fetchAllCheckins
  }
}
