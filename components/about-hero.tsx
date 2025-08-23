'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

export function AboutHero() {
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

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">{data?.heroTitle || "Conoce Nuestro Equipo"}</h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {data?.heroSubtitle || "Somos un equipo apasionado por mostrar la belleza y riqueza cultural de Colombia"}
            </p>
          </div>

          {/* Founder Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {data?.founder?.name || "Mauricio Quiros"}
                  <span className="block text-lg text-amber-700 font-normal mt-1">{data?.founder?.role || "Fundador y Director"}</span>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {data?.founder?.description || "Con más de 15 años de experiencia en turismo colombiano, Mauricio fundó Chevere Bogotá Travel para ofrecer experiencias auténticas que conecten a las personas con la esencia de Colombia."}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(data?.founder?.badges || ["15+ años experiencia", "Guía certificado", "Experto local"]).map((b: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={data?.founder?.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"}
                alt="Mauricio Quiros - Fundador de Chevere Bogotá Travel"
                width={400}
                height={500}
                className="rounded-2xl shadow-xl mx-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Team Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(data?.stats || [
              { icon: "award", value: "15+", label: "Años de Experiencia" },
              { icon: "users", value: "500+", label: "Clientes Satisfechos" },
              { icon: "mapPin", value: "20+", label: "Destinos Cubiertos" },
              { icon: "clock", value: "24/7", label: "Atención al Cliente" },
            ]).map((s: any, i: number) => (
              <Card key={i} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-4">
                    {s.icon === "award" && <Award className="h-6 w-6" />}
                    {s.icon === "users" && <Users className="h-6 w-6" />}
                    {s.icon === "mapPin" && <MapPin className="h-6 w-6" />}
                    {s.icon === "clock" && <Clock className="h-6 w-6" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{s.value}</h3>
                  <p className="text-gray-600 text-sm">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
