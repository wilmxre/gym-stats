import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from './button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './card'
import { Label } from './label'

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo, handleLogout } = useAuth()

  if (!userInfo) {
    return null
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="fixed top-4 right-16 z-50 bg-background-200/50 hover:bg-background-200/60 backdrop-blur-sm border border-secondary-300/20"
        aria-label="User menu"
      >
        <User className="h-5 w-5 text-primary-800" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <Card className="fixed top-16 right-4 z-50 w-80 bg-background-900/90 backdrop-blur-sm border border-secondary-700 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-text-50 font-bold text-xl">
                  {userInfo.fname[0]}
                  {userInfo.lname[0]}
                </span>
              </div>
              <CardTitle className="text-xl text-text-50">
                {userInfo.fname} {userInfo.lname}
              </CardTitle>
              <CardDescription className="text-primary-400">
                {userInfo.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <Label className="text-primary-400">Member ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.id}</p>
                </div>
                <div>
                  <Label className="text-primary-400">Club ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.clubid}</p>
                </div>
                <div>
                  <Label className="text-primary-400">Location</Label>
                  <p className="text-text-50">
                    {userInfo.city}, {userInfo.country}
                  </p>
                </div>
                <div>
                  <Label className="text-primary-400">Phone</Label>
                  <p className="text-text-50">{userInfo.mobile_phone}</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
