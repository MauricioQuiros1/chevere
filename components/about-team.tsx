'use client'
"use client"
import { ValidatedImage } from "@/components/image-validator"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Shield, Heart, Star, Users, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

export function AboutTeam() {
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

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case "car":
        return <Car className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      case "heart":
        return <Heart className="h-6 w-6" />
      case "star":
        return <Star className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "mapPin":
        return <MapPin className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">{data?.teamTitle || "Nuestro Compromiso"}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data?.teamSubtitle || "Cada miembro de nuestro equipo comparte la pasión por brindar experiencias excepcionales"}
            </p>
          </div>

          {/* Team Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {(data?.teamCards || [
              { icon: "car", title: "Conductor Profesional", description: "Nuestro conductor es un experto local con licencia vigente y amplio conocimiento de las rutas turísticas más seguras y pintorescas de Colombia." },
              { icon: "shield", title: "Seguridad Garantizada", description: "Nuestro vehículo cuenta con seguro completo, mantenimiento regular y sistemas de seguridad actualizados para tu tranquilidad." },
              { icon: "heart", title: "Servicio Personalizado", description: "Adaptamos cada tour a tus intereses y necesidades, creando experiencias únicas que superan tus expectativas en cada viaje." },
              { icon: "star", title: "Experiencia Auténtica", description: "Te conectamos con la verdadera esencia de Colombia a través de lugares, sabores y tradiciones que solo los locales conocen." },
            ]).map((c: any, i: number) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                      {renderIcon(c.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{data?.founderHighlight?.title || "Fundador y Director"}</h3>
              <p className="text-gray-600">{data?.founderHighlight?.subtitle || "Conoce a la persona que hace posible tus mejores experiencias"}</p>
            </div>

            <div className="flex justify-center">
              <div className="text-center max-w-md">
                <ValidatedImage
                  src={data?.founderHighlight?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"}
                  fallbackSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Mauricio Quiros - Fundador de Chevere Bogotá Travel"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto mb-6 shadow-lg"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{data?.founderHighlight?.name || "Mauricio Quiros"}</h4>
                <p className="text-amber-600 font-medium mb-4">{data?.founderHighlight?.role || "Fundador y Director"}</p>
                <p className="text-gray-600 leading-relaxed">{data?.founderHighlight?.description || "Con más de 10 años de experiencia en turismo, Mauricio fundó Chevere Bogotá Travel con la misión de mostrar la verdadera esencia de Colombia. Su pasión por la hospitalidad y conocimiento profundo del país garantizan experiencias auténticas e inolvidables."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
