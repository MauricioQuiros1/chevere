"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Hacienda Cafetera Coloma - Paisaje cafetero",
    category: "Hacienda Cafetera",
  },
  {
    src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Catedral de Sal de Zipaquirá - Interior",
    category: "Zipaquirá",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/98/Villa_de_leyva.jpg",
    alt: "Villa de Leyva - Plaza principal",
    category: "Villa de Leyva",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    alt: "Laguna de Guatavita - Vista panorámica",
    category: "Guatavita",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg/500px-2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg",
    alt: "Cerro de Monserrate - Vista de Bogotá",
    category: "Monserrate",
  },
  {
    src: "https://images.unsplash.com/photo-1555400082-8c5b3b8b4b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Museo del Oro - Piezas precolombinas",
    category: "Museo del Oro",
  },
  {
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Proceso del café - Recolección",
    category: "Hacienda Cafetera",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg/800px-Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg",
    alt: "Centro Histórico de Bogotá - Arquitectura colonial",
    category: "Centro Histórico",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    alt: "Degustación de café - Experiencia sensorial",
    category: "Hacienda Cafetera",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Paisajes de Cundinamarca - Montañas verdes",
    category: "Paisajes",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Transporte Chevere Tours - Vehículos cómodos",
    category: "Nuestro Servicio",
  },
  {
    src: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Artesanías colombianas - Cultura local",
    category: "Cultura",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    alt: "Gastronomía colombiana - Platos típicos",
    category: "Gastronomía",
  },
  {
    src: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    alt: "Arquitectura religiosa - Iglesias coloniales",
    category: "Arquitectura",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Flora colombiana - Biodiversidad",
    category: "Naturaleza",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Clientes satisfechos - Momentos especiales",
    category: "Nuestros Clientes",
  },
]

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas")

  const categories = ["Todas", ...Array.from(new Set(galleryImages.map((img) => img.category)))]

  const filteredImages =
    selectedCategory === "Todas" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  return (
    <section className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Galería</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre la belleza de Colombia a través de nuestras experiencias. Cada imagen cuenta una historia de
            aventura, cultura y momentos inolvidables.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-amber-700 hover:bg-amber-800 text-white"
                    : "border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={
                  image.src ||
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                }
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                  <p className="font-semibold mb-1">{image.category}</p>
                  <p className="text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-7xl max-h-full">
              <Image
                src={
                  filteredImages[selectedImage].src ||
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                }
                alt={filteredImages[selectedImage].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                sizes="100vw"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <p className="text-lg font-semibold mb-1">{filteredImages[selectedImage].category}</p>
                <p className="text-sm opacity-90">{filteredImages[selectedImage].alt}</p>
              </div>

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
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                onClick={nextImage}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
