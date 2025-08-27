"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ValidatedImage } from "@/components/image-validator"
import { Plane, Clock, Users, Star, MessageCircle } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { generalQuery, transfersSectionQuery } from "@/lib/queries"

const FALLBACK = {
  title: "Servicios de Traslados",
  subtitle:
    "Conectamos Bogotá con comodidad y seguridad. Desde el aeropuerto hasta servicios por horas para tus necesidades.",
  airportTransfer: {
    title: "Transporte Privado Aeropuerto El Dorado",
    description: "Traslado puerta a puerta desde y hacia el Aeropuerto Internacional El Dorado",
    price: "Desde $45.000 COP",
    duration: "45-60 min",
    capacity: "1-4 personas",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&crop=center",
    features: [
      "Servicio 24/7",
      "Monitoreo de vuelos",
      "Conductor profesional",
      "Vehículo cómodo",
    ],
  },
  hourlyTransfer: {
    title: "Servicio Privado por Horas",
    description: "Conductor a disposición para múltiples destinos dentro de la ciudad",
    price: "Desde $35.000 COP/hora",
    minHours: "Mínimo 3 horas",
    capacity: "1-4 personas",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop&crop=center",
    features: [
      "Rutas personalizadas",
      "Esperas incluidas",
      "Múltiples paradas",
      "Conductor dedicado",
    ],
  },
}

export function TrasladosSection() {
  const [activeTab, setActiveTab] = useState<"airport" | "hourly">("airport")
  const [data, setData] = useState<any>(FALLBACK)
  const [general, setGeneral] = useState<any>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const [cms, gen] = await Promise.all([
        sanityClient.fetch(transfersSectionQuery),
        sanityClient.fetch(generalQuery),
      ])
      if (!cancelled) setData(cms || FALLBACK)
      if (!cancelled) setGeneral(gen || null)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleWhatsAppContact = (service: string) => {
    const raw = general?.whatsappNumbers?.[0] || "573184598635"
    const message = `Hola, me interesa información sobre ${service}`
    window.open(`https://wa.me/${raw}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section id="traslados" className="py-16 pb-10 bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif md:text-5xl">{data.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md flex">
            <button
              onClick={() => setActiveTab("airport")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-250 ${
                activeTab === "airport" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <Plane className="inline-block w-4 h-4 mr-2" />
              {data.airportTabTitle || "Servicios Aeropuerto"}
            </button>
            <button
              onClick={() => setActiveTab("hourly")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-250 ${
                activeTab === "hourly" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <Clock className="inline-block w-4 h-4 mr-2" />
              {data.hourlyTabTitle || "Servicios por Horas"}
            </button>
          </div>
        </div>

  {/* Services Grid: 1 card por tipo, centrada */}
  <div className="grid grid-cols-1 gap-8 mb-12 place-items-center">
          {(() => {
            const service = activeTab === "airport" ? data.airportTransfer : data.hourlyTransfer
            if (!service) return null
            return (
              <Card className="w-full max-w-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-68 md:h-80 lg:h-[32rem] overflow-hidden bg-white">
                  <ValidatedImage
                    src={service.image}
                    alt={service.title}
                    fill
          className="object-contain group-hover:scale-105 transition-transform duration-300 !h-auto"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {service.price}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center md:text-left">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-center md:text-left text-base md:text-[1.05rem] leading-relaxed">
                    {service.description}
                  </p>

                  

                  <div className="space-y-2 mb-6">
                    {service.features?.map((feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-start text-base text-gray-700"
                      >
                        <Star className="w-4 h-4 mr-2 text-amber-500 fill-current flex-shrink-0" />
                        <span className="leading-6">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleWhatsAppContact(service.title)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-250"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reservar por WhatsApp
                  </Button>
                </CardContent>
              </Card>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
