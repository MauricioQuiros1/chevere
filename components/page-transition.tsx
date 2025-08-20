"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    setIsVisible(false)

    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Loading overlay */}
      <div
        className={`fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-white to-amber-100 transition-all duration-500 ${
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-amber-400 rounded-full animate-spin mx-auto"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
            <p className="text-amber-700 font-medium animate-pulse">Cargando experiencia...</p>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {children}
      </div>
    </>
  )
}
