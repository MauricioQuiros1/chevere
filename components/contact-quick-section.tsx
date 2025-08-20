"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, MapPin } from "lucide-react"

export function ContactQuickSection() {
  const handleWhatsAppGeneral = () => {
    window.open("https://wa.me/573184598635?text=Hola, me interesa información sobre sus servicios", "_blank")
  }

  const handleWhatsAppColoma = () => {
    window.open("https://wa.me/573054798365?text=Hola, me interesa el Tour Hacienda Cafetera Coloma", "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Contacto Rápido</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Estamos listos para atenderte las 24 horas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-green-100 text-green-700 mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">WhatsApp General</h3>
              <Button onClick={handleWhatsAppGeneral} className="bg-green-600 hover:bg-green-700 text-white w-full">
                +57 318 459 8635
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Tour Coloma</h3>
              <Button onClick={handleWhatsAppColoma} className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                +57 305 479 8365
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-700 mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Email</h3>
              <p className="text-sm text-gray-600">info@cheverebogota.com</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-700 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Cobertura</h3>
              <p className="text-sm text-gray-600">Bogotá y Colombia</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
