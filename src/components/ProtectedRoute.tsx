import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userInfo } = useAuth()

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { userInfo } = useAuth()

  if (userInfo) {
    return <Navigate to="/checkins" replace />
  }

  return <>{children}</>
}
