"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { ValidatedImage } from "./image-validator"

const testimonials = [
  {
    name: "María González",
    location: "Bogotá, Colombia",
    image:
      "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-09-27-at-11.12.20-AM-600x600.jpeg",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0147-600x600.jpg",
    rating: 5,
    text: "Excelente servicio en el tour a la Hacienda Cafetera. Mauricio fue muy profesional y conocedor. La experiencia superó nuestras expectativas completamente.",
  },
  {
    name: "Carlos Rodríguez",
    location: "Medellín, Colombia",
    image: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0151-600x600.jpg",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0102-600x600.jpg",
    rating: 5,
    text: "Puntualidad impecable y vehículos en excelente estado. El tour a Villa de Leyva fue increíble. Definitivamente recomiendo Chevere Bogotá Tours.",
  },
  {
    name: "Ana Martínez",
    location: "Cali, Colombia",
    image:
      "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-02-at-12.55.30-PM-600x600.jpeg",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0098-600x600.jpg",
    rating: 5,
    text: "Servicio personalizado de primera calidad. Nos sentimos muy seguros durante todo el recorrido. La atención al detalle es excepcional.",
  },
  {
    name: "Roberto Silva",
    location: "Barranquilla, Colombia",
    image: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0047-600x600.jpg",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0041-600x600.jpg",
    rating: 5,
    text: "La mejor experiencia turística que hemos tenido en Colombia. Guías expertos, transporte cómodo y destinos fascinantes. ¡Volveremos pronto!",
  },
  {
    name: "Laura Jiménez",
    location: "Bucaramanga, Colombia",
    image: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/11/CONDUCTOR-2-600x600.png",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0040-600x600.jpg",
    rating: 5,
    text: "Traslado al aeropuerto perfecto, llegamos con tiempo de sobra. El conductor fue muy amable y el vehículo impecable. Servicio confiable 100%.",
  },
  {
    name: "Diego Herrera",
    location: "Pereira, Colombia",
    image: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231204-WA0092-600x600.jpg",
    fallback: "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20220428-WA0013-600x600.jpg",
    rating: 5,
    text: "Tour a Zipaquirá espectacular. La organización, puntualidad y conocimiento del guía hicieron de este día una experiencia inolvidable para toda la familia.",
  },
]

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2) // Tablet: 2 cards
      } else {
        setSlidesPerView(1) // Mobile: 1 card
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  const maxSlide = Math.max(0, testimonials.length - slidesPerView)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= maxSlide) {
          return 0
        }
        return prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxSlide])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= maxSlide) {
        return 0
      }
      return prev + 1
    })
  }, [maxSlide])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return maxSlide
      }
      return prev - 1
    })
  }, [maxSlide])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
    ))
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const onTouchEnd = () => {
    if (touchStart && touchEnd) {
      const delta = touchStart - touchEnd
      if (delta > 50) {
        nextSlide()
      } else if (delta < -50) {
        prevSlide()
      }
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Experiencias Reales Que Inspiran&nbsp;Confianza
          </h2>
          
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-label="Testimonios de clientes"
        >
          <div
            className="px-4 py-8 overflow-x-hidden overflow-y-visible"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.name} className="flex-shrink-0 px-4" style={{ width: `${100 / slidesPerView}%` }}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg transform">
                    <CardContent className="p-0">
                      <div className="relative">
                        <ValidatedImage
                          src={testimonial.image}
                          fallbackSrc={testimonial.fallback}
                          alt={`${testimonial.name} - Cliente satisfecho`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-white/90">{testimonial.location}</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                        <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              prevSlide()
              setIsAutoPlaying(false)
            }}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={() => {
              nextSlide()
              setIsAutoPlaying(false)
            }}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlide + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index ? "bg-amber-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir al grupo de testimonios ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
