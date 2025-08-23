"use client"

import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, ChevronUp, Loader2 } from "lucide-react"

interface TourScheduleFloatProps {
  tourName: string
  defaultMessageNumber?: string
}

export function TourScheduleFloat({ tourName, defaultMessageNumber = "573054798365" }: TourScheduleFloatProps) {
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nextShow = window.scrollY > 300
      setShow((prev) => {
        if (prev !== nextShow) {
          if (nextShow) {
            setExiting(false)
            setRender(true)
          } else {
            setExiting(true)
            setTimeout(() => setRender(false), 300)
          }
        }
        return nextShow
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // sin mediciones ni tamaños fijos

  const waText = useMemo(() => {
    const base = `Hola, quiero agendar el tour "${tourName}"`
    if (!selectedDate) return encodeURIComponent(base)
    const human = selectedDate.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })
    return encodeURIComponent(`${base} para el día ${human}`)
  }, [tourName, selectedDate])

  const handleReserve = async () => {
    if (!selectedDate) return
    setLoading(true)
    try {
      const dateIso = selectedDate.toISOString().slice(0, 10)
      await fetch("/api/notify-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourName, date: dateIso }),
      })
    } catch (_) {
      // no-op
    } finally {
      setLoading(false)
      window.open(`https://wa.me/${defaultMessageNumber}?text=${waText}`, "_blank")
    }
  }

  if (!mounted || !render) return null

  const content = (
    <div
      className={
        "fixed bottom-8 right-8 z-[9999] " +
        (exiting
          ? "animate-out fade-out slide-out-to-bottom-2 duration-300"
          : "animate-fade-in-up")
      }
    >
      {/* Botón flotante de Agendar */}
      <div className="flex flex-col items-end gap-3">
        {open && (
          <div className="inline-block bg-white/95 border border-amber-100 rounded-xl shadow-lg p-3 animate-in fade-in slide-in-from-bottom-2 max-w-[78%] md:max-w-[45%]">
            <label className="block text-xs text-gray-600 mb-2">Selecciona la fecha</label>
            <div className="inline-block rounded-md border border-gray-200 bg-white">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                showOutsideDays
                className="p-2"
                
                
              />
            </div>

            <p className="text-xs text-gray-600 mt-3">
              Te redireccionaremos a WhatsApp. Si tienes alguna duda, háznosla saber antes de reservar el tour.
            </p>

            <div className="mt-3 flex justify-end">
              <Button
                onClick={handleReserve}
                disabled={!selectedDate || loading}
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
        )}

        <Button
          onClick={() => setOpen((v) => !v)}
          className="bg-amber-600 hover:bg-amber-700 hover:shadow-xl text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-250 hover:scale-105"
          aria-label="Agendar tour"
        >
          <CalendarDays className="h-5 w-5" />
          <span>Agendar</span>
          <ChevronUp className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
        </Button>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
