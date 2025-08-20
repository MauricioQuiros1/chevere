"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { ValidatedImage } from "./image-validator"

const tours = [
  {
    id: "hacienda-cafetera-coloma",
    title: "Tour Hacienda Cafetera Coloma",
    description: "Vive la auténtica cultura cafetera colombiana en una joya ubicada en Fusagasugá.",
    image: "https://corsproxy.io/?https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    fallback:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "8 horas",
    groupSize: "Máximo 4 personas",
    location: "Fusagasugá",
    price: "Desde US $72",
    featured: true,
  },
  {
    id: "catedral-sal-zipaquira",
    title: "Catedral de Sal de Zipaquirá",
    description: "Descubre esta maravilla arquitectónica construida en las profundidades de una mina de sal.",
    image: "https://corsproxy.io/?https://upload.wikimedia.org/wikipedia/commons/9/98/Villa_de_leyva.jpg",
    fallback:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "6 horas",
    groupSize: "Grupos pequeños",
    location: "Zipaquirá",
    price: "Desde US $65",
    featured: false,
  },
  {
    id: "laguna-guatavita",
    title: "Laguna de Guatavita",
    description: "Conoce la laguna sagrada de los muiscas y la leyenda de El Dorado.",
    image:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    fallback:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "5 horas",
    groupSize: "Grupos medianos",
    location: "Guatavita",
    price: "Desde US $58",
    featured: false,
  },
  {
    id: "cerro-monserrate",
    title: "Cerro de Monserrate",
    description: "Disfruta de las mejores vistas panorámicas de Bogotá desde 3,152 metros de altura.",
    image:
      "https://corsproxy.io/?https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg/600px-2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg",
    fallback:
      "https://corsproxy.io/?https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg/600px-Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg",
    duration: "4 horas",
    groupSize: "Flexible",
    location: "Bogotá",
    price: "Desde US $45",
    featured: false,
  },
  {
    id: "museo-oro-centro-historico",
    title: "Museo del Oro & Centro Histórico",
    description: "Explora la riqueza cultural de Colombia en el corazón histórico de Bogotá.",
    image: "https://corsproxy.io/?https://images.unsplash.com/photo-1555400082-8c5b3b8b4b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    fallback:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "6 horas",
    groupSize: "Grupos pequeños",
    location: "Bogotá Centro",
    price: "Desde US $55",
    featured: false,
  },
  {
    id: "villa-de-leyva",
    title: "Villa de Leyva Día Completo",
    description: "Recorre uno de los pueblos coloniales mejor conservados de Colombia.",
    image: "https://corsproxy.io/?https://upload.wikimedia.org/wikipedia/commons/9/98/Villa_de_leyva.jpg",
    fallback:
      "https://corsproxy.io/?https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "10 horas",
    groupSize: "Grupos medianos",
    location: "Villa de Leyva",
    price: "Desde US $85",
    featured: false,
  },
]

export function ToursSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(tours.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

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

  const maxSlide = Math.max(0, tours.length - slidesPerView)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Simplified loop back to start when reaching end
        if (prev >= maxSlide) {
          return 0
        }
        return prev + 1
      })
    }, 4000)

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

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
      setIsAutoPlaying(false)
    } else if (isRightSwipe) {
      prevSlide()
      setIsAutoPlaying(false)
    }
  }

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          ref={carouselRef}
        >
          <div
            className="overflow-x-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out py-16"
              style={{
                transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
              }}
            >
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / slidesPerView}%` }}
                  ref={(el) => { cardRefs.current[index] = el }}
                >
                  <Card
                    className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden border-2 hover:border-amber-200 transform ${
                      visibleCards[index] ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <ValidatedImage
                        src={tour.image}
                        fallbackSrc={tour.fallback}
                        alt={tour.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute top-4 right-0 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                        {tour.price}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                        {tour.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {tour.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-gray-500 group-hover:text-amber-600 transition-colors duration-300">
                          <Clock className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 group-hover:text-amber-600 transition-colors duration-300">
                          <Users className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                          {tour.groupSize}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 group-hover:text-amber-600 transition-colors duration-300">
                          <MapPin className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                          {tour.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-amber-700 group-hover:scale-110 transition-transform duration-300">
                          {tour.price}
                        </div>
                        <Link href={tour.id === "hacienda-cafetera-coloma" ? `/tours/${tour.id}` : "#"}>
                          <Button
                            className="bg-amber-700 hover:bg-amber-800 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 active:scale-95 btn-enhanced"
                            disabled={tour.id !== "hacienda-cafetera-coloma"}
                            onClick={() => {
                              if (tour.id === "hacienda-cafetera-coloma") {
                                setTimeout(() => {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  })
                                }, 100)
                              }
                            }}
                          >
                            Ver detalle
                          </Button>
                        </Link>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white shadow-xl rounded-full z-10 hover:scale-125 hover:-translate-x-6 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
            aria-label="Tour anterior"
          >
            <ChevronLeft className="h-6 w-6 text-amber-700" />
          </Button>

          <Button
            onClick={() => {
              nextSlide()
              setIsAutoPlaying(false)
            }}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white shadow-xl rounded-full z-10 hover:scale-125 hover:translate-x-6 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
            aria-label="Siguiente tour"
          >
            <ChevronRight className="h-6 w-6 text-amber-700" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlide + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                  currentSlide === index
                    ? "bg-amber-600 scale-125 shadow-lg shadow-amber-300"
                    : "bg-gray-300 hover:bg-amber-400"
                }`}
                aria-label={`Ir al grupo de tours ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
