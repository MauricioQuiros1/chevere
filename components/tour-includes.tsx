const includes = [
  {
    title: "Transporte Privado",
    description: "Ida y regreso desde su lugar de alojamiento u hotel",
    included: true,
  },
  {
    title: "Entrada Hacienda Cafetera",
    description: "Acceso completo a la Hacienda Coloma",
    included: true,
  },
  {
    title: "Guía Especializada",
    description: "Asesoría experta sobre el proceso del café",
    included: true,
  },
  {
    title: "Degustación de Licor",
    description: "Prueba el exquisito licor de café artesanal",
    included: true,
  },
  {
    title: "Almuerzo",
    description: "Almuerzo no incluido - disponible en la hacienda",
    included: false,
  },
  {
    title: "Cortesía Especial",
    description: "Degustación de fresas frescas de la región",
    included: true,
  },
]

export function TourIncludes() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">¿Qué Incluye el Tour?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo necesario para una experiencia completa e inolvidable en la cultura cafetera
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.included ? "bg-green-500" : "bg-red-500"}`}
                />
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${item.included ? "text-gray-900" : "text-red-700"}`}>
                    {item.title}
                    {!item.included && <span className="text-sm ml-2">(No incluido)</span>}
                  </h3>
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
