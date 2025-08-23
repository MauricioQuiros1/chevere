'use client'
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock, Shield, Star, Users, MapPin } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

const fallbackValues = [
  {
    icon: "heart",
    title: "Pasión por Colombia",
    description:
      "Amamos nuestro país y nos emociona compartir su belleza, cultura e historia con cada uno de nuestros huéspedes.",
    colorClass: "bg-red-100 text-red-700",
  },
  {
    icon: "clock",
    title: "Puntualidad",
    description:
      "Respetamos tu tiempo. Nuestro compromiso es llegar siempre a tiempo y cumplir con los horarios establecidos.",
    colorClass: "bg-blue-100 text-blue-700",
  },
  {
    icon: "shield",
    title: "Seguridad",
    description:
      "Tu seguridad es nuestra prioridad. Conductores certificados, vehículos asegurados y protocolos de seguridad rigurosos.",
    colorClass: "bg-green-100 text-green-700",
  },
  {
    icon: "star",
    title: "Experiencia",
    description:
      "Más de 15 años en el sector turístico nos respaldan. Conocemos cada rincón y tenemos la experiencia para hacer tu viaje perfecto.",
    colorClass: "bg-amber-100 text-amber-700",
  },
  {
    icon: "users",
    title: "Servicio Personalizado",
    description:
      "Cada cliente es único. Adaptamos nuestros servicios a tus necesidades específicas para crear experiencias memorables.",
    colorClass: "bg-purple-100 text-purple-700",
  },
  {
    icon: "mapPin",
    title: "Conocimiento Local",
    description:
      "Somos expertos locales. Conocemos los mejores lugares, rutas alternativas y secretos que solo los nativos saben.",
    colorClass: "bg-teal-100 text-teal-700",
  },
]

export function AboutValues() {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    let cancelled = false
    sanityClient.fetch(aboutPageQuery).then((d) => {
      if (!cancelled) setData(d || null)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => data?.values || fallbackValues, [data])
  const title = data?.valuesTitle || "Nuestros Valores"
  const subtitle =
    data?.valuesSubtitle ||
    "Los principios que nos guían en cada servicio y que nos han convertido en la opción preferida para descubrir Colombia."

  const iconFor = (key: string) => {
    switch (key) {
      case "heart":
        return Heart
      case "clock":
        return Clock
      case "shield":
        return Shield
      case "star":
        return Star
      case "users":
        return Users
      case "mapPin":
        return MapPin
      default:
        return Star
    }
  }
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((value: any, index: number) => {
              const Icon = iconFor(value.icon)
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-full ${value.colorClass || "bg-amber-100 text-amber-700"} mb-6`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
