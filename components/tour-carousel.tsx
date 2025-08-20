"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Lightbox } from "./ui/lightbox"

const images = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Plantación de café colombiano",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Proceso de secado del café",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Degustación de café colombiano",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Paisaje cafetero colombiano",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Recolección de café colombiano",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Procesamiento tradicional del café",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Trabajadores de la finca cafetera",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Taza de café colombiano",
  },
]

export function TourCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4 >= images.length ? 0 : prevIndex + 4))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4 >= images.length ? 0 : prevIndex + 4))
      setIsLoading(false)
    }, 150)
  }

  const prevSlide = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 4 < 0 ? Math.max(0, images.length - 4) : prevIndex - 4))
      setIsLoading(false)
    }, 150)
  }

  const openImage = (index: number) => {
    setSelectedImage(index)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  return (
    <section className=" bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden py-16 rounded-xl">
              <div
                className={`flex transition-all duration-700 ease-out ${isLoading ? "opacity-75" : "opacity-100"}`}
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="w-1/4 flex-shrink-0 px-2 cursor-pointer group"
                    onClick={() => openImage(index)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 transform">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200">
                          <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-125 hover:-translate-x-6 border-2 border-amber-200 hover:border-amber-400 disabled:opacity-50"
              disabled={isLoading}
            >
              <ChevronLeft className="w-6 h-6 text-amber-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-125 hover:translate-x-6 border-2 border-amber-200 hover:border-amber-400 disabled:opacity-50"
              disabled={isLoading}
            >
              <ChevronRight className="w-6 h-6 text-amber-700" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.ceil(images.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 4)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-150 ${
                    Math.floor(currentIndex / 4) === index
                      ? "bg-amber-600 scale-125 shadow-lg shadow-amber-300"
                      : "bg-gray-300 hover:bg-amber-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {selectedImage !== null && (
  <Lightbox
    onClose={closeImage}
    title={images[selectedImage].alt}
    alignTop // descomenta si la quieres ver arriba en lugar de centrada
  >
    <img
      src={images[selectedImage].src || "/placeholder.svg"}
      alt={images[selectedImage].alt}
      className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
    />
  </Lightbox>
)}

        </div>
      </div>
    </section>
  )
}
