"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Clock, Users, Shield } from "lucide-react"

export default function Traslado1ClientPage() {
  const handleWhatsAppReserva = () => {
    window.open("https://wa.me/573184598635?text=Hola, me interesa el traslado al Aeropuerto El Dorado", "_blank")
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Traslado Aeropuerto El Dorado
              </h1>
              <p className="text-xl text-gray-600">
                Servicio confiable y puntual desde y hacia el Aeropuerto Internacional El Dorado
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-gray-900 flex items-center">
                    <Plane className="h-6 w-6 mr-3 text-amber-700" />
                    Detalles del Servicio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-amber-700 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Disponibilidad 24/7</h3>
                        <p className="text-gray-600 text-sm">Servicio disponible las 24 horas, todos los días</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-amber-700 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Capacidad Flexible</h3>
                        <p className="text-gray-600 text-sm">Vehículos para 1 a 8 pasajeros</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-amber-700 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Monitoreo de Vuelos</h3>
                        <p className="text-gray-600 text-sm">Seguimiento en tiempo real de tu vuelo</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Incluye:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Recogida en tu hotel o domicilio</li>
                      <li>• Conductor profesional</li>
                      <li>• Vehículo asegurado</li>
                      <li>• Asistencia con equipaje</li>
                      <li>• Tarifa fija sin sorpresas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-gray-900">Tarifas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Vehículo estándar (1-4 pax)</span>
                      <span className="font-bold text-amber-700">$45.000 COP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Vehículo grande (5-8 pax)</span>
                      <span className="font-bold text-amber-700">$65.000 COP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Servicio VIP</span>
                      <span className="font-bold text-amber-700">$85.000 COP</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleWhatsAppReserva}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      Reservar por WhatsApp
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    <p>Tarifas válidas para trayectos dentro de Bogotá</p>
                    <p>Consulta tarifas especiales para otros destinos</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
