"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Plane, Car, Users, Shield } from "lucide-react"

const services = [
  {
    icon: MapPin,
    title: "Tours Bogotá y Alrededores",
    description: "Descubre los mejores destinos con tours personalizados y guías expertos.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Clock,
    title: "Servicios por Horas",
    description: "Transporte flexible por las horas que necesites, adaptado a tu agenda.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Plane,
    title: "Traslados Aeropuerto",
    description: "Servicio confiable y puntual desde y hacia El Dorado las 24 horas.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Car,
    title: "Vehículos Premium",
    description: "Flota moderna, cómoda y en perfecto estado para tu seguridad y comodidad.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Users,
    title: "Servicio Personalizado",
    description: "Atención adaptada a tus necesidades específicas de transporte y turismo.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Shield,
    title: "Puntualidad y Seguridad",
    description: "Garantizamos puntualidad, seguridad y experiencia en cada servicio.",
    color: "bg-teal-100 text-teal-700",
  },
]

export function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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
        { threshold: 0.1 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    
  )
}
