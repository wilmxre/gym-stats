import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from 'react-router-dom'
import { useEffect } from 'react'
import { Homepage, LoginPage } from '../pages'
import { ProtectedRoute, PublicRoute } from './ProtectedRoute'

const RedirectHandler = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      // Extract the path without the base
      const path = redirectPath.replace('/gym-stats', '') || '/'
      navigate(path, { replace: true })
    }
  }, [navigate])
  
  return null
}

const App = () => {
  // Use basename only in production (GitHub Pages)
  const basename = import.meta.env.PROD ? '/gym-stats' : ''

  return (
    <Router basename={basename}>
      <RedirectHandler />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
