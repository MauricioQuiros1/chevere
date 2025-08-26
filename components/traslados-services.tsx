"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Clock } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { generalQuery, transfersSectionQuery } from "@/lib/queries"
import { useEffect, useState } from "react"

type TransferAirport = {
  title: string
  description: string
  price: string
  duration: string
  capacity: string
  image?: string
  features?: string[]
}

type TransferHourly = {
  title: string
  description: string
  price: string
  minHours: string
  capacity: string
  image?: string
  features?: string[]
}

type TransfersDoc = {
  title?: string
  subtitle?: string
  airportTransfer?: TransferAirport | null
  hourlyTransfer?: TransferHourly | null
}

const FALLBACK: TransfersDoc = {
  title: "Nuestros Servicios de Traslado",
  subtitle: "Dos opciones claras para tus necesidades: Aeropuerto y Por Horas.",
  airportTransfer: {
    title: "Transporte Privado al Aeropuerto",
    description: "Puerta a puerta desde y hacia El Dorado (BOG).",
    price: "Desde $45.000 COP",
    duration: "45-60 min",
    capacity: "1-4 personas",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&crop=center",
    features: ["Servicio 24/7", "Monitoreo de vuelos", "Tarifa fija", "Conductores profesionales"],
  },
  hourlyTransfer: {
    title: "Traslado Privado por Horas",
    description: "Conductor a disposición dentro del perímetro urbano de Bogotá.",
    price: "Desde $35.000 COP/hora",
    minHours: "Mínimo 3 horas",
    capacity: "1-4 personas",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop&crop=center",
    features: ["Rutas personalizadas", "Esperas incluidas", "Múltiples paradas", "Vehículo cómodo"],
  },
}

export function TrasladosServices() {
  const [data, setData] = useState<TransfersDoc>(FALLBACK)
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

  const handleWhatsAppQuote = (service: string) => {
    const number = general?.whatsappNumbers?.[0] || "573184598635"
    const message = `Hola, me interesa cotizar el servicio: ${service}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const items = [
    {
      icon: Plane,
      title: data.airportTransfer?.title,
      description: data.airportTransfer?.description,
      features: data.airportTransfer?.features || [],
      price: data.airportTransfer?.price,
    },
    {
      icon: Clock,
      title: data.hourlyTransfer?.title,
      description: data.hourlyTransfer?.description,
      features: data.hourlyTransfer?.features || [],
      price: data.hourlyTransfer?.price,
    },
  ].filter((i) => i.title)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {data.title || "Traslados"}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-700 mb-4 mx-auto">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.description && (
                    <p className="text-gray-600 text-center">{service.description}</p>
                  )}

                  {service.features?.length ? (
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="text-center pt-4 border-t">
                    {service.price && (
                      <p className="text-lg font-bold text-amber-700 mb-3">{service.price}</p>
                    )}
                    <Button
                      onClick={() => handleWhatsAppQuote(service.title || "Servicio de Traslado")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Cotizar Servicio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">¿Necesitas un Servicio Personalizado?</h3>
            <p className="text-gray-600 mb-6">
              Contáctanos para cotizaciones especiales, servicios corporativos o traslados a medida según tus necesidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleWhatsAppQuote("Servicio Personalizado")}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                WhatsApp: +57 318 459 8635
              </Button>
              <Button
                onClick={() =>
                  window.open("https://wa.me/573054798365?text=Hola, necesito un servicio personalizado", "_blank")
                }
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                WhatsApp: +57 305 479 8365
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
