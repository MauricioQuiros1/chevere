import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { VideosSection } from "@/components/videos-section"
import { ToursSection } from "@/components/tours-section"
import { CustomTourContact } from "@/components/custom-tour-contact"
import { TrasladosSection } from "@/components/traslados-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ColombianSlogan } from "@/components/colombian-slogan"
import { ContactQuickSection } from "@/components/contact-quick-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ToursSection />
      <CustomTourContact />
      <VideosSection />
      <TrasladosSection />
      <TestimonialsSection />
      <ColombianSlogan />
      <Footer />
    </main>
  )
}
