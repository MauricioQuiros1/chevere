export default {
  name: "customTourForm",
  title: "Formulario: Tour personalizado",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      initialValue: "¿Deseas planificar un tour diferente?",
    },
    {
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      initialValue: "Hablemos y planea tu próxima aventura",
    },
    {
      name: "fields",
      title: "Campos del formulario",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nombre de campo (clave)", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "label", title: "Etiqueta", type: "string", validation: (Rule: any) => Rule.required() },
            {
              name: "type",
              title: "Tipo",
              type: "string",
              options: {
                list: [
                  { title: "Texto", value: "text" },
                  { title: "Mensaje", value: "message" },
                  { title: "Teléfono", value: "phone" },
                  { title: "Correo", value: "email" },
                ],
                layout: "radio",
              },
              validation: (Rule: any) => Rule.required(),
            },
            { name: "placeholder", title: "Placeholder", type: "string" },
            { name: "required", title: "Requerido", type: "boolean", initialValue: true },
          ],
          preview: {
            select: { title: "label", subtitle: "type" },
          },
        },
      ],
      options: { sortable: true },
      validation: (Rule: any) => Rule.min(1).warning("Agrega al menos un campo"),
    },
    {
      name: "submitLabel",
      title: "Texto del botón enviar",
      type: "string",
      initialValue: "Enviar solicitud",
    },
  ],
}
