import type { Metadata } from "next"
import { Header } from "@/components/header"
import { TourHero } from "@/components/tour-hero"
import { TourCarousel } from "@/components/tour-carousel"
import { TourIncludesRecommendations } from "@/components/tour-includes-recommendations"
import { TourPricing } from "@/components/tour-pricing"
import { ColombianSlogan } from "@/components/colombian-slogan"
import { CustomTourContact } from "@/components/custom-tour-contact"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Tour Hacienda Cafetera Coloma - Chevere Bogotá Tours",
  description:
    "Vive la auténtica cultura cafetera colombiana en la Hacienda Coloma, Fusagasugá. Tour privado con degustación, almuerzo y transporte incluido.",
  keywords: "tour café Colombia, hacienda cafetera, Fusagasugá, cultura cafetera, tour privado Bogotá",
  openGraph: {
    title: "Tour Hacienda Cafetera Coloma - Experiencia Auténtica del Café",
    description:
      "Descubre el proceso del mejor café del mundo en la Hacienda Coloma. Tour privado desde Bogotá con degustación incluida.",
    type: "article",
  },
}

const tourIncludes = [
  "Transporte privado ida y vuelta desde Bogotá",
  "Guía especializado en cultura cafetera",
  "Tour completo por la hacienda cafetera",
  "Degustación de diferentes tipos de café",
  "Almuerzo típico colombiano",
  "Actividades interactivas del proceso del café",
]

const tourRecommendations = [
  "Usar ropa cómoda y zapatos antideslizantes",
  "Llevar protector solar y sombrero",
  "Traer cámara para capturar los hermosos paisajes",
  "Venir con apetito para disfrutar el almuerzo típico",
  "Estar preparado para caminar por terrenos naturales",
  "Llevar chaqueta ligera para cambios de temperatura",
]

export default function HaciendaCafeteraPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TourHero />
      <TourCarousel />
      <TourIncludesRecommendations includes={tourIncludes} recommendations={tourRecommendations} />
      <TourPricing />
      <ColombianSlogan />
      <CustomTourContact />
      <WhatsAppFloat />
      <Footer />
    </main>
  )
}
