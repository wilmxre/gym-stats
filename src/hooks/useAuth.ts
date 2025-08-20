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
  const [email, setEmail] = useState(() => {
    // Initialize from localStorage if credentials are remembered
    return localStorage.getItem('remembered_email') || ''
  })
  const [pincode, setPincode] = useState(() => {
    // Initialize from localStorage if credentials are remembered
    return localStorage.getItem('remembered_pincode') || ''
  })
  const [rememberCredentials, setRememberCredentials] = useState(() => {
    return localStorage.getItem('remember_credentials') === 'true'
  })
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

        // Handle remember credentials
        if (rememberCredentials) {
          localStorage.setItem('remembered_email', email)
          localStorage.setItem('remembered_pincode', pincode)
          localStorage.setItem('remember_credentials', 'true')
        } else {
          localStorage.removeItem('remembered_email')
          localStorage.removeItem('remembered_pincode')
          localStorage.removeItem('remember_credentials')
        }

        setUserInfo(result.member)
        toast.success(`Welcome back, ${result.member.fname}!`)
        navigate('/')
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

    // Only clear credentials if "remember" is not checked
    if (!rememberCredentials) {
      setEmail('')
      setPincode('')
      localStorage.removeItem('remembered_email')
      localStorage.removeItem('remembered_pincode')
      localStorage.removeItem('remember_credentials')
    }

    toast.success('Logged out successfully')
    navigate('/login')
  }

  return {
    email,
    setEmail,
    pincode,
    setPincode,
    rememberCredentials,
    setRememberCredentials,
    isLoading,
    userInfo,
    handleLogin,
    handleLogout
  }
}
