"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ValidatedImage } from "@/components/image-validator"
import { Plane, Clock, Users, MapPin, Shield, Star, Phone, MessageCircle } from "lucide-react"

const airportServices = [
  {
    title: "Aeropuerto El Dorado ↔ Bogotá",
    description: "Traslado directo desde/hacia el aeropuerto internacional",
    price: "Desde $45.000 COP",
    duration: "45-60 min",
    capacity: "1-4 personas",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=center",
    features: ["Servicio 24/7", "Seguimiento de vuelo", "Conductor bilingüe", "Vehículo premium"],
  },
  {
    title: "Aeropuerto ↔ Hoteles Zona Rosa",
    description: "Conexión directa a la zona hotelera y comercial",
    price: "Desde $50.000 COP",
    duration: "50-70 min",
    capacity: "1-4 personas",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&crop=center",
    features: ["Recogida en terminal", "WiFi gratuito", "Agua cortesía", "Asistencia equipaje"],
  },
]

const hourlyServices = [
  {
    title: "Servicio por Horas - Ciudad",
    description: "Disponibilidad completa para múltiples destinos",
    price: "Desde $35.000 COP/hora",
    minHours: "Mínimo 3 horas",
    capacity: "1-4 personas",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&crop=center",
    features: ["Conductor dedicado", "Rutas personalizadas", "Esperas incluidas", "Múltiples paradas"],
  },
  {
    title: "Servicio Ejecutivo por Horas",
    description: "Para reuniones de negocios y eventos corporativos",
    price: "Desde $45.000 COP/hora",
    minHours: "Mínimo 4 horas",
    capacity: "1-4 personas",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
    features: ["Vehículo ejecutivo", "Conductor formal", "Puntualidad garantizada", "Facturación empresarial"],
  },
]

export function TrasladosSection() {
  const [activeTab, setActiveTab] = useState<"airport" | "hourly">("airport")

  const handleWhatsAppContact = (service: string) => {
    const message = `Hola, me interesa información sobre ${service}`
    window.open(`https://wa.me/573184598635?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section id="traslados" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif md:text-5xl">Servicios de Traslados</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conectamos Bogotá con comodidad y seguridad. Desde el aeropuerto hasta servicios por horas para tus
            necesidades.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("airport")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-250 ${
                activeTab === "airport" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <Plane className="inline-block w-4 h-4 mr-2" />
              Servicios Aeropuerto
            </button>
            <button
              onClick={() => setActiveTab("hourly")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-250 ${
                activeTab === "hourly" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <Clock className="inline-block w-4 h-4 mr-2" />
              Servicios por Horas
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {(activeTab === "airport" ? airportServices : hourlyServices).map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <ValidatedImage
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.price}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {"duration" in service ? service.duration : (service as any).minHours}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {service.capacity}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <Star className="w-3 h-3 mr-2 text-amber-500 fill-current" />
                      {feature}
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
          ))}
        </div>

      </div>
    </section>
  )
}
