export default {
  name: "tour",
  title: "Tours",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre del tour",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "brief",
      title: "Breve descripción (card)",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: "hours",
      title: "Duración (horas)",
      type: "string",
      description: "Ej: 8 horas",
    },
    {
      name: "people",
      title: "Cantidad de personas",
      type: "string",
      description: "Ej: Máximo 4 personas / Grupos pequeños",
    },
    {
      name: "location",
      title: "Ubicación",
      type: "string",
    },
    {
      name: "priceFromUSD",
      title: "Precio desde (USD)",
      type: "number",
      description: "Precio desde por persona en dólares",
    },
    {
      name: "introTitle",
      title: "Título introducción",
      type: "string",
    },
    {
      name: "introDescription",
      title: "Descripción introducción",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
          ],
          lists: [{ title: "Viñetas", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
        },
      ],
      description: "Permite negritas y saltos de párrafo",
    },
    {
      name: "image",
      title: "Imagen principal (card/hero)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "fallback",
      title: "URL alternativa de imagen",
      type: "url",
    },
    {
      name: "gallery",
      title: "Galería de imágenes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
            { name: "alt", title: "Texto alternativo", type: "string" },
          ],
        },
      ],
    },
    {
      name: "includes",
      title: "¿Qué incluye el tour?",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "recommendations",
      title: "Recomendaciones para tu visita",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "pricingTiers",
      title: "Precios por cantidad de personas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "people", title: "Personas", type: "number" },
            { name: "priceUSD", title: "Precio (USD) por persona", type: "number" },
            { name: "popular", title: "Destacado (Mejor precio)", type: "boolean" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "image",
    },
  },
}
