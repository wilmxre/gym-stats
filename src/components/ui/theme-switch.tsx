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
      className="bg-background-200 hover:bg-background-200/90 backdrop-blur-sm border border-secondary-300/20"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-primary-800" />
      ) : (
        <Moon className="h-5 w-5 text-primary-800" />
      )}
    </Button>
  )
}
