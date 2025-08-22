
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { sanityClient } from "@/lib/sanity"
import { tourDetailQuery, toursListQuery } from "@/lib/queries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CustomTourContact } from "@/components/custom-tour-contact"
import { TourIncludesRecommendations } from "@/components/tour-includes-recommendations"
import { TourCarousel } from "@/components/tour-carousel"
import { Clock, Users, MapPin, Star } from "lucide-react"
import { PortableText } from "@portabletext/react"

type Params = { tourId: string }

export async function generateStaticParams() {
  const tours = await sanityClient.fetch(toursListQuery)
  return (tours || []).map((t: any) => ({ tourId: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tourId } = await params
  const tour = await sanityClient.fetch(tourDetailQuery, { id: tourId })
  if (!tour) return {}
  return {
    title: `${tour.name} - Chevere Bogotá Tours`,
    description: tour.brief,
    openGraph: {
      title: tour.name,
      description: tour.brief,
      type: "article",
      images: tour.image ? [{ url: tour.image }] : undefined,
    },
  }
}

export default async function TourDetailPage({ params }: { params: Promise<Params> }) {
  const { tourId } = await params
  const tour = await sanityClient.fetch(tourDetailQuery, { id: tourId })
  if (!tour) return notFound()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative ">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          {tour.image && (
            <Image src={tour.image} alt={tour.name} fill className="object-cover" priority sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{tour.name}</h1>
                <p className="text-xl text-white/90 mb-6">{tour.brief}</p>

                <div className="flex flex-wrap gap-4 text-white/80 mb-6">
                  {tour.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{tour.hours}</span>
                    </div>
                  )}
                  {tour.people && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{tour.people}</span>
                    </div>
                  )}
                  {tour.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{tour.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current" />
                    <span>Tour Privado</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/573054798365?text=${encodeURIComponent(
                    `Hola, me interesa el tour "${tour.name}"`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm rounded-md"
                >
                  Reservar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Intro */}
        {(tour.introTitle || tour.introDescription) && (
          <div className="container mx-auto px-4 pt-16">
            <div className="max-w-4xl mx-auto">
              {tour.introTitle && (
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
                  {tour.introTitle}
                </h2>
              )}
              {Array.isArray(tour.introDescription) ? (
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-lg text-justify mb-8">
                  <PortableText value={tour.introDescription} />
                </div>
              ) : tour.introDescription ? (
                <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-lg text-justify mb-8">
                  {tour.introDescription}
                </p>
              ) : null}
            </div>
          </div>
        )}
      </section>

  {/* Carrusel de imágenes (solo si hay galería en Sanity) */}
  {tour.gallery?.length > 0 && (
    <TourCarousel
      images={tour.gallery.map((img: any) => ({
        src: img.src,
        alt: img.alt || tour.name,
      }))}
    />
  )}

      {/* Incluye / Recomendaciones */}
      {(tour.includes?.length || tour.recommendations?.length) && (
        <TourIncludesRecommendations includes={tour.includes || []} recommendations={tour.recommendations || []} />
      )}

      {/* Precios */}
      {tour.pricingTiers?.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Precios del Tour</h2>
              <p className="text-lg text-gray-600">Selección según número de personas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {tour.pricingTiers.map((tier: any, idx: number) => (
                <div key={idx} className={`relative bg-white rounded-xl shadow p-6 text-center border ${tier.popular ? "ring-2 ring-amber-400 scale-105" : ""}`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                      Mejor Precio
                    </span>
                  )}
                  <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-3 mx-auto">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{tier.people} {tier.people === 1 ? "persona" : "personas"}</div>
                  <div className="text-3xl font-bold text-amber-700 mb-1">US ${tier.priceUSD}</div>
                  <div className="text-sm text-gray-600 mb-4">por persona</div>
                  <a
                    href={`https://wa.me/573054798365?text=${encodeURIComponent(
                      `Hola, me interesa reservar el tour "${tour.name}" para ${tier.people} persona(s) - US $${tier.priceUSD} por persona`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-block text-center px-4 py-2 rounded-md text-white ${tier.popular ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}`}
                  >
                    Reservar Ahora
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CustomTourContact />
      <WhatsAppFloat />
      <Footer />
    </main>
  )
}
