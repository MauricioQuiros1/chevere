"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star } from "lucide-react"

export function TourHero() {
  const handleWhatsAppReserva = () => {
    window.open("https://wa.me/573054798365?text=Hola, me interesa el Tour Hacienda Cafetera Coloma", "_blank")
  }

  return (
    <section className="relative pt-20">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d5282d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Hacienda Cafetera Coloma - Paisaje cafetero colombiano"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                Tour Hacienda Cafetera Coloma
              </h1>
              <p className="text-xl text-white/90 mb-6">Vive la auténtica cultura cafetera colombiana en Fusagasugá</p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>8 horas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Máximo 4 personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Fusagasugá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span>Tour Privado</span>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppReserva}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                Reservar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
            Una Experiencia Auténtica del Café Colombiano
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-6">
              Vive la auténtica cultura cafetera Colombiana en un viaje de un día a la Hacienda Coloma, una joya ubicada
              en Fusagasugá a solo dos horas de Bogotá.
            </p>
            <p className="mb-6">
              Ofrecemos un tour privado para que disfrutes naturaleza, paisajes, cafetales y conozcas de primera mano el
              proceso de uno de nuestros productos estrella, galardonado como uno de los mejores cafés del mundo.
            </p>
            <p className="mb-8">
              Sumérgete en la tradición cafetera mientras aprendes sobre el cultivo, procesamiento y tostado del café en
              un entorno natural incomparable, rodeado de montañas y el clima perfecto de Fusagasugá.
            </p>
          </div>
        </div>
      </div>

      
    </section>
  )
}
