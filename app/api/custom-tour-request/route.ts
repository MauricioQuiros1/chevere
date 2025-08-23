import { NextResponse } from "next/server"
import { sanityClient } from "@/lib/sanity"
import { generalQuery } from "@/lib/queries"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data } = body || {}
    if (!data || typeof data !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
    }

    const general = await sanityClient.fetch(generalQuery)
    const email: string | undefined = general?.email
    const wa: string | undefined = general?.whatsappNumbers?.[0]

    // Aquí integrar proveedor real (Resend/SendGrid/SES). Por ahora simulamos éxito.
    console.log("Custom tour request:", { data, email, wa })

    return NextResponse.json({ ok: true, email, wa })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
