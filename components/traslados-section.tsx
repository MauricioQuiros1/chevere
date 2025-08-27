"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

        {/* Tab Navigation (se mantiene) */}
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

  {/* Layout principal con flex en desktop (sin grid) */}
  <div className="flex flex-col md:flex-row gap-8 mb-12 items-start max-w-6xl mx-auto justify-center">
          {/* Columna izquierda: card de servicio */}
          <div className="flex justify-center md:justify-start">
            {(() => {
              const service = activeTab === "airport" ? data.airportTransfer : data.hourlyTransfer
              if (!service) return null
              return (
                <Card className="w-full max-w-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-72 md:h-80 lg:h-[26rem] overflow-hidden bg-white">
                    <ValidatedImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.price}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center ">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-justify  text-base md:text-[1.05rem] leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features?.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center justify-start text-base text-gray-700">
                          <Star className="w-4 h-4 mr-2 text-amber-500 fill-current flex-shrink-0" />
                          <span className="leading-6">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
          </div>

      {/* Columna derecha: precios apilados */}
      <div className="flex justify-center md:justify-start w-full md:w-auto">
            {(data.cards && data.cards.length > 0) && (
        <div className="flex flex-col gap-4 w-full md:max-w-sm">
                {data.cards.slice(0, 2).map((card: any, index: number) => (
                  <Card
                    key={index}
                    className={`gap-0 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 py-6 w-full ${
                      card?.popular ? "ring-2 ring-amber-400 md:scale-[1.02]" : ""
                    }`}
                  >
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl font-semibold text-gray-900">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      {card.price && (
                        <div className="mb-6">
                          <div className="text-3xl font-bold text-amber-700 mb-1">{card.price}</div>
                        </div>
                      )}
                      <Button
                        onClick={() => handleWhatsAppContact(card.title || "Traslado")}
                        className={`w-full ${card?.popular ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"} text-white`}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {card.ctaLabel || "Reservar por WhatsApp"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nota e imagen de equipaje */}
        {(data.cards && data.cards.length > 0) && (
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-gray-800 text-justify leading-relaxed mb-6">
              {data.luggageNote || "Al momento de cotizar por favor especificar # de personas, tamaño y cantidad de equipaje."}
            </p>
            {data.luggageImage && (
              <div className="flex justify-center">
                <div className="group overflow-hidden rounded-md shadow-sm bg-white inline-block">
                  <ValidatedImage
                    src={data.luggageImage}
                    alt="Equipaje — referencia"
                    width={Math.round((data as any).luggageDimensions?.width || 800)}
                    height={Math.round((data as any).luggageDimensions?.height || 500)}
                    className="object-contain transition-transform duration-300 group-hover:scale-105 block"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
