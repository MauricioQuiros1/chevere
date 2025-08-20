"use client"

import { useState } from "react"

interface TourIncludesRecommendationsProps {
  includes: string[]
  recommendations: string[]
}

export function TourIncludesRecommendations({ includes, recommendations }: TourIncludesRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<"includes" | "recommendations">("includes")

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab("includes")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === "includes"
                    ? "bg-yellow-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ¿Qué incluye el tour?
              </button>
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === "recommendations"
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Recomendaciones para tu visita
              </button>
            </div>
          </div>

          <div className="relative min-h-[300px]">
            <div
              className={`absolute inset-0 transition-all duration-500 transform ${
                activeTab === "includes" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              {activeTab === "includes" && (
                <div className="bg-green-50 rounded-xl p-8 border border-green-100">
                  <ul className="space-y-4">
                    {includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                        <span className="text-gray-800 leading-relaxed text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div
              className={`absolute inset-0 transition-all duration-500 transform ${
                activeTab === "recommendations" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              {activeTab === "recommendations" && (
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
                  <ul className="space-y-4">
                    {recommendations.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                        <span className="text-gray-800 leading-relaxed text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
