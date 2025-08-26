export default {
  name: "contactPage",
  title: "Contacto",
  type: "document",
  fields: [
    { name: "pageTitle", title: "Título de la página", type: "string", initialValue: "Contacto" },
    {
      name: "pageDescription",
      title: "Descripción de la página",
      type: "text",
      rows: 3,
      initialValue:
        "¿Listo para vivir una experiencia única en Bogotá? Contáctanos y planifiquemos juntos tu próxima aventura.",
    },
    {
      name: "form",
      title: "Formulario de contacto",
      type: "object",
      fields: [
        { name: "title", title: "Título del formulario", type: "string", initialValue: "Envíanos un Mensaje" },
        { name: "submitLabel", title: "Texto del botón Enviar", type: "string", initialValue: "Enviar Mensaje" },
        {
          name: "fields",
          title: "Campos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Nombre interno", type: "string" },
                { name: "label", title: "Etiqueta", type: "string" },
                {
                  name: "type",
                  title: "Tipo de campo",
                  type: "string",
                  options: {
                    list: ["text", "phone", "email", "tour", "date", "people", "message"],
                    layout: "radio",
                  },
                },
                { name: "placeholder", title: "Placeholder", type: "string" },
                { name: "required", title: "Requerido", type: "boolean", initialValue: false },
              ],
              preview: { select: { title: "label", subtitle: "type" } },
            },
          ],
        },
      ],
    },
    {
      name: "directContact",
      title: "Tarjeta: Contacto directo",
      type: "object",
      fields: [
        { name: "title", title: "Título", type: "string", initialValue: "Contacto Directo" },
        {
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
          initialValue: "Contáctanos por WhatsApp para atención inmediata y personalizada.",
        },
        { name: "buttonLabel", title: "Texto del botón", type: "string", initialValue: "WhatsApp" },
      ],
    },
  ],
}
