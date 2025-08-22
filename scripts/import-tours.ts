/*
  Script: Importar tours a Sanity
  Uso:
    1) Copia tu JSON a data/tours.json (mismo formato que data/tours.example.json)
    2) Ejecuta con: npx ts-node scripts/import-tours.ts

  Requisitos: SANITY_PROJECT_ID, SANITY_DATASET y token con permisos de write (SANITY_TOKEN)
*/

import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'nol0j9y7'
const DATASET = process.env.SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_TOKEN // debe estar configurado

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-08-20',
  token: TOKEN,
  useCdn: false,
})

// Helper para subir una imagen desde URL a Sanity y devolver un asset ref
async function uploadImageFromUrl(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`No se pudo descargar la imagen: ${url}`)
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const asset = await client.assets.upload('image', buffer as any, {
    filename: url.split('/').pop() || 'image.jpg',
    contentType: res.headers.get('content-type') || 'image/jpeg',
  })
  return asset
}

async function run() {
  const dataPath = path.resolve(process.cwd(), 'data', 'tours.json')
  const examplePath = path.resolve(process.cwd(), 'data', 'tours.example.json')
  const fileToUse = fs.existsSync(dataPath) ? dataPath : examplePath
  const raw = fs.readFileSync(fileToUse, 'utf-8')
  const tours = JSON.parse(raw)

  if (!TOKEN) {
    throw new Error('Falta SANITY_TOKEN en el entorno (permiso write)')
  }

  for (const t of tours) {
    try {
      // Subir imagen principal
      let mainImageRef: any = undefined
      if (t.imageUrl) {
        const mainAsset = await uploadImageFromUrl(t.imageUrl)
        mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: mainAsset._id } }
      }

      // Subir galería si existe
      let gallery: any[] = []
      if (Array.isArray(t.gallery)) {
        for (const g of t.gallery) {
          const asset = await uploadImageFromUrl(g.src)
          gallery.push({ _type: 'object', image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }, alt: g.alt || '' })
        }
      }

      const doc = {
        _type: 'tour',
        name: t.name,
        slug: { _type: 'slug', current: t.slug },
        brief: t.brief,
        hours: t.hours,
        people: t.people,
        location: t.location,
        priceFromUSD: t.priceFromUSD,
        introTitle: t.introTitle,
        introDescription: t.introDescription,
        image: mainImageRef,
        fallback: t.fallback,
        gallery,
        includes: t.includes || [],
        recommendations: t.recommendations || [],
        pricingTiers: (t.pricingTiers || []).map((p: any) => ({ people: p.people, priceUSD: p.priceUSD, popular: !!p.popular })),
      }

      // Upsert por slug
      const id = `tour-${t.slug}`
      await client.createOrReplace({ _id: id, ...doc })
      console.log(`✔ Importado/actualizado: ${t.name}`)
    } catch (e: any) {
      console.error(`✖ Error con '${t?.name || t?.slug}':`, e.message)
    }
  }

  console.log('Finalizado')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
