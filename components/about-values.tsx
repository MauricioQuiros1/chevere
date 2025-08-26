'use client'
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock, Shield, Star, Users, MapPin } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { aboutPageQuery } from "@/lib/queries"

// No fallbacks: solo mostrar lo que venga del CMS

export function AboutValues() {
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

  const items = useMemo(() => (Array.isArray(data?.values) ? data.values : []), [data])
  const title = data?.valuesTitle
  const subtitle = data?.valuesSubtitle

  const iconFor = (key: string) => {
    switch (key) {
      case "heart":
        return Heart
      case "clock":
        return Clock
      case "shield":
        return Shield
      case "star":
        return Star
      case "users":
        return Users
      case "mapPin":
        return MapPin
      default:
        return Star
    }
  }
  return (
    <section className="pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">{title}</h2>
              )}
              {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
            </div>
          )}

          {items.length > 0 && (() => {
            const n = items.length
            const gridCols = n === 1
              ? "grid-cols-1"
              : n === 2
              ? "grid-cols-1 md:grid-cols-2"
              : n === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            return (
            <div className={`grid ${gridCols} gap-8 justify-items-stretch`}>
              {items.map((value: any, index: number) => {
              const Icon = iconFor(value.icon)
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-full ${value.colorClass || "bg-amber-100 text-amber-700"} mb-6`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    {value?.title && (
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    )}
                    {value?.description && (
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    )}
                  </CardContent>
                </Card>
              )
              })}
            </div>
            )})()}
        </div>
      </div>
    </section>
  )
}
