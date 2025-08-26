import { createClient } from "@sanity/client"
import fs from "fs"
import path from "path"

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
  // Permite sobrescribir contenido desde data/transfers.json
  const jsonPath = path.join(process.cwd(), "data", "transfers.json")
  let payload: any | null = null
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, "utf-8")
      payload = JSON.parse(raw)
      console.log("Usando contenido desde data/transfers.json")
    } catch (e) {
      console.warn("No se pudo parsear data/transfers.json, usando contenido por defecto")
    }
  }

  const doc = payload ?? {
    _type: "transfersSection",
    title: "Servicios de Traslados",
    subtitle:
      "Conectamos Bogotá con comodidad y seguridad. Desde el aeropuerto hasta servicios por horas para tus necesidades.",
    airportTabTitle: "Servicios Aeropuerto",
    hourlyTabTitle: "Servicios por Horas",
    heroImageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    airportTransfer: {
      _type: "object",
      title: "Transporte Privado al Aeropuerto El Dorado",
      description: "Traslado puerta a puerta desde y hacia el Aeropuerto Internacional El Dorado",
      price: "Desde $45.000 COP",
      duration: "45-60 min",
      capacity: "1-4 personas",
      imageUrl:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&crop=center",
      features: [
        "Servicio 24/7",
        "Monitoreo de vuelos",
        "Conductor profesional",
        "Vehículo cómodo",
      ],
    },
    hourlyTransfer: {
      _type: "object",
      title: "Servicio Privado por Horas",
      description: "Conductor a disposición para múltiples destinos dentro de la ciudad",
      price: "Desde $35.000 COP/hora",
      minHours: "Mínimo 3 horas",
      capacity: "1-4 personas",
      imageUrl:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop&crop=center",
      features: [
        "Rutas personalizadas",
        "Esperas incluidas",
        "Múltiples paradas",
        "Conductor dedicado",
      ],
    },
  }

  // Upsert: ensure only one document
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
