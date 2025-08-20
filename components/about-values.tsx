import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock, Shield, Star, Users, MapPin } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Pasión por Colombia",
    description:
      "Amamos nuestro país y nos emociona compartir su belleza, cultura e historia con cada uno de nuestros huéspedes.",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    description:
      "Respetamos tu tiempo. Nuestro compromiso es llegar siempre a tiempo y cumplir con los horarios establecidos.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description:
      "Tu seguridad es nuestra prioridad. Conductores certificados, vehículos asegurados y protocolos de seguridad rigurosos.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Star,
    title: "Experiencia",
    description:
      "Más de 15 años en el sector turístico nos respaldan. Conocemos cada rincón y tenemos la experiencia para hacer tu viaje perfecto.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Users,
    title: "Servicio Personalizado",
    description:
      "Cada cliente es único. Adaptamos nuestros servicios a tus necesidades específicas para crear experiencias memorables.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: MapPin,
    title: "Conocimiento Local",
    description:
      "Somos expertos locales. Conocemos los mejores lugares, rutas alternativas y secretos que solo los nativos saben.",
    color: "bg-teal-100 text-teal-700",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Nuestros Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que nos guían en cada servicio y que nos han convertido en la opción preferida para
              descubrir Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-full ${value.color} mb-6`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">¿Listo para Vivir Colombia?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a los cientos de viajeros que han descubierto la magia de Colombia con nosotros. Tu próxima aventura
              te está esperando.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
