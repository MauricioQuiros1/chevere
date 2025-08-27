"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, Star } from "lucide-react"

const pricingTiers = [
  {
    people: "1 persona",
    price: "US $140",
    pricePerPerson: "por persona",
    popular: false,
  },
  {
    people: "2 personas",
    price: "US $92",
    pricePerPerson: "por persona",
    popular: false,
  },
  {
    people: "3 personas",
    price: "US $78",
    pricePerPerson: "por persona",
    popular: false,
  },
  {
    people: "4 personas",
    price: "US $72",
    pricePerPerson: "por persona",
    popular: true,
  },
]

export function TourPricing() {
  const handleWhatsAppReserva = (people: string, price: string) => {
    const message = `Hola, me interesa reservar el Tour Hacienda Cafetera Coloma para ${people} - ${price} por persona`
    window.open(`https://wa.me/573054798365?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Precios del Tour</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-4 text-base md:text-lg text-gray-600">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Recibimos tarjetas de crédito y débito</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Tours personalizados máx. 4 personas</span>
            </div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto md:ml-2 md:mt-0 mt-2">
              Pregunta por nuestros descuentos para clientes empresariales y colombianos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 py-6 ${
                tier.popular ? "ring-2 ring-amber-400 scale-105" : ""
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white">
                  Mejor Precio
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-3 mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{tier.people}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-amber-700 mb-1">{tier.price}</div>
                  <div className="text-sm text-gray-600">{tier.pricePerPerson}</div>
                </div>
                <Button
                  onClick={() => handleWhatsAppReserva(tier.people, tier.price)}
                  className={`w-full ${
                    tier.popular ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  Reservar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}
