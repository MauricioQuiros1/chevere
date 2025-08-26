export default {
  name: "testimonialsSection",
  title: "Testimonios",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", initialValue: "Experiencias Reales Que Inspiran Confianza" },
    {
      name: "testimonials",
      title: "Testimonios",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nombre", type: "string" },
            { name: "location", title: "Ubicación", type: "string" },
            { name: "rating", title: "Calificación (1-5)", type: "number", validation: (Rule: any) => Rule.min(1).max(5) },
            { name: "text", title: "Texto", type: "text" },
            { name: "image", title: "Imagen (asset)", type: "image", options: { hotspot: true } },
            { name: "imageUrl", title: "Imagen (URL externa)", type: "url" },
            { name: "fallbackImage", title: "Imagen fallback (asset)", type: "image", options: { hotspot: true } },
            { name: "fallbackUrl", title: "Imagen fallback (URL externa)", type: "url" },
          ],
          preview: { select: { title: "name", subtitle: "location" } },
        },
      ],
    },
  ],
}
