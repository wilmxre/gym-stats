import { useAuth } from '../hooks/useAuth'
import { ThemeContext, useThemeProvider } from '../hooks/useTheme'
import { DashboardPage, LoginPage } from '../pages'

const AppContent = () => {
  const { userInfo } = useAuth()

  if (userInfo) {
    return <DashboardPage />
  }

  return <LoginPage />
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
