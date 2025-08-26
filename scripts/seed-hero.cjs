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
    _type: "hero",
    title: "Chevere Bogota Travel",
    whatsappText: "Reservar por WhatsApp",
    toursButtonText: "Tours Bogotá y alrededores",
    whatsappNumber: "573054798365",
    desktopImages: [
      { _type: "object", fallback: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1600", alt: "Bogotá de noche" },
      { _type: "object", fallback: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1600", alt: "Montserrate" },
    ],
    mobileImages: [
      { _type: "object", fallback: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800", alt: "Bogotá móvil" },
      { _type: "object", fallback: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800", alt: "Montserrate móvil" },
    ],
  }

  const existing = await client.fetch("*[_type == 'hero'][0]._id")
  if (existing) {
    await client.patch(existing).set(doc).commit()
    console.log("Updated hero", existing)
  } else {
    const created = await client.create(doc)
    console.log("Created hero", created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
