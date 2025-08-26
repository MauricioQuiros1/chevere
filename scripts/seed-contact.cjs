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
    _type: "contactPage",
    pageTitle: "Contacto",
    pageDescription:
      "¿Listo para vivir una experiencia única en Bogotá? Contáctanos y planifiquemos juntos tu próxima aventura.",
    form: {
      title: "Envíanos un Mensaje",
      submitLabel: "Enviar Mensaje",
      fields: [
        { _type: "object", name: "nombre", label: "Nombre Completo *", type: "text", required: true },
        { _type: "object", name: "whatsapp", label: "WhatsApp *", type: "phone", required: true, placeholder: "+57 300 123 4567" },
        { _type: "object", name: "email", label: "Email", type: "email" },
        { _type: "object", name: "servicio", label: "Servicio/Tour de Interés", type: "tour" },
        { _type: "object", name: "fecha", label: "Fecha Preferida", type: "date" },
        { _type: "object", name: "personas", label: "Número de Personas", type: "people" },
        { _type: "object", name: "mensaje", label: "Mensaje", type: "message" },
      ],
    },
    directContact: {
      title: "Contacto Directo",
      description: "Contáctanos por WhatsApp para atención inmediata y personalizada.",
      buttonLabel: "WhatsApp",
    },
  }

  const existing = await client.fetch("*[_type == 'contactPage'][0]._id")
  if (existing) {
    await client.patch(existing).set(doc).commit()
    console.log("Updated contactPage", existing)
  } else {
    const created = await client.create(doc)
    console.log("Created contactPage", created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
