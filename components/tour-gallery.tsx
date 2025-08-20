"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { ValidatedImage } from "./image-validator"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Paisaje de la Hacienda Cafetera Coloma con montañas verdes",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Proceso de secado del café en patios tradicionales",
  },
  {
    src: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Degustación de café colombiano premium",
  },
  {
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Recolección manual de granos de café maduro",
  },
  {
    src: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Procesamiento tradicional del café en beneficiadero",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Vistas montañosas de la hacienda cafetera",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Instalaciones de la hacienda con arquitectura tradicional",
  },
  {
    src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Granos de café tostado artesanal",
  },
]

export function TourGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }

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
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Galería de la Experiencia</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Descubre la belleza de la Hacienda Cafetera Coloma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-250 hover:-translate-y-1"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ValidatedImage
                  src={image.src}
                  fallbackSrc={image.fallback}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-250" />
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox with swipe support */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative max-w-4xl max-h-full">
              <ValidatedImage
                src={galleryImages[selectedImage].src}
                fallbackSrc={galleryImages[selectedImage].fallback}
                alt={galleryImages[selectedImage].alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
                sizes="100vw"
              />

              {/* Close button */}
              <Button
                onClick={closeLightbox}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                aria-label="Cerrar galería"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                onClick={prevImage}
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextImage}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
