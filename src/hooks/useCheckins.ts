import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckIn, getCheckins } from '../api/services/checkinService'

export const useCheckins = () => {
  const [checkins, setCheckins] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCheckins, setTotalCheckins] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [articlesPerPage] = useState(10)

  const fetchCheckins = useCallback(
    async (page: number = 1) => {
      const token = localStorage.getItem('auth_token')

      if (!token) {
        toast.error('No authentication token found')
        return
      }

      setIsLoading(true)

      try {
        const result = await getCheckins(token, page, articlesPerPage)

        if (result.success && result.checkins) {
          setCheckins(result.checkins)
          setTotalCheckins(result.total || 0)
          setTotalPages(result.total_pages || 0)
          setCurrentPage(page)
        } else {
          toast.error(result.error || 'Failed to fetch check-ins')
        }
      } catch (error) {
        toast.error('Unable to connect to server')
      } finally {
        setIsLoading(false)
      }
    },
    [articlesPerPage]
  )

  const refreshCheckins = () => {
    fetchCheckins(currentPage)
  }

  const goToPage = (page: number) => {
    fetchCheckins(page)
  }

  useEffect(() => {
    fetchCheckins(1)
  }, [fetchCheckins])

  return {
    checkins,
    isLoading,
    currentPage,
    totalCheckins,
    totalPages,
    articlesPerPage,
    fetchCheckins,
    refreshCheckins,
    goToPage
  }
}
