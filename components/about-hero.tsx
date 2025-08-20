import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, MapPin, Clock } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Conoce Nuestro Equipo</h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Somos un equipo apasionado por mostrar la belleza y riqueza cultural de Colombia
            </p>
          </div>

          {/* Founder Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Mauricio Quiros
                  <span className="block text-lg text-amber-700 font-normal mt-1">Fundador y Director</span>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Con más de 15 años de experiencia en turismo colombiano, Mauricio fundó Chevere Bogotá Tours para
                  ofrecer experiencias auténticas que conecten a las personas con la esencia de Colombia.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    15+ años experiencia
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Guía certificado
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Experto local
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
                alt="Mauricio Quiros - Fundador de Chevere Bogotá Tours"
                width={400}
                height={500}
                className="rounded-2xl shadow-xl mx-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Team Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">15+</h3>
                <p className="text-gray-600 text-sm">Años de Experiencia</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-full bg-green-100 text-green-700 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">500+</h3>
                <p className="text-gray-600 text-sm">Clientes Satisfechos</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-700 mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">20+</h3>
                <p className="text-gray-600 text-sm">Destinos Cubiertos</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-700 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">24/7</h3>
                <p className="text-gray-600 text-sm">Atención al Cliente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
