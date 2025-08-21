"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ValidatedImage } from "./image-validator"
import { sanityClient } from "@/lib/sanity"
import { heroQuery } from "@/lib/queries"


export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  type HeroImage = { src?: string | null; fallback?: string | null; alt?: string | null }
  type HeroData = {
    title?: string | null
    whatsappText?: string | null
    toursButtonText?: string | null
    whatsappNumber?: string | null
    images?: HeroImage[]
  }

  const [hero, setHero] = useState<HeroData | null>(null)

  useEffect(() => {
    sanityClient.fetch(heroQuery).then((data) => {
      setHero(data || null)
    })
  }, [])

  // Slider interval: only run when there are at least 2 images
  useEffect(() => {
    const images = hero?.images || []
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [hero?.images])

  const nextImage = () => {
    const images = hero?.images || []
    if (images.length === 0) return
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    const images = hero?.images || []
    if (images.length === 0) return
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleScrollToTours = () => {
    const toursSection = document.getElementById("tours")
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {(hero?.images || []).map((image: HeroImage, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
          >
            <ValidatedImage
              src={image?.src || image?.fallback || "/placeholder.jpg"}
              fallbackSrc={image?.fallback || "/placeholder.jpg"}
              alt={image?.alt || "Imagen del hero"}
              fill
              className={`object-cover transition-transform duration-1000 ${index === currentImage ? "scale-100" : "scale-105"
                }`}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-2 rounded-full transition-all duration-300 transform hover:-translate-x-1"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-2 rounded-full transition-all duration-300 transform hover:translate-x-1"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in-up hover:animate-bounce">
          <Image
            src="/logo.png"
            alt="Chevere Bogotá Tours"
            width={120}
            height={120}
            className="mx-auto mb-6 transition-transform duration-300 hover:scale-110"
          />
        </div>

        <h1
          className="text-4xl md:text-6xl font-serif font-bold mb-12 animate-fade-in-up text-shadow-lg hover:text-shadow-xl transition-all duration-300"
          style={{ animationDelay: "0.2s" }}
        >
          {hero?.title || "Chevere Bogota Travel"}
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            onClick={() => {
              const number = hero?.whatsappNumber || "573054798365"
              const text = encodeURIComponent(hero?.whatsappText || "Hola, quiero hacer una reserva")
              window.open(`https://wa.me/${number}?text=${text}`, "_blank")
            }}
            size="lg"
            className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:shadow-2xl animate-pulse hover:animate-none"
          >
            {hero?.whatsappText || "Reservar por WhatsApp"}
          </Button>
          <Button
            onClick={handleScrollToTours}
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 hover:scale-105 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform hover:shadow-2xl hover:shadow-white/50"
          >
            {hero?.toursButtonText || "Tours Bogotá y alrededores"}
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {(hero?.images || []).map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${index === currentImage ? "bg-white shadow-lg shadow-white/50 scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
