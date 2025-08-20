"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Building, Users, Clock, MapPin, Car } from "lucide-react"

const services = [
  {
    icon: Plane,
    title: "Traslado Aeropuerto El Dorado",
    description: "Servicio puerta a puerta desde y hacia el Aeropuerto Internacional El Dorado",
    features: ["Monitoreo de vuelos", "Servicio 24/7", "Tarifas fijas", "Vehículos cómodos"],
    price: "Desde $45.000 COP",
  },
  {
    icon: Building,
    title: "Traslados Empresariales",
    description: "Transporte ejecutivo para eventos corporativos, reuniones y conferencias",
    features: ["Conductores profesionales", "Puntualidad garantizada", "Facturación empresarial", "Servicio premium"],
    price: "Cotización personalizada",
  },
  {
    icon: Users,
    title: "Traslados Grupales",
    description: "Transporte para grupos familiares, turísticos o eventos especiales",
    features: ["Vehículos amplios", "Capacidad hasta 8 personas", "Equipaje incluido", "Rutas flexibles"],
    price: "Desde $80.000 COP",
  },
  {
    icon: Clock,
    title: "Servicio por Horas",
    description: "Contrata nuestro servicio por las horas que necesites con conductor dedicado",
    features: ["Mínimo 3 horas", "Conductor a disposición", "Múltiples destinos", "Tarifa por hora"],
    price: "Desde $35.000 COP/hora",
  },
  {
    icon: MapPin,
    title: "Traslados Intercity",
    description: "Viajes a otras ciudades y destinos turísticos fuera de Bogotá",
    features: ["Destinos nacionales", "Vehículos de largo recorrido", "Paradas incluidas", "Guía opcional"],
    price: "Cotización por destino",
  },
  {
    icon: Car,
    title: "Traslado VIP",
    description: "Servicio premium con vehículos de lujo y atención personalizada",
    features: ["Vehículos de lujo", "Agua y snacks", "WiFi a bordo", "Servicio de conserjería"],
    price: "Desde $120.000 COP",
  },
]

export function TrasladosServices() {
  const handleWhatsAppQuote = (service: string) => {
    const message = `Hola, me interesa cotizar el servicio: ${service}`
    window.open(`https://wa.me/573184598635?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios de traslado adaptados a tus necesidades específicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
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
                  <p className="text-gray-600 text-center">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="text-center pt-4 border-t">
                    <p className="text-lg font-bold text-amber-700 mb-3">{service.price}</p>
                    <Button
                      onClick={() => handleWhatsAppQuote(service.title)}
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
              Contáctanos para cotizaciones especiales, servicios corporativos o traslados a medida según tus
              necesidades específicas.
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
