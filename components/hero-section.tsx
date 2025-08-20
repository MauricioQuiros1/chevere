"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ValidatedImage } from "./image-validator"

const heroImages = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg/1200px-Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg",
    fallback:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Vista panorámica de Bogotá desde Monserrate",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    fallback:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Paisaje cafetero colombiano con montañas verdes",
  },
  {
    src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    fallback:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Interior de la Catedral de Sal de Zipaquirá",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/98/Villa_de_leyva.jpg",
    fallback:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Plaza principal de Villa de Leyva con arquitectura colonial",
  },
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleWhatsAppReserva = () => {
    window.open("https://wa.me/573054798365?text=Hola, quiero hacer una reserva", "_blank")
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
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <ValidatedImage
              src={image.src}
              fallbackSrc={image.fallback}
              alt={image.alt}
              fill
              className={`object-cover transition-transform duration-1000 ${
                index === currentImage ? "scale-100" : "scale-105"
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
          Chevere Bogota Travel
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            onClick={handleWhatsAppReserva}
            size="lg"
            className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:shadow-2xl animate-pulse hover:animate-none"
          >
            Reservar por WhatsApp
          </Button>
          <Button
            onClick={handleScrollToTours}
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 hover:scale-105 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform hover:shadow-2xl hover:shadow-white/50"
          >
            Tours Bogotá y alrededores
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${
              index === currentImage ? "bg-white shadow-lg shadow-white/50 scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
