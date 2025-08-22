import { LogOut, Menu } from 'lucide-react'
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
        className="bg-black/30 backdrop-blur-md border text-white border-accent-300 shadow-xl rounded-xl hover:bg-black/40 active:bg-black/40 focus-within:bg-black/40 focus:bg-black/40 focus-visible:bg-black/40"
        aria-label="User menu"
      >
        <Menu className="h-5 w-5 text-primary-100" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <Card className="fixed right-6 mt-2 z-50 w-80 bg-black/30 backdrop-blur-md border border-accent-300 shadow-xl">
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
              <CardDescription className="text-accent-100">
                {userInfo.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <Label className="text-accent-100">Member ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.id}</p>
                </div>
                <div>
                  <Label className="text-accent-100">Club ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.clubid}</p>
                </div>
              </div>

              <div>
                <Label className="text-accent-100">Location</Label>
                <p className="text-text-50">
                  {userInfo.city}, {userInfo.country}
                </p>
              </div>

              <Button
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
                className="w-full"
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
