"use client"

import { useEffect, useMemo, useState } from "react"
import { CalendarDays, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TourScheduleProps {
  tourName: string
  defaultMessageNumber?: string
}

export function TourSchedule({ tourName, defaultMessageNumber = "573054798365" }: TourScheduleProps) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // Mostrar el botón solo después de cierto scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const waText = useMemo(() => {
    const base = `Hola, quiero agendar el tour "${tourName}"`
    const withDate = date ? `${base} para el día ${date}` : base
    return encodeURIComponent(withDate)
  }, [tourName, date])

  const handleReserve = async () => {
    setLoading(true)
    try {
      // 1) Notificar por correo al backend
      await fetch("/api/notify-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourName, date }),
      })
    } catch (_) {
      // ignorar errores de notificación para no bloquear la UX
    } finally {
      setLoading(false)
      // 2) Redirigir a WhatsApp con el mensaje preparado
      window.open(`https://wa.me/${defaultMessageNumber}?text=${waText}`, "_blank")
    }
  }

  if (!visible) return null

  return (
    <div className="mt-4">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      >
        <CalendarDays className="h-4 w-4" />
        Agendar
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </Button>

      {open && (
        <div className="mt-3 p-4 bg-white/90 border border-amber-100 rounded-lg shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Selecciona la fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReserve}
                disabled={!date || loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Reservar
                  </span>
                ) : (
                  "Reservar"
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Te redireccionaremos a WhatsApp. Si tienes alguna duda, háznosla saber antes de reservar el tour.
          </p>
        </div>
      )}
    </div>
  )
}
