"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    checkMobile()
    handleScroll()

    window.addEventListener("resize", checkMobile)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/573054798365?text=Hola, quiero más información 👋", "_blank")
  }

  if (!isVisible) return null

  return (
    <>
      {/* Mobile: Fixed button with minimum 48px touch target */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg transition-all duration-250 hover:scale-105"
            size="lg"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Desktop: Button with text and hover shadow */}
      {!isMobile && (
        <div className="fixed bottom-8 right-8 z-[9999]">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 hover:shadow-xl text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-250 hover:scale-105"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </Button>
        </div>
      )}
    </>
  )
}
