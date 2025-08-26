'use client'
"use client"
import { ValidatedImage } from "@/components/image-validator"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Shield, Heart, Star, Users, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

export function AboutTeam() {
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

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case "car":
        return <Car className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      case "heart":
        return <Heart className="h-6 w-6" />
      case "star":
        return <Star className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "mapPin":
        return <MapPin className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {(data?.teamTitle || data?.teamSubtitle) && (
            <div className="text-center mb-16">
              {data?.teamTitle && (
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">{data.teamTitle}</h2>
              )}
              {data?.teamSubtitle && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.teamSubtitle}</p>
              )}
            </div>
          )}

          {/* Team Values Grid */}
          {Array.isArray(data?.teamCards) && data.teamCards.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 justify-items-stretch`}>
              {data.teamCards.map((c: any, i: number) => (
                <Card key={i} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                        {renderIcon(c.icon)}
                      </div>
                      <div>
                        {c?.title && (
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
                        )}
                        {c?.description && (
                          <p className="text-gray-600 leading-relaxed">{c.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
