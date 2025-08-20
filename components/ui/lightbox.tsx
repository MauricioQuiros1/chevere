"use client"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

type LightboxProps = {
  onClose: () => void
  title?: string
  children: React.ReactNode
  alignTop?: boolean // opcional: para mostrar arriba en vez de centrado
}

export function Lightbox({ onClose, title, children, alignTop }: LightboxProps) {
  // Lock scroll del body mientras está abierto
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] p-7 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative max-w-4xl mx-auto ${alignTop ? "mt-6" : "h-full flex items-center"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute ${alignTop ? "-top-10 right-0" : "-top-12 right-0"} text-white hover:text-amber-300 transition duration-300 hover:scale-125 hover:rotate-90`}
          aria-label="Cerrar"
        >
          <X className="w-8 h-8" />
        </button>

        <div className={`${alignTop ? "" : "w-full"} flex justify-center`}>
          {children}
        </div>

        {title ? (
          <p className="text-white text-center mt-4 text-lg font-medium">{title}</p>
        ) : null}
      </div>
    </div>,
    document.body
  )
}
