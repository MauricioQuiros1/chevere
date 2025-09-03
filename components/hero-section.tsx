"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ValidatedImage } from "./image-validator"
import { sanityClient } from "@/lib/sanity"
import { heroQuery, translationsByLocale, generalQuery } from "@/lib/queries"
import { useLocale } from "@/components/locale-provider"


export function HeroSection() {
  const { locale } = useLocale()
  const [currentImage, setCurrentImage] = useState(0)
  type HeroImage = { src?: string | null; fallback?: string | null; alt?: string | null }
  type HeroData = {
    title?: string | null
    desktopImages?: HeroImage[]
    mobileImages?: HeroImage[]
  }

  type TranslationsHero = { title?: string | null }
  type TranslationsDoc = {
    locale?: string
    hero?: TranslationsHero
  }

  const [hero, setHero] = useState<HeroData | null>(null)
  const [t, setT] = useState<TranslationsDoc | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [general, setGeneral] = useState<{ logoUrl?: string | null } | null>(null)
  
  // Compute effective images (prefer mobile/desktop set by viewport; fallback to the other if empty)
  const desk = hero?.desktopImages || []
  const mob = hero?.mobileImages || []
  const chosen = (isMobile ? mob : desk)
  const effectiveImages = chosen.length > 0 ? chosen : (isMobile ? desk : mob)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const [heroData, transData, generalData] = await Promise.all([
        sanityClient.fetch(heroQuery),
        sanityClient.fetch(translationsByLocale, { locale }),
        sanityClient.fetch(generalQuery),
      ])
      if (!cancelled) setHero(heroData || null)
      if (!cancelled) setGeneral(generalData || null)
      if (!cancelled) {
        if (transData) setT(transData)
        else if (locale !== 'es') {
          const esData = await sanityClient.fetch(translationsByLocale, { locale: 'es' })
          if (!cancelled) setT(esData || null)
        } else setT(null)
      }
    }
    load()
    return () => { cancelled = true }
  }, [locale])

  // Detect viewport to choose image set (mobile vs desktop)
  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Slider interval: only run when there are at least 2 images
  useEffect(() => {
    const effective = effectiveImages
    if (effective.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % (effective.length))
    }, 5000)
    return () => clearInterval(timer)
  }, [hero?.desktopImages, hero?.mobileImages, isMobile, effectiveImages.length])

  // Clamp/reset currentImage when effectiveImages length changes
  useEffect(() => {
    if (currentImage >= effectiveImages.length) {
      setCurrentImage(0)
    }
  }, [effectiveImages.length])

  const nextImage = () => {
    const effective = effectiveImages
    if (effective.length === 0) return
    setCurrentImage((prev) => (prev + 1) % effective.length)
  }

  const prevImage = () => {
    const effective = effectiveImages
    if (effective.length === 0) return
    setCurrentImage((prev) => (prev - 1 + effective.length) % effective.length)
  }

  const handleScrollToTours = () => {}

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 pointer-events-none">
        {effectiveImages.map((image: HeroImage, index: number) => (
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
      {effectiveImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-2 rounded-full transition-all duration-300 transform hover:-translate-x-1"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-2 rounded-full transition-all duration-300 transform hover:translate-x-1"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Content */}
  <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto mt-40 md:mt-56">
        <h1
          className="text-3xl md:text-5xl font-serif font-bold mb-8 animate-fade-in-up text-shadow-lg hover:text-shadow-xl transition-all duration-300"
          style={{ animationDelay: "0.2s" }}
        >
          {hero?.title || "Chevere Bogota Travel"}
        </h1>

        <div className="mb-8 animate-fade-in-up hover:animate-bounce" style={{ animationDelay: "0.3s" }}>
          <Image
            src={general?.logoUrl || "/logo.png"}
            alt="Chevere Bogotá Travel"
            width={96}
            height={96}
            className="mx-auto mb-2 transition-transform duration-300 hover:scale-110 opacity-95"
          />
        </div>
        {/* Botones removidos por solicitud */}
      </div>

      {/* Slide Indicators */}
      {effectiveImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {effectiveImages.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${index === currentImage ? "bg-white shadow-lg shadow-white/50 scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
