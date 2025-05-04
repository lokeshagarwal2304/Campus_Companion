"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Book, HardDrive, Calculator, Clock, Briefcase, Home, Menu, X, LogIn } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"

const navItems = [
  { name: "Home", href: "#home", icon: <Home className="h-4 w-4 mr-2" /> },
  { name: "Notes", href: "#notes", icon: <Book className="h-4 w-4 mr-2" /> },
  { name: "Drive", href: "#drive", icon: <HardDrive className="h-4 w-4 mr-2" /> },
  { name: "Calculator", href: "#calculator", icon: <Calculator className="h-4 w-4 mr-2" /> },
  { name: "Productivity", href: "#productivity", icon: <Clock className="h-4 w-4 mr-2" /> },
  { name: "Placement", href: "#placement", icon: <Briefcase className="h-4 w-4 mr-2" /> },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = (userData: { email: string; password: string }) => {
    // Simulate login
    console.log("Login data:", userData)
    setIsLoggedIn(true)
    setIsLoginOpen(false)
    toast({
      title: "Login Successful",
      description: "Welcome back to Campus Companion!",
    })
  }

  const handleSignup = (userData: { name: string; email: string; password: string }) => {
    // Simulate signup
    console.log("Signup data:", userData)
    setIsLoggedIn(true)
    setIsSignupOpen(false)
    toast({
      title: "Account Created",
      description: "Welcome to Campus Companion!",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">Campus Companion</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <div className="ml-4 flex items-center space-x-2">
                <ModeToggle />
                {isLoggedIn ? (
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <ModeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsLoginOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onSignupClick={() => {
          setIsLoginOpen(false)
          setIsSignupOpen(true)
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSignup={handleSignup}
        onLoginClick={() => {
          setIsSignupOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </>
  )
}
