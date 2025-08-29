import Image from "next/image"
import { sanityClient } from "@/lib/sanity"
import { generalQuery } from "@/lib/queries"

export async function ColombianSlogan() {
  const general = await sanityClient.fetch(generalQuery)
  const logoUrl: string | undefined = general?.logoUrl

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 via-blue-100 to-red-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-center">
          <div className="shrink-0">
            <Image
              src={logoUrl || "/placeholder-logo.png"}
              alt="Chevere Bogotá Travel"
              width={56}
              height={56}
              className="shadow-none rounded-md md:w-22 md:h-22 w-14 h-14 object-contain"
              priority
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold">
            <span className="text-yellow-300">¡Que</span> <span className="text-blue-600">chevere es</span>{" "}
            <span className="text-red-600">Colombia!</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
