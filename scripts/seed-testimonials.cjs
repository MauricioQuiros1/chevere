const { createClient } = require("@sanity/client")

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "nol0j9y7"
const DATASET = process.env.SANITY_DATASET || "production"
const TOKEN = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error("Falta SANITY_TOKEN en el entorno (permiso write)")
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-08-20",
  token: TOKEN,
  useCdn: false,
})

async function main() {
  const doc = {
    _type: "testimonialsSection",
    title: "Experiencias Reales Que Inspiran Confianza",
    testimonials: [
      {
        _type: "object",
        name: "María González",
        location: "Bogotá, Colombia",
        rating: 5,
        text:
          "Excelente servicio en el tour a la Hacienda Cafetera. Mauricio fue muy profesional y conocedor. La experiencia superó nuestras expectativas completamente.",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-09-27-at-11.12.20-AM-600x600.jpeg",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0147-600x600.jpg",
      },
      {
        _type: "object",
        name: "Carlos Rodríguez",
        location: "Medellín, Colombia",
        rating: 5,
        text:
          "Puntualidad impecable y vehículos en excelente estado. El tour a Villa de Leyva fue increíble. Definitivamente recomiendo Chevere Bogotá Travel.",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0151-600x600.jpg",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0102-600x600.jpg",
      },
      {
        _type: "object",
        name: "Ana Martínez",
        location: "Cali, Colombia",
        rating: 5,
        text:
          "Servicio personalizado de primera calidad. Nos sentimos muy seguros durante todo el recorrido. La atención al detalle es excepcional.",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-02-at-12.55.30-PM-600x600.jpeg",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0098-600x600.jpg",
      },
      {
        _type: "object",
        name: "Roberto Silva",
        location: "Barranquilla, Colombia",
        rating: 5,
        text:
          "La mejor experiencia turística que hemos tenido en Colombia. Guías expertos, transporte cómodo y destinos fascinantes. ¡Volveremos pronto!",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0047-600x600.jpg",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0041-600x600.jpg",
      },
      {
        _type: "object",
        name: "Laura Jiménez",
        location: "Bucaramanga, Colombia",
        rating: 5,
        text:
          "Traslado al aeropuerto perfecto, llegamos con tiempo de sobra. El conductor fue muy amable y el vehículo impecable. Servicio confiable 100%.",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/11/CONDUCTOR-2-600x600.png",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231026-WA0040-600x600.jpg",
      },
      {
        _type: "object",
        name: "Diego Herrera",
        location: "Pereira, Colombia",
        rating: 5,
        text:
          "Tour a Zipaquirá espectacular. La organización, puntualidad y conocimiento del guía hicieron de este día una experiencia inolvidable para toda la familia.",
        imageUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20231204-WA0092-600x600.jpg",
        fallbackUrl:
          "https://corsproxy.io/?https://nomadascolombiatravel.com/wp-content/uploads/2022/10/IMG-20220428-WA0013-600x600.jpg",
      },
    ],
  }

  const existing = await client.fetch("*[_type == 'testimonialsSection'][0]._id")
  if (existing) {
    await client.patch(existing).set(doc).commit()
    console.log("Updated testimonialsSection", existing)
  } else {
    const created = await client.create(doc)
    console.log("Created testimonialsSection", created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
