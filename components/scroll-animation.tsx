"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animationType?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "bounce"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animationType = "fadeUp",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold, rootMargin: "50px" },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    switch (animationType) {
      case "fadeUp":
        return "animate-fade-in-up"
      case "fadeLeft":
        return "animate-slide-in-left"
      case "fadeRight":
        return "animate-slide-in-right"
      case "scale":
        return "animate-fade-in-scale"
      case "bounce":
        return "animate-bounce-in"
      default:
        return "animate-fade-in-up"
    }
  }

  return (
    <div ref={elementRef} className={`transition-all duration-700 ${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}
