import { ValidatedImage } from "@/components/image-validator"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Shield, Heart, Star } from "lucide-react"

export function AboutTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Nuestro Compromiso</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada miembro de nuestro equipo comparte la pasión por brindar experiencias excepcionales
            </p>
          </div>

          {/* Team Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    <Car className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Conductor Profesional</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nuestro conductor es un experto local con licencia vigente y amplio conocimiento de las rutas
                      turísticas más seguras y pintorescas de Colombia.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Garantizada</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nuestro vehículo cuenta con seguro completo, mantenimiento regular y sistemas de seguridad
                      actualizados para tu tranquilidad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Servicio Personalizado</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Adaptamos cada tour a tus intereses y necesidades, creando experiencias únicas que superan tus
                      expectativas en cada viaje.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-700 flex-shrink-0">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Experiencia Auténtica</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Te conectamos con la verdadera esencia de Colombia a través de lugares, sabores y tradiciones que
                      solo los locales conocen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Fundador y Director</h3>
              <p className="text-gray-600">Conoce a la persona que hace posible tus mejores experiencias</p>
            </div>

            <div className="flex justify-center">
              <div className="text-center max-w-md">
                <ValidatedImage
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
                  fallbackSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Mauricio Quiros - Fundador de Chevere Bogotá Tours"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto mb-6 shadow-lg"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mauricio Quiros</h4>
                <p className="text-amber-600 font-medium mb-4">Fundador y Director</p>
                <p className="text-gray-600 leading-relaxed">
                  Con más de 10 años de experiencia en turismo, Mauricio fundó Chevere Bogotá Tours con la misión de
                  mostrar la verdadera esencia de Colombia. Su pasión por la hospitalidad y conocimiento profundo del
                  país garantizan experiencias auténticas e inolvidables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
