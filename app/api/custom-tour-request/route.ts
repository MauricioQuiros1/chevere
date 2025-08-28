import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sanityClient } from "@/lib/sanity"
import { generalQuery } from "@/lib/queries"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data } = body || {}
    if (!data || typeof data !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
    }

    // Obtener información general desde Sanity (correo y whatsapp)
    const general = await sanityClient.fetch(generalQuery)
    const email: string | undefined = general?.email || process.env.DEFAULT_CONTACT_EMAIL
    const wa: string | undefined = general?.whatsappNumbers?.[0]

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Recipient email is not configured" },
        { status: 500 }
      )
    }

    // Configurar el transporte de Nodemailer con los datos de SMTP de Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER || process.env.SMTP_USER || '',
        pass: process.env.BREVO_SMTP_PASS || process.env.SMTP_PASS || '',
      },
    })

    // Helpers para texto/HTML seguros
    const escapeHtml = (str: unknown) =>
      String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;")

  const omitKeys = (obj: Record<string, any>, keysToOmit: string[]) => {
      const clone: Record<string, any> = {}
      for (const [k, v] of Object.entries(obj)) {
        if (!keysToOmit.includes(k)) clone[k] = v
      }
      return clone
    }

    const makePlainText = (obj: Record<string, any>) => {
      const keys = Object.keys(obj)
      return keys
        .map((k) => `${k}: ${typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : String(obj[k] ?? '')}`)
        .join("\n")
    }

    const formatDateEs = (input?: string | number | Date) => {
      const d = input ? new Date(input) : new Date()
      const months = [
        'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'
      ]
      const day = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day} de ${month} de ${year}`
    }

    const makeHtml = (obj: Record<string, any>, sentAt?: string | number | Date, kind?: string) => {
      const brandPrimary = "#b45309" /* amber-700 */
      const brandBg = "#fff7ed" /* amber-50 */
      const brandBorder = "#fde68a" /* amber-200 */
      const logoUrl = general?.logoUrl as string | undefined
      const title = `Nueva solicitud (${kind || 'Contacto'})`
      const toWa = (num: string) => `https://wa.me/${encodeURIComponent(num.replace(/[^\d]/g, ''))}`
      const rows = Object.entries(obj)
        .map(([k, v]) => {
          const keyLower = k.toLowerCase()
          const rawVal = typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')
          const valHtml = keyLower === 'whatsapp' && rawVal
            ? `<a href="${toWa(rawVal)}" style="color:${brandPrimary};text-decoration:none;">${escapeHtml(rawVal)}</a>`
            : escapeHtml(rawVal)
          return `
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#374151;font-weight:600;text-transform:capitalize;">${escapeHtml(k)}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111827;">${valHtml}</td>
            </tr>`
        })
        .join("")

    // const waHint = wa
    //   ? `<p style="margin:16px 0 0 0;color:#374151;font-size:14px;">También puedes responder por WhatsApp: <a href="https://wa.me/${encodeURIComponent(
    //       wa,
    //     )}" style="color:${brandPrimary};text-decoration:none;">${wa}</a></p>`
    //   : ""

      return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:${brandBg};font-family:ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji';">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brandBg};padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid ${brandBorder};border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
              <tr>
                <td style="background:${brandPrimary};padding:16px 20px;color:#ffffff;">
                  <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      ${logoUrl ? `<td style="padding-right:12px;vertical-align:middle;"><img src="${escapeHtml(logoUrl)}" alt="Logo" height="40" style="display:block;border:none;outline:none;"></td>` : ""}
                      <td style="vertical-align:middle;font-size:18px;font-weight:700;">Chevere Bogotá Travel</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 20px;">
                  <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#111827;">${escapeHtml(title)}</h1>
                  <p style="margin:0 0 16px 0;color:#374151;">Has recibido una nueva solicitud desde el sitio web. Aquí están los detalles:</p>
                  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
                    ${rows}
                  </table>
                  <p style="margin:16px 0 0 0;color:#6b7280;font-size:12px;">Enviado el ${formatDateEs(sentAt)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;border-top:1px solid #eee;">
                  © ${new Date().getFullYear()} Chevere Bogotá Travel. Todos los derechos reservados.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
    }

    // Configurar el correo
    // Remitente distinto al correo destino (notificaciones)
    const requesterEmail: string | undefined =
      typeof (data as any)?.email === 'string' ? (data as any).email :
      typeof (data as any)?.contactEmail === 'string' ? (data as any).contactEmail :
      undefined

    const configuredFrom = process.env.NOTIFY_FROM || process.env.MAIL_FROM || 'no-reply@cheverebogotatravel.com'
    const fromAddress = configuredFrom === email ? 'no-reply@cheverebogotours.com' : configuredFrom

  // Normalizar "Servicio": preferir servicioNombre; si es slug, intentar mantener original; renombrar a "Servicio"
  const src = (data as any)?.source as string | undefined
  const isCustom = src === 'custom-tour-contact'
  const kind = isCustom ? 'Tour personalizado' : 'Contacto'
  const rawServicio = (data as any)?.servicioNombre || (data as any)?.servicio
  const subjectBase = rawServicio || (data as any)?.subject || kind
  const subject = `Nueva solicitud (${kind}): ${subjectBase}`

  // Construir objeto depurado para mostrar: renombrar servicio/servicioNombre -> Servicio, quitar duplicados y campos técnicos
  const base: Record<string, any> = { ...(data as any) }
  const servicioValue = base.servicioNombre || base.servicio
  if (servicioValue !== undefined) base["Servicio"] = servicioValue
  delete base.servicioNombre
  delete base.servicio
  delete base.userAgent
  const cleaned = omitKeys(base, ['source', 'submittedAt'])

  const textBody = `Detalles de la solicitud\n\n${makePlainText(cleaned)}`
  const htmlBody = makeHtml(cleaned, (data as any)?.submittedAt, kind)

    const message = {
      from: fromAddress,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
      replyTo: requesterEmail,
    }

    // Enviar el correo
    const info = await transporter.sendMail(message)

    const accepted = Array.isArray(info.accepted) ? info.accepted : []
    const rejected = Array.isArray(info.rejected) ? info.rejected : []
    const ok = accepted.length > 0 && rejected.length === 0

    // Log para verificar los detalles de la solicitud
  console.log("Custom tour request:", { data, email, wa, accepted, rejected, messageId: info.messageId })

    // Respuesta de éxito
    return NextResponse.json(
      { ok, email, wa, accepted, rejected, messageId: info.messageId },
      { status: ok ? 200 : 502 }
    )
  } catch (e) {
    console.error("Error enviando el correo:", e)
    const message = e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
