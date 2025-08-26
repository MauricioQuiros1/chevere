require('dotenv').config({ path: require('path').join(process.cwd(), '.env.local') })
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
    _type: "aboutPage",
    heroTitle: "Conoce Nuestro Equipo",
    heroSubtitle: "Somos un equipo apasionado por mostrar la belleza y riqueza cultural de Colombia",
    founder: {
      name: "Mauricio Quiros",
      role: "Fundador y Director",
      description:
        "Con más de 15 años de experiencia en turismo colombiano, Mauricio fundó Chevere Bogotá Travel para ofrecer experiencias auténticas que conecten a las personas con la esencia de Colombia.",
      badges: ["15+ años experiencia", "Guía certificado", "Experto local"],
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
    stats: [
      { icon: "award", value: "15+", label: "Años de Experiencia" },
      { icon: "users", value: "500+", label: "Clientes Satisfechos" },
      { icon: "mapPin", value: "20+", label: "Destinos Cubiertos" },
      { icon: "clock", value: "24/7", label: "Atención al Cliente" },
    ],
    teamTitle: "Nuestro Compromiso",
    teamSubtitle: "Cada miembro de nuestro equipo comparte la pasión por brindar experiencias excepcionales",
    teamCards: [
      {
        icon: "car",
        title: "Conductor Profesional",
        description:
          "Nuestro conductor es un experto local con licencia vigente y amplio conocimiento de las rutas turísticas más seguras y pintorescas de Colombia.",
      },
      {
        icon: "shield",
        title: "Seguridad Garantizada",
        description:
          "Nuestro vehículo cuenta con seguro completo, mantenimiento regular y sistemas de seguridad actualizados para tu tranquilidad.",
      },
      {
        icon: "heart",
        title: "Servicio Personalizado",
        description:
          "Adaptamos cada tour a tus intereses y necesidades, creando experiencias únicas que superan tus expectativas en cada viaje.",
      },
      {
        icon: "star",
        title: "Experiencia Auténtica",
        description:
          "Te conectamos con la verdadera esencia de Colombia a través de lugares, sabores y tradiciones que solo los locales conocen.",
      },
    ],
    founderHighlight: {
      title: "Fundador y Director",
      subtitle: "Conoce a la persona que hace posible tus mejores experiencias",
      name: "Mauricio Quiros",
      role: "Fundador y Director",
      description:
        "Con más de 10 años de experiencia en turismo, Mauricio fundó Chevere Bogotá Travel con la misión de mostrar la verdadera esencia de Colombia. Su pasión por la hospitalidad y conocimiento profundo del país garantizan experiencias auténticas e inolvidables.",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
    valuesTitle: "Nuestros Valores",
    valuesSubtitle:
      "Los principios que nos guían en cada servicio y que nos han convertido en la opción preferida para descubrir Colombia.",
    values: [
      { icon: "heart", title: "Pasión por Colombia", description: "Amamos nuestro país y nos emociona compartir su belleza, cultura e historia con cada uno de nuestros huéspedes.", colorClass: "bg-red-100 text-red-700" },
      { icon: "clock", title: "Puntualidad", description: "Respetamos tu tiempo. Nuestro compromiso es llegar siempre a tiempo y cumplir con los horarios establecidos.", colorClass: "bg-blue-100 text-blue-700" },
      { icon: "shield", title: "Seguridad", description: "Tu seguridad es nuestra prioridad. Conductores certificados, vehículos asegurados y protocolos de seguridad rigurosos.", colorClass: "bg-green-100 text-green-700" },
      { icon: "star", title: "Experiencia", description: "Más de 15 años en el sector turístico nos respaldan. Conocemos cada rincón y tenemos la experiencia para hacer tu viaje perfecto.", colorClass: "bg-amber-100 text-amber-700" },
      { icon: "users", title: "Servicio Personalizado", description: "Cada cliente es único. Adaptamos nuestros servicios a tus necesidades específicas para crear experiencias memorables.", colorClass: "bg-purple-100 text-purple-700" },
      { icon: "mapPin", title: "Conocimiento Local", description: "Somos expertos locales. Conocemos los mejores lugares, rutas alternativas y secretos que solo los nativos saben.", colorClass: "bg-teal-100 text-teal-700" },
    ],
  }

  const existing = await client.fetch("*[_type == 'aboutPage'][0]._id")
  if (existing) {
    await client.patch(existing).set(doc).commit()
    console.log("Updated aboutPage", existing)
  } else {
    const created = await client.create(doc)
    console.log("Created aboutPage", created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
