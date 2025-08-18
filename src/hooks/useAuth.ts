import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/services/authService'

export interface UserInfo {
  id: string
  fname: string
  lname: string
  email: string
  city: string
  country: string
  mobile_phone: string
  clubid: string
  qr_code: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pincode, setPincode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    // Initialize from localStorage on app start
    const stored = localStorage.getItem('user_info')
    return stored ? JSON.parse(stored) : null
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !pincode) {
      toast.error('Please enter both email and pincode')
      return
    }

    setIsLoading(true)
    try {
      const result = await login(email, pincode)

      if (result.success && result.token && result.member) {
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('user_info', JSON.stringify(result.member))

        setUserInfo(result.member)
        toast.success(`Welcome back, ${result.member.fname}!`)
        navigate('/checkins')
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      toast.error('Unable to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    setUserInfo(null)
    setEmail('')
    setPincode('')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return {
    email,
    setEmail,
    pincode,
    setPincode,
    isLoading,
    userInfo,
    handleLogin,
    handleLogout
  }
}
