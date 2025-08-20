import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { Homepage, LoginPage } from '../pages'
import { ProtectedRoute, PublicRoute } from './ProtectedRoute'

const App = () => {
  // Use basename only in production (GitHub Pages)
  const basename = import.meta.env.PROD ? '/gym-stats' : ''

  return (
    <Router basename={basename}>
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
