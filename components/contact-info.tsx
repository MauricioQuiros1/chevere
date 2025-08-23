import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-3 text-gray-700">
            <Clock className="h-5 w-5" />
            <span>Contáctanos cuando prefieras. Horario configurable en CMS General.</span>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
