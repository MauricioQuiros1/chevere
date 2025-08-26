'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

export function AboutHero() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let cancelled = false
    sanityClient.fetch(aboutPageQuery).then((d) => {
      if (!cancelled) setData(d || null)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {(data?.heroTitle || data?.heroSubtitle) && (
            <div className="text-center mb-12">
              {data?.heroTitle && (
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">{data.heroTitle}</h1>
              )}
              {data?.heroSubtitle && (
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  {data.heroSubtitle}
                </p>
              )}
            </div>
          )}

          {/* Founder Section with Image (only if any founder data exists) */}
          {data?.founder && (data.founder.name || data.founder.role || data.founder.description || data.founder.image || (Array.isArray(data.founder.badges) && data.founder.badges.length > 0)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  {(data.founder.name || data.founder.role) && (
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                      {data.founder.name}
                      {data.founder.role && (
                        <span className="block text-lg text-amber-700 font-normal mt-1">{data.founder.role}</span>
                      )}
                    </h2>
                  )}
                  {data.founder.description && (
                    <p className="text-gray-700 leading-relaxed mb-6">{data.founder.description}</p>
                  )}
                  {Array.isArray(data.founder.badges) && data.founder.badges.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {data.founder.badges.map((b: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {data.founder.image && (
                <div className="order-1 lg:order-2">
                  <img
                    src={data.founder.image}
                    alt="Foto del fundador"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-xl mx-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          )}

          {/* Team Stats Grid (only if provided) */}
          {Array.isArray(data?.stats) && data.stats.length > 0 && (() => {
            const n = data.stats.length as number
            const gridCols = n === 1
              ? "grid-cols-1"
              : n === 2
              ? "grid-cols-2"
              : n === 3
              ? "grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 lg:grid-cols-4"
            return (
            <div className={`grid ${gridCols} gap-6 justify-items-stretch`}>
              {data.stats.map((s: any, i: number) => (
                <Card key={i} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    {(s?.icon === "award" || s?.icon === "users" || s?.icon === "mapPin" || s?.icon === "clock") && (
                      <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-700 mb-4">
                        {s.icon === "award" && <Award className="h-6 w-6" />}
                        {s.icon === "users" && <Users className="h-6 w-6" />}
                        {s.icon === "mapPin" && <MapPin className="h-6 w-6" />}
                        {s.icon === "clock" && <Clock className="h-6 w-6" />}
                      </div>
                    )}
                    {s?.value && <h3 className="text-2xl font-bold text-gray-900 mb-1">{s.value}</h3>}
                    {s?.label && <p className="text-gray-600 text-sm">{s.label}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
            )})()}
        </div>
      </div>
    </section>
  )
}
