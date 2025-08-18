import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckIn, getCheckins } from '../api/services/checkinService'

export const useCheckins = () => {
  const [checkins, setCheckins] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCheckins, setTotalCheckins] = useState(0)
  const [articlesPerPage] = useState(10)

  const fetchCheckins = async (page: number = 1) => {
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
        setCurrentPage(page)
      } else {
        toast.error(result.error || 'Failed to fetch check-ins')
      }
    } catch (error) {
      toast.error('Unable to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshCheckins = () => {
    fetchCheckins(currentPage)
  }

  const goToPage = (page: number) => {
    fetchCheckins(page)
  }

  // Auto-fetch on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      fetchCheckins(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.ceil(totalCheckins / articlesPerPage)

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
