import { NextResponse } from "next/server"

// Nota: en una implementación real, aquí se integraría un servicio de correo (SendGrid, Resend, SES, etc.)
// Por ahora, dejaremos un stub que valida entrada y simula éxito.

export async function POST(request: Request) {
  try {
    const { tourName, date } = await request.json()
    if (!tourName || !date) {
      return NextResponse.json({ ok: false, error: "Datos incompletos" }, { status: 400 })
    }

    // TODO: integrar proveedor de correo y enviar notificación con tourName y date
    // Simulación
    console.log("[notify-tour] Solicitud de agenda:", { tourName, date })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Error en el servidor" }, { status: 500 })
  }
}
