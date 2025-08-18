import { Toaster } from 'react-hot-toast'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { ThemeSwitch } from '../components/ui/theme-switch'
import { useCheckins } from '../hooks/useCheckins'

export const CheckInsPage = () => {
  const {
    checkins,
    isLoading,
    currentPage,
    totalCheckins,
    totalPages,
    refreshCheckins,
    goToPage
  } = useCheckins()

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-background-950 p-4 relative">
      <ThemeSwitch />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background-800))',
            color: 'hsl(var(--text-50))',
            border: '1px solid hsl(var(--secondary-600))'
          }
        }}
      />

      <div className="max-w-4xl mx-auto">
        <Card className="bg-background-900 border border-secondary-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-text-50">Check-ins</CardTitle>
              <CardDescription className="text-primary-400">
                Your gym visit history ({totalCheckins} total)
              </CardDescription>
            </div>
            <Button
              onClick={refreshCheckins}
              disabled={isLoading}
              variant="outline"
              className="bg-primary-600 hover:bg-primary-700 text-text-50"
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </CardHeader>

          <CardContent>
            {isLoading && checkins.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-text-400 mt-2">Loading check-ins...</p>
              </div>
            ) : checkins.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-400">No check-ins found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {checkins && checkins?.length > 0 ? (
                  checkins.map((checkin) => (
                    <div
                      key={checkin.id}
                      className="flex items-center justify-between p-4 bg-secondary-800 rounded-lg border border-secondary-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-text-50 font-medium">
                              {formatDate(checkin.checkin_time)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {formatTime(checkin.checkin_time)}
                            </Badge>
                          </div>
                          {checkin.location && (
                            <p className="text-text-400 text-sm mt-1">
                              {checkin.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {checkin.checkout_time ? (
                          <div>
                            <Badge
                              variant="outline"
                              className="text-accent-400"
                            >
                              Out: {formatTime(checkin.checkout_time)}
                            </Badge>
                            {checkin.duration && (
                              <p className="text-text-400 text-xs mt-1">
                                Duration: {checkin.duration}
                              </p>
                            )}
                          </div>
                        ) : (
                          <Badge className="bg-green-600 text-text-50">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-text-400 text-center">
                    No check-ins available
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-secondary-700">
                <p className="text-text-400 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
