"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, Clock } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { contactPageQuery, toursSimpleListQuery, generalQuery } from "@/lib/queries"

type ContactField = {
  name: string
  label: string
  type: "text" | "phone" | "email" | "tour" | "date" | "people" | "message"
  placeholder?: string
  required?: boolean
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    servicio: "",
    fecha: "",
    personas: "",
    mensaje: "",
  })

  const [isVisible, setIsVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [config, setConfig] = useState<any>(null)
  const [tours, setTours] = useState<{ id: string; name: string; people?: number | string | null }[]>([])
  const [general, setGeneral] = useState<any>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      )
      headerObserver.observe(headerRef.current)
      observers.push(headerObserver)
    }

    if (formRef.current) {
      const formObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFormVisible(true)
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      )
      formObserver.observe(formRef.current)
      observers.push(formObserver)
    }

    if (cardsRef.current) {
      const cardsObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardsVisible(true)
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      )
      cardsObserver.observe(cardsRef.current)
      observers.push(cardsObserver)
    }

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const [page, toursData, gen] = await Promise.all([
        sanityClient.fetch(contactPageQuery),
        sanityClient.fetch(toursSimpleListQuery),
        sanityClient.fetch(generalQuery),
      ])
      if (!cancelled) setConfig(page || null)
      if (!cancelled) setTours(Array.isArray(toursData) ? toursData : [])
      if (!cancelled) setGeneral(gen || null)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      // Si cambia el servicio, asegurar que personas no exceda el máximo
      if (field === "servicio") {
        const selected = tours.find((t) => t.id === value)
        const max = getMaxPeople(selected?.people)
        const personas = Number(prev.personas)
        const clamped = personas && personas > max ? String(max) : prev.personas
        return { ...prev, servicio: value, personas: clamped }
      }
      return { ...prev, [field]: value }
    })
  }

  const getMaxPeople = (people: number | string | null | undefined): number => {
    if (typeof people === "number" && Number.isFinite(people) && people > 0) return people
    if (typeof people === "string") {
      const nums = people.match(/\d+/g)?.map((n) => Number(n)).filter((n) => Number.isFinite(n) && n > 0) || []
      if (nums.length) return Math.max(...nums)
    }
    return 5
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

  const message = `Hola, me interesa contactarlos:
    
Nombre: ${formData.nombre}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Servicio/Tour: ${formData.servicio}
Fecha: ${formData.fecha}
Número de personas: ${formData.personas}
Mensaje: ${formData.mensaje}`

    // Simulate loading delay for better UX
    const raw = general?.whatsappNumbers?.[0] || "573184598635"
    setTimeout(() => {
      window.open(`https://wa.me/${raw}?text=${encodeURIComponent(message)}`, "_blank")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleWhatsApp = () => {
    const raw = general?.whatsappNumbers?.[0] || "573184598635"
    window.open(`https://wa.me/${raw}?text=${encodeURIComponent("Hola, me interesa información sobre sus tours")}`, "_blank")
  }

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up">
              {config?.pageTitle || "Contacto"}
            </h1>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {config?.pageDescription || "¿Listo para vivir una experiencia única en Bogotá? Contáctanos y planifiquemos juntos tu próxima aventura."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              ref={formRef}
              className={`transition-all duration-1000 ${
                formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <Card className="py-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:border-amber-200 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-gray-900 flex items-center">
                    <Send className="h-6 w-6 mr-2 text-amber-600 animate-pulse" />
                    {config?.form?.title || "Envíanos un Mensaje"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(
                        (config?.form?.fields as ContactField[] | undefined) || [
                          { name: "nombre", label: "Nombre Completo *", type: "text", required: true },
                          { name: "whatsapp", label: "WhatsApp *", type: "phone", required: true, placeholder: "+57 300 123 4567" },
                        ]
                      )
                        .filter((f) => ["text", "phone", "email"].includes(f.type))
                        .slice(0, 2)
                        .map((field) => (
                          <div key={field.name} className="group">
                            <Label htmlFor={field.name} className="group-hover:text-amber-700 transition-colors duration-300">
                              {field.label}
                            </Label>
                            <Input
                              id={field.name}
                              type={field.type === "phone" ? "tel" : field.type === "email" ? "email" : "text"}
                              value={(formData as any)[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={!!field.required}
                              className="mt-1 transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 focus:border-amber-400"
                            />
                          </div>
                        ))}
                    </div>

                    {(() => {
                      const field: ContactField | undefined = (config?.form?.fields as ContactField[] | undefined)?.find(
                        (f) => f.type === "email",
                      ) || { name: "email", label: "Email", type: "email" }
                      return (
                        <div className="group">
                          <Label htmlFor={field.name} className="group-hover:text-amber-700 transition-colors duration-300">
                            {field.label}
                          </Label>
                          <Input
                            id={field.name}
                            type="email"
                            value={(formData as any)[field.name] || ""}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            required={!!field.required}
                            className="mt-1 transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 focus:border-amber-400"
                          />
                        </div>
                      )
                    })()}

                    <div className="group">
                      <Label htmlFor="servicio" className="group-hover:text-amber-700 transition-colors duration-300">
                        Servicio/Tour de Interés
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("servicio", value)}>
                        <SelectTrigger className="mt-1 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-amber-400">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {tours.length
                            ? tours.map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name}
                                </SelectItem>
                              ))
                            : (
                                [
                                  { id: "hacienda-cafetera", name: "Tour Hacienda Cafetera Coloma" },
                                  { id: "zipaquira", name: "Catedral de Sal de Zipaquirá" },
                                  { id: "guatavita", name: "Laguna de Guatavita" },
                                  { id: "monserrate", name: "Cerro de Monserrate" },
                                  { id: "museo-oro", name: "Museo del Oro & Centro Histórico" },
                                  { id: "villa-leyva", name: "Villa de Leyva Día Completo" },
                                  { id: "traslado-aeropuerto", name: "Traslado al Aeropuerto" },
                                  { id: "servicio-horas", name: "Servicio por Horas" },
                                  { id: "personalizado", name: "Tour Personalizado" },
                                ].map((t) => (
                                  <SelectItem key={t.id} value={t.id}>
                                    {t.name}
                                  </SelectItem>
                                ))
                              )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <Label htmlFor="fecha" className="group-hover:text-amber-700 transition-colors duration-300">
                          Fecha Preferida
                        </Label>
                        <Input
                          id="fecha"
                          type="date"
                          value={formData.fecha}
                          onChange={(e) => handleInputChange("fecha", e.target.value)}
                          className="mt-1 transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 focus:border-amber-400"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="personas" className="group-hover:text-amber-700 transition-colors duration-300">
                          Número de Personas
                        </Label>
                        <Select value={formData.personas || undefined} onValueChange={(value) => handleInputChange("personas", value)}>
                          <SelectTrigger className="mt-1 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-amber-400">
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            {(() => {
                              const selected = tours.find((t) => t.id === formData.servicio)
                              const max = getMaxPeople(selected?.people)
                              return Array.from({ length: max }, (_, i) => i + 1).map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                  {n} {n === 1 ? "persona" : "personas"}
                                </SelectItem>
                              ))
                            })()}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="group">
                      <Label htmlFor="mensaje" className="group-hover:text-amber-700 transition-colors duration-300">
                        Mensaje
                      </Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => handleInputChange("mensaje", e.target.value)}
                        placeholder="Cuéntanos más detalles sobre tu viaje..."
                        rows={4}
                        className="mt-1 transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 focus:border-amber-400 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`w-full bg-amber-700 hover:bg-amber-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 active:scale-95 btn-enhanced ${
                        isSubmitting ? "animate-pulse" : ""
                      }`}
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                          {config?.form?.submitLabel || "Enviar Mensaje"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* WhatsApp Direct Contact */}
            <div
              ref={cardsRef}
              className={`space-y-6 transition-all duration-1000 ${
                cardsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Card className="py-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:border-green-200 transform hover:-translate-y-1 animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-gray-900 flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2 text-green-600 animate-bounce" />
                    {config?.directContact?.title || "Contacto Directo"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 mb-6 hover:text-gray-700 transition-colors duration-300">
                     {config?.directContact?.description || "Contáctanos por WhatsApp para atención inmediata y personalizada."}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 hover:text-amber-700 transition-colors duration-300">
                      Horario de Atención:
                    </h4>
                    <div className="text-gray-600 hover:text-gray-700 transition-colors duration-300">
                      {general?.openingHours?.length ? (
                        general.openingHours.map((o: any, i: number) => (
                          <p key={i} className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            {`${o?.days || ""}${o?.hours ? `: ${o.hours}` : ""}`}
                          </p>
                        ))
                      ) : (
                        <p className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Lunes a Sábado: 9:00 AM - 6:00 PM
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 active:scale-95 btn-enhanced group"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    {config?.directContact?.buttonLabel || "WhatsApp"}
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
