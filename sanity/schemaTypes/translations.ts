export default {
  name: "translations",
  title: "Traducciones (Prueba)",
  type: "document",
  fields: [
    {
      name: "locale",
      title: "Locale",
      type: "string",
      description: "Código de idioma (ej.: es, en)",
      initialValue: "es",
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: "Español", value: "es" },
          { title: "Inglés", value: "en" },
        ],
        layout: "radio",
      },
    },
    {
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        { name: "homeLabel", title: "Inicio", type: "string" },
        { name: "aboutLabel", title: "Nosotros", type: "string" },
        { name: "toursLabel", title: "Tours", type: "string" },
        { name: "transfersLabel", title: "Traslados", type: "string" },
        { name: "contactLabel", title: "Contacto", type: "string" },
  { name: "whatsappCtaText", title: "Texto botón WhatsApp (Header)", type: "string" },
      ],
    },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "title", title: "Título", type: "string" },
  { name: "whatsappText", title: "Texto botón WhatsApp (Reservar)", type: "string" },
  { name: "toursButtonText", title: "Texto botón Tours (secundario)", type: "string" },
      ],
    },
    {
      name: "toursSection",
      title: "Sección Tours",
      type: "object",
      fields: [
        { name: "title", title: "Título sección", type: "string" },
        { name: "emptyMessage", title: "Mensaje sin tours", type: "string" },
      ],
    },
    {
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        { name: "rightsText", title: "Texto de derechos", type: "string" },
      ],
    },
    {
      name: "common",
      title: "Comunes",
      type: "object",
      fields: [
        { name: "reserveWhatsAppLabel", title: "Reservar por WhatsApp", type: "string" },
        { name: "viewDetailsLabel", title: "Ver detalle", type: "string" },
        { name: "pricesTitle", title: "Título precios", type: "string" },
        { name: "bestPriceBadge", title: "Badge mejor precio", type: "string" },
      ],
    },
  ],
  preview: {
    select: { title: "locale" },
    prepare({ title }: any) {
      return { title: `Traducciones (${title || "sin locale"})` }
    },
  },
}
