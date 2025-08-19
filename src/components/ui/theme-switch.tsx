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
      className="bg-hex-secondary hover:bg-hex-secondary backdrop-blur-sm border border-hex-text"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-hex-text" />
      ) : (
        <Moon className="h-5 w-5 text-hex-text" />
      )}
    </Button>
  )
}
