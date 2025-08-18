import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card'

interface KPICardProps {
  title: string
  icon: string
  mainValue: string | number
  mainLabel: string
  pulse?: boolean
  badge?: {
    color: 'green' | 'orange' | 'gray' | 'gold'
    text: string
  }
}

export const KPICard = ({
  title,
  icon,
  mainValue,
  mainLabel,
  pulse = false,
  badge
}: KPICardProps) => {
  const getBadgeClasses = (color: string) => {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-medium rounded-full'
    switch (color) {
      case 'green':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      case 'orange':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`
      case 'gray':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`
      case 'gold':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`
    }
  }

  return (
    <Card className="relative overflow-hidden bg-background-900 border-secondary-700 hover:border-secondary-600 transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-semibold text-text-400 uppercase tracking-widest">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        {/* Main metric */}
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 mt-1">{icon}</span>
          <div className={`flex-1 ${pulse ? 'animate-pulse' : ''}`}>
            <div className="text-2xl lg:text-3xl font-bold text-text-50 leading-tight">
              {mainValue}
            </div>
            <div className="text-sm text-text-300 mt-1">{mainLabel}</div>
          </div>
          {badge && (
            <span className={getBadgeClasses(badge.color)}>{badge.text}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
