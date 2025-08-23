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
    _type: "transfersSection",
    title: "Servicios de Traslados",
    subtitle:
      "Conectamos Bogotá con comodidad y seguridad. Desde el aeropuerto hasta servicios por horas para tus necesidades.",
    airportServices: [
      {
        _type: "object",
        title: "Aeropuerto El Dorado ↔ Bogotá",
        description: "Traslado directo desde/hacia el aeropuerto internacional",
        price: "Desde $45.000 COP",
        duration: "45-60 min",
        capacity: "1-4 personas",
        imageUrl:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=center",
        features: [
          "Servicio 24/7",
          "Seguimiento de vuelo",
          "Conductor bilingüe",
          "Vehículo premium",
        ],
      },
      {
        _type: "object",
        title: "Aeropuerto ↔ Hoteles Zona Rosa",
        description: "Conexión directa a la zona hotelera y comercial",
        price: "Desde $50.000 COP",
        duration: "50-70 min",
        capacity: "1-4 personas",
        imageUrl:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&crop=center",
        features: [
          "Recogida en terminal",
          "WiFi gratuito",
          "Agua cortesía",
          "Asistencia equipaje",
        ],
      },
    ],
    hourlyServices: [
      {
        _type: "object",
        title: "Servicio por Horas - Ciudad",
        description: "Disponibilidad completa para múltiples destinos",
        price: "Desde $35.000 COP/hora",
        minHours: "Mínimo 3 horas",
        capacity: "1-4 personas",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&crop=center",
        features: [
          "Conductor dedicado",
          "Rutas personalizadas",
          "Esperas incluidas",
          "Múltiples paradas",
        ],
      },
      {
        _type: "object",
        title: "Servicio Ejecutivo por Horas",
        description: "Para reuniones de negocios y eventos corporativos",
        price: "Desde $45.000 COP/hora",
        minHours: "Mínimo 4 horas",
        capacity: "1-4 personas",
        imageUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
        features: [
          "Vehículo ejecutivo",
          "Conductor formal",
          "Puntualidad garantizada",
          "Facturación empresarial",
        ],
      },
    ],
  }

  const existing = await client.fetch("*[_type == 'transfersSection'][0]._id")
  if (existing) {
    await client.patch(existing).set(doc).commit()
    console.log("Updated transfersSection", existing)
  } else {
    const created = await client.create(doc)
    console.log("Created transfersSection", created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
