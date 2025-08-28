"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { customTourFormQuery, generalQuery } from "@/lib/queries"

export function CustomTourContact() {
  const [config, setConfig] = useState<any | null>(null)
  const [general, setGeneral] = useState<any | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [honeypot, setHoneypot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const [cfg, gen] = await Promise.all([
        sanityClient.fetch(customTourFormQuery),
        sanityClient.fetch(generalQuery),
      ])
      if (!cancelled) setConfig(cfg || null)
      if (!cancelled) setGeneral(gen || null)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const emailIsValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const requiredErrors = useMemo(() => {
    if (!config?.fields) return [] as string[]
    const errs: string[] = []
    for (const f of config.fields) {
      if (f.required) {
        const v = (formData[f.name] || "").trim()
        if (!v) errs.push(f.name)
        if (f.type === "email" && v && !emailIsValid(v)) errs.push(f.name)
      }
    }
    return errs
  }, [config?.fields, formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (requiredErrors.length) {
      alert("Por favor completa los campos requeridos correctamente")
      return
    }

    setIsSubmitting(true)
    try {
      // Normalizar correo para replyTo en backend
      const normalizedEmail = formData["email"] || formData["correo"]
      const payload = {
        ...formData,
        email: normalizedEmail || formData["email"],
        contactEmail: normalizedEmail,
        source: "custom-tour-contact",
        submittedAt: new Date().toISOString(),
      }

      const res = await fetch("/api/custom-tour-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok && !json?.ok) throw new Error("send-failed")

      // Construir mensaje para WhatsApp con etiquetas
      const labelByName: Record<string, string> = {}
      for (const f of (config?.fields || [])) labelByName[f.name] = f.label || f.name
      const pairs = Object.entries(formData)
        .map(([k, v]) => `${labelByName[k] || k}: ${v}`)
        .join("\n")
      const message = `Solicitud de tour personalizado\n\n${pairs}`

      // Número de WhatsApp: prioriza Sanity, luego lo devuelto por el API, luego fallback
      const waNumber = (general?.whatsappNumbers?.[0] || json?.wa || "573184598635") as string
      // Abrir en nueva pestaña
      try { window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank") } catch {}

      setSubmitStatus("success")
      // opcional: reset después
      setTimeout(() => {
        setFormData({})
        setSubmitStatus("idle")
      }, 5000)
    } catch (err) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              {config?.title || "¿Deseas planificar un tour diferente?"}
            </h2>
            <p className="text-xl text-gray-600">{config?.subtitle || "Hablemos y planea tu próxima aventura"}</p>
          </div>

          <Card className="shadow-xl bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {((config?.fields && config.fields.length > 0)
                    ? config.fields
                    : [
                        { name: "nombre", label: "Nombre", type: "text", required: true, placeholder: "Tu nombre completo" },
                        { name: "correo", label: "Correo Electrónico", type: "email", required: true, placeholder: "tu@email.com" },
                        { name: "mensaje", label: "Mensaje", type: "message", required: true, placeholder: "Cuéntanos sobre el tour que tienes en mente..." },
                      ]
                  ).map((f: any) => {
                    const commonProps = {
                      id: f.name,
                      value: formData[f.name] || "",
                      onChange: (e: any) => handleInputChange(f.name, e.target.value),
                      required: !!f.required,
                      placeholder: f.placeholder || "",
                      className:
                        "mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500",
                    }
                    return (
                      <div key={f.name} className={f.type === "message" ? "md:col-span-2" : undefined}>
                        <Label htmlFor={f.name} className="text-gray-700 font-medium">
                          {f.label}
                          {f.required ? " *" : ""}
                        </Label>
                        {f.type === "message" ? (
                          <Textarea rows={4} {...(commonProps as any)} />
                        ) : (
                          <Input type={f.type === "phone" ? "tel" : f.type === "email" ? "email" : "text"} {...(commonProps as any)} />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 text-lg font-semibold flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {config?.submitLabel || "Enviar solicitud"}
                      </>
                    )}
                  </Button>

                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    ¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
