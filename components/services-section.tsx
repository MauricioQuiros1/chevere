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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600">Transporte confiable y experiencias personalizadas en Bogotá</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  className={`transition-all duration-700 ${visibleCards[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex p-4 rounded-full ${s.color} mb-6`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                      <p className="text-gray-600">{s.description}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
