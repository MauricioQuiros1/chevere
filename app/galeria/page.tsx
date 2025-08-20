import type { Metadata } from "next"
import { Header } from "@/components/header"
import { GalleryGrid } from "@/components/gallery-grid"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Galería - Chevere Bogotá Tours | Fotos de Nuestros Tours",
  description:
    "Explora nuestra galería de fotos de tours por Colombia. Descubre los hermosos destinos que visitamos: haciendas cafeteras, sitios históricos y paisajes únicos.",
  keywords: "galería tours Colombia, fotos Bogotá, paisajes Colombia, hacienda cafetera, Zipaquirá, Villa de Leyva",
  openGraph: {
    title: "Galería - Chevere Bogotá Tours",
    description: "Descubre los hermosos destinos de Colombia a través de nuestra galería fotográfica.",
    type: "website",
  },
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GalleryGrid />
      <Footer />
    </main>
  )
}
