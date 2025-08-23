import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ContactForm } from "@/components/contact-form"
import { ContactMap } from "@/components/contact-map"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contacto - Chevere Bogotá Travel | Reserva tu Tour",
  description:
    "Contáctanos para reservar tu tour por Colombia. Atención 24/7, WhatsApp directo y formulario de contacto. ¡Estamos listos para ayudarte!",
  keywords: "contacto Chevere Travel, reservar tour Colombia, WhatsApp tours, atención 24/7 Bogotá",
  openGraph: {
    title: "Contacto - Chevere Bogotá Travel",
    description: "Contáctanos para planear tu próxima aventura por Colombia. Atención personalizada 24/7.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactForm />
      <ContactMap />
      <Footer />
    </main>
  )
}
