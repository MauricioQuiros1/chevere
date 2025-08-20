import type { Metadata } from "next"
import Traslado1ClientPage from "./Traslado1ClientPage"

export const metadata: Metadata = {
  title: "Traslado Aeropuerto El Dorado - Chevere Bogotá Tours",
  description:
    "Traslado seguro y puntual desde y hacia el Aeropuerto El Dorado. Servicio 24/7, tarifas fijas y monitoreo de vuelos incluido.",
  keywords: "traslado aeropuerto Bogotá, El Dorado, transporte aeropuerto, servicio 24 horas",
}

export default function Traslado1Page() {
  return <Traslado1ClientPage />
}
