"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ValidatedImageProps {
  src: string
  fallbackSrc?: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  onError?: () => void
}

const fallbackImages = {
  coffee: "https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  zipaquira: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  villaleyva: "https://upload.wikimedia.org/wikipedia/commons/9/98/Villa_de_leyva.jpg",
  monserrate:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg/800px-2017_Bogot%C3%A1_Bas%C3%ADlica_del_Se%C3%B1or_Ca%C3%ADdo_de_Monserrate.jpg",
  bogota:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg/800px-Bogota%2C_viewed_from_Monserrate_%285620507403%29.jpg",
  guatavita:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  museum: "https://images.unsplash.com/photo-1555400082-8c5b3b8b4b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  transport:
    "https://images.unsplash.com/photo-1449824913935-76f44d7c3621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  landscape:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  culture:
    "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
}

export function ValidatedImage({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  fill,
  priority,
  loading = "lazy",
  sizes,
  onError,
}: ValidatedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isValid, setIsValid] = useState(true)
  const [hasError, setHasError] = useState(false)

  const validateImage = (imageSrc: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        // Check minimum dimensions (relaxed to 300x200px)
        if (img.naturalWidth < 300 || img.naturalHeight < 200) {
          console.warn(
            `image-replaced: ${imageSrc} - dimensions too small (${img.naturalWidth}x${img.naturalHeight})`,
          )
          resolve(false)
          return
        }
        resolve(true)
      }

      img.onerror = () => {
        console.warn(`image-replaced: ${imageSrc} - failed to load`)
        resolve(false)
      }

      img.src = imageSrc
    })
  }

  useEffect(() => {
    const checkImage = async () => {
      const isImageValid = await validateImage(src)

      if (!isImageValid) {
        setIsValid(false)
        setHasError(true)

        // Try fallback image if provided
        if (fallbackSrc) {
          const isFallbackValid = await validateImage(fallbackSrc)
          if (isFallbackValid) {
            setCurrentSrc(fallbackSrc)
            setIsValid(true)
      return
          }
        }

    // As last resort, use local placeholder
    const placeholder = "/placeholder.jpg"
    setCurrentSrc(placeholder)
    setIsValid(true)
    onError?.()
      }
    }

    checkImage()
  }, [src, fallbackSrc, onError])

  const handleImageError = async () => {
    if (!hasError) {
      setHasError(true)
      console.warn(`image-replaced: ${currentSrc} - runtime error`)

      // Try fallback image
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        const isFallbackValid = await validateImage(fallbackSrc)
        if (isFallbackValid) {
          setCurrentSrc(fallbackSrc)
          return
        }
      }

      // Last resort: local placeholder
      const placeholder = "/placeholder.jpg"
      setCurrentSrc(placeholder)
      setIsValid(true)
      onError?.()
    }
  }

  // Don't render invalid images
  if (!isValid) {
    return null
  }

  return (
    <Image
      src={
        currentSrc ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      loading={loading}
      sizes={sizes}
      onError={handleImageError}
      decoding="async"
    />
  )
}
