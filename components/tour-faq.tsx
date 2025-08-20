"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "¿Cuál es el punto de encuentro para el tour?",
    answer:
      "Recogemos a los huéspedes directamente en su hotel o lugar de alojamiento en Bogotá. Coordinamos el punto exacto al momento de la reserva para mayor comodidad.",
  },
  {
    question: "¿En qué idioma se realiza el tour?",
    answer:
      "Nuestros guías especializados realizan el tour en español. También podemos ofrecer el servicio en inglés con previo aviso y disponibilidad.",
  },
  {
    question: "¿Cuáles son los horarios del tour?",
    answer:
      "El tour inicia temprano en la mañana (aproximadamente 7:00 AM) para aprovechar al máximo el día. El regreso a Bogotá es alrededor de las 6:00 PM, dependiendo del tráfico.",
  },
  {
    question: "¿Qué sucede si llueve el día del tour?",
    answer:
      "El tour se realiza con lluvia o sol, ya que la hacienda cuenta con espacios cubiertos. Te recomendamos llevar ropa impermeable por precaución.",
  },
  {
    question: "¿Está incluido el almuerzo en el precio?",
    answer:
      "El almuerzo colombiano tradicional no está incluido en el precio del tour, pero se puede adquirir en la hacienda. El costo aproximado es de $25.000 COP por persona.",
  },
  {
    question: "¿Puedo comprar café para llevar?",
    answer:
      "¡Por supuesto! La hacienda ofrece café de excelente calidad para la venta. Podrás llevarte a casa el mejor café colombiano directamente del productor.",
  },
]

export function TourFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre el Tour Hacienda Cafetera Coloma
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left hover:bg-amber-50 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
