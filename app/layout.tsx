import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageTransition } from "@/components/page-transition"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Chevere Bogotá Tours - Transporte Turístico, Empresarial y Personalizado",
  description:
    "Servicios de transporte turístico, empresarial y personalizado en Bogotá y Colombia. Puntualidad, seguridad, amabilidad y experiencia en cada viaje.",
  keywords: "tours Bogotá, transporte turístico, traslados aeropuerto, tours Colombia, hacienda cafetera",
  authors: [{ name: "Chevere Bogotá Tours" }],
  creator: "Chevere Bogotá Tours",
  publisher: "Chevere Bogotá Tours",
  openGraph: {
    title: "Chevere Bogotá Tours - Transporte Turístico en Colombia",
    description:
      "Descubre Colombia con nuestros tours personalizados. Transporte seguro y confiable en Bogotá y destinos nacionales.",
    url: "https://cheverebogotours.com",
    siteName: "Chevere Bogotá Tours",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chevere Bogotá Tours - Transporte Turístico en Colombia",
    description: "Descubre Colombia con nuestros tours personalizados. Transporte seguro y confiable.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap"
          as="style"
        />

        <link rel="prefetch" href="/tours/hacienda-cafetera-coloma" />
        <link rel="prefetch" href="/nosotros" />
        <link rel="prefetch" href="/galeria" />
        <link rel="prefetch" href="/contacto" />
        <link rel="prefetch" href="/traslados" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Chevere Bogotá Tours",
              description: "Servicios de transporte turístico, empresarial y personalizado en Bogotá y Colombia",
              url: "https://cheverebogotours.com",
              telephone: ["+57-318-459-8635", "+57-305-479-8365"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bogotá",
                addressCountry: "CO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "4.7110",
                longitude: "-74.0721",
              },
              openingHours: "Mo-Su 00:00-23:59",
              priceRange: "$$",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "4.7110",
                  longitude: "-74.0721",
                },
                geoRadius: "200000",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tours y Traslados",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "TouristTrip",
                      name: "Tour Hacienda Cafetera Coloma",
                      description:
                        "Vive la auténtica cultura cafetera Colombiana en un viaje de un día a la Hacienda Coloma, una joya ubicada en Fusagasugá a solo dos horas de Bogotá.",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "Chevere Bogotá Tours",
                      },
                      touristType: "Coffee Tourism",
                      duration: "PT8H",
                      offers: {
                        "@type": "Offer",
                        price: "72",
                        priceCurrency: "USD",
                        availability: "https://schema.org/InStock",
                      },
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "6",
              },
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollHandler />
        <PageTransition>{children}</PageTransition>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
