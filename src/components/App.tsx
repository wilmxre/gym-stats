import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { ThemeContext, useThemeProvider } from '../hooks/useTheme'
import { CheckInsPage, LoginPage } from '../pages'
import { ProtectedRoute, PublicRoute } from './ProtectedRoute'

const AppContent = () => {
  return (
    <Router>
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
          path="/checkins"
          element={
            <ProtectedRoute>
              <CheckInsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

const App = () => {
  const themeProvider = useThemeProvider()

  return (
    <ThemeContext.Provider value={themeProvider}>
      <AppContent />
    </ThemeContext.Provider>
  )
}

export default App
