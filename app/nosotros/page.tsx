import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AboutHero } from "@/components/about-hero"
import { AboutTeam } from "@/components/about-team"
import { AboutValues } from "@/components/about-values"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Nosotros - Chevere Bogotá Tours | Conoce Nuestro Equipo",
  description:
    "Conoce a Mauricio Quiros y el equipo de Chevere Bogotá Tours. Experiencia, profesionalismo y pasión por mostrar lo mejor de Colombia.",
  keywords: "equipo Chevere Tours, Mauricio Quiros, conductores profesionales, turismo Colombia",
  openGraph: {
    title: "Nosotros - Chevere Bogotá Tours",
    description: "Conoce al equipo profesional detrás de las mejores experiencias turísticas en Colombia.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutTeam />
      <AboutValues />
      <Footer />
    </main>
  )
}
