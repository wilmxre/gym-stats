import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

interface KPICardProps {
  title: string
  icon: LucideIcon
  value: string | number
  description: string
}

export const KPICard = ({
  title,
  icon: Icon,
  value,
  description
}: KPICardProps) => {
  return (
    <Card className="relative overflow-hidden bg-background-900 transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary-600/10 rounded-lg flex items-center justify-center">
              <Icon className="text-primary-300" />
            </div>

            <h3 className="text-md font-semibold text-primary-300 tracking-wide">
              {title}
            </h3>
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-text-50 leading-tight mb-1">
            {value}
          </div>

          <div className="text-sm text-primary-400">{description}</div>
        </div>
      </CardContent>
    </Card>
  )
}
