/*
  Script: Crear/actualizar traducciones base en Sanity
  Uso:
    1) Exporta tu token con permisos de escritura:
       export SANITY_TOKEN="<token>"
       # Opcional: export SANITY_PROJECT_ID, SANITY_DATASET
    2) Ejecuta:
       npx ts-node scripts/setup-translations.ts

  Requisitos: SANITY_TOKEN con permisos write en el dataset.
*/

import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'nol0j9y7'
const DATASET = process.env.SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('Falta SANITY_TOKEN en el entorno (permiso write)')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-08-20',
  token: TOKEN,
  useCdn: false,
})

async function upsertTranslations() {
  const docs = [
    {
      _id: 'translations-es',
      _type: 'translations',
      locale: 'es',
      header: {
        homeLabel: 'Inicio',
        aboutLabel: 'Nosotros',
        toursLabel: 'Tours',
        transfersLabel: 'Traslados',
  contactLabel: 'Contacto',
  whatsappCtaText: 'Habla con nosotros',
      },
      hero: {
  title: undefined,
  whatsappText: 'Reservar por WhatsApp',
  toursButtonText: 'Tours Bogotá y alrededores',
      },
      toursSection: {
        title: undefined,
        emptyMessage: 'No hay tours disponibles por el momento.',
      },
      footer: {
        rightsText: undefined,
      },
      common: {
        reserveWhatsAppLabel: 'Reservar por WhatsApp',
        viewDetailsLabel: 'Ver detalle',
        pricesTitle: 'Precios',
        bestPriceBadge: 'Mejor precio',
      },
    },
    {
      _id: 'translations-en',
      _type: 'translations',
      locale: 'en',
      header: {
        homeLabel: 'Home',
        aboutLabel: 'About',
        toursLabel: 'Tours',
        transfersLabel: 'Transfers',
  contactLabel: 'Contact',
  whatsappCtaText: 'Chat with us',
      },
      hero: {
  title: undefined,
  whatsappText: 'Book via WhatsApp',
  toursButtonText: 'Tours Bogotá & surroundings',
      },
      toursSection: {
        title: undefined,
        emptyMessage: 'No tours available at the moment.',
      },
      footer: {
        rightsText: undefined,
      },
      common: {
        reserveWhatsAppLabel: 'Book via WhatsApp',
        viewDetailsLabel: 'View details',
        pricesTitle: 'Prices',
        bestPriceBadge: 'Best price',
      },
    },
  ]

  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log(`✔ Traducciones actualizadas: ${doc.locale}`)
  }
}

upsertTranslations().catch((e) => {
  console.error(e)
  process.exit(1)
})
