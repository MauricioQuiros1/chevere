/*
  Script: Actualizar textos del hero en traducciones existentes (sin crear docs)
  Uso:
    export SANITY_TOKEN="<token>"
    npx ts-node -O '{"module":"commonjs"}' scripts/update-translations.ts
*/

import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'nol0j9y7'
const DATASET = process.env.SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('Falta SANITY_TOKEN en el entorno (permiso read/update)')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-08-20',
  token: TOKEN,
  useCdn: false,
})

async function updateLocale(locale: 'es' | 'en') {
  const doc = await client.fetch(`*[_type == "translations" && locale == $locale][0]{_id, hero, header}`, { locale })
  if (!doc?._id) {
    console.log(`ℹ No existe documento de traducciones para locale='${locale}'. Omitido (se requiere permiso de create).`)
    return
  }

  const headerWhatsapp = locale === 'en' ? 'Chat with us' : 'Habla con nosotros'
  const heroWhatsapp = locale === 'en' ? 'Book via WhatsApp' : 'Reservar por WhatsApp'
  const toursButtonText = locale === 'en' ? 'Tours Bogotá & surroundings' : 'Tours Bogotá y alrededores'

  await client
    .patch(doc._id)
    .set({
      header: { ...(doc.header || {}), whatsappCtaText: headerWhatsapp },
      hero: { ...(doc.hero || {}), whatsappText: heroWhatsapp, toursButtonText },
    })
    .commit()
  console.log(`✔ Actualizado hero.* en traducciones (${locale})`)
}

async function run() {
  await updateLocale('es')
  await updateLocale('en')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
