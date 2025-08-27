import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler"
import { LocaleProvider } from "@/components/locale-provider"
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
  title: "Chevere Bogotá Travel - Transporte Turístico, Empresarial y Personalizado",
  description:
    "Servicios de transporte turístico, empresarial y personalizado en Bogotá y Colombia. Puntualidad, seguridad, amabilidad y experiencia en cada viaje.",
  keywords: "tours Bogotá, transporte turístico, traslados aeropuerto, tours Colombia, hacienda cafetera",
  authors: [{ name: "Chevere Bogotá Travel" }],
  creator: "Chevere Bogotá Travel",
  publisher: "Chevere Bogotá Travel",
  openGraph: {
    title: "Chevere Bogotá Travel - Transporte Turístico en Colombia",
    description:
      "Descubre Colombia con nuestros tours personalizados. Transporte seguro y confiable en Bogotá y destinos nacionales.",
    url: "https://cheverebogotours.com",
    siteName: "Chevere Bogotá Travel",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chevere Bogotá Travel - Transporte Turístico en Colombia",
    description: "Descubre Colombia con nuestros tours personalizados. Transporte seguro y confiable.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", type: "image/x-icon", sizes: "any" },
      { url: "/favicon-32x32.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=3", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
    shortcut: ["/favicon.ico?v=3"],
  },
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

  {/* Favicon handled by metadata.icons; explicit tags removed to avoid duplicates */}

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
              name: "Chevere Bogotá Travel",
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
                        name: "Chevere Bogotá Travel",
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
        <LocaleProvider>
          <SmoothScrollHandler />
          <PageTransition>{children}</PageTransition>
          <WhatsAppFloat />
        </LocaleProvider>
      </body>
    </html>
  )
}
