"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, MessageCircle } from "lucide-react"

export function CustomTourContact() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
    honeypot: "", // Anti-spam honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Anti-spam check
    if (formData.honeypot) {
      return
    }

    // Validation
    if (!formData.nombre.trim()) {
      alert("Por favor ingresa tu nombre")
      return
    }
    if (!formData.correo.trim() || !validateEmail(formData.correo)) {
      alert("Por favor ingresa un correo electrónico válido")
      return
    }
    if (!formData.mensaje.trim()) {
      alert("Por favor ingresa tu mensaje")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate email sending (replace with actual email service)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus("success")
      setShowWhatsAppButton(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({ nombre: "", correo: "", mensaje: "", honeypot: "" })
        setSubmitStatus("idle")
        setShowWhatsAppButton(false)
      }, 5000)
    } catch (error) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppSend = () => {
    const message = `Solicitud de tour personalizado

Nombre: ${formData.nombre}
Correo: ${formData.correo}
Mensaje: ${formData.mensaje}`

    window.open(`https://wa.me/573054798365?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              ¿Deseas planificar un tour diferente?
            </h2>
            <p className="text-xl text-gray-600">Hablemos y planea tu próxima aventura</p>
          </div>

          <Card className="shadow-xl bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => handleInputChange("honeypot", e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombre" className="text-gray-700 font-medium">
                      Nombre *
                    </Label>
                    <Input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      required
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="correo" className="text-gray-700 font-medium">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value)}
                      required
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensaje" className="text-gray-700 font-medium">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => handleInputChange("mensaje", e.target.value)}
                    required
                    rows={4}
                    className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Cuéntanos sobre el tour que tienes en mente..."
                  />
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
                        Enviar solicitud
                      </>
                    )}
                  </Button>

                  {showWhatsAppButton && (
                    <Button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold flex-1"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Enviar por WhatsApp
                    </Button>
                  )}
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
