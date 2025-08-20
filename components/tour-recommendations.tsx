const recommendations = [
  {
    title: "Ropa y Calzado Cómodo",
    description: "Usa ropa cómoda y zapatos apropiados para caminar por los cafetales",
  },
  {
    title: "Protección Solar",
    description: "Lleva bloqueador solar, gorra y gafas de sol para protegerte",
  },
  {
    title: "Clima Templado",
    description: "Temperatura aproximada de 23°C, clima fresco y agradable",
  },
  {
    title: "Duración del Tour",
    description: "Aproximadamente 8 horas de experiencia completa",
  },
]

export function TourRecommendations() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Recomendaciones para tu Visita
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prepárate para disfrutar al máximo de esta experiencia única
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {recommendations.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
