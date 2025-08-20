import type { Metadata } from "next"
import { Header } from "@/components/header"
import { TrasladosHero } from "@/components/traslados-hero"
import { TrasladosServices } from "@/components/traslados-services"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Traslados - Chevere Bogotá Tours | Transporte Seguro y Confiable",
  description:
    "Servicios de traslados en Bogotá y Colombia. Aeropuerto El Dorado, hoteles, eventos empresariales. Transporte seguro, puntual y cómodo las 24 horas.",
  keywords: "traslados Bogotá, aeropuerto El Dorado, transporte empresarial, traslados hoteles, servicio 24 horas",
  openGraph: {
    title: "Traslados - Chevere Bogotá Tours",
    description: "Servicios de traslados seguros y puntuales en Bogotá. Aeropuerto, hoteles y eventos empresariales.",
    type: "website",
  },
}

export default function TrasladosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TrasladosHero />
      <TrasladosServices />
      <Footer />
    </main>
  )
}
