import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { Button } from './button'

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-background-400/50 hover:bg-background-300/60 backdrop-blur-sm border border-secondary-300/20"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-primary-500" />
      ) : (
        <Moon className="h-5 w-5 text-primary-200" />
      )}
    </Button>
  )
}
