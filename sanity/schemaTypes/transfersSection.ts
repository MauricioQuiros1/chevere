export default {
  name: "transfersSection",
  title: "Traslados",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", initialValue: "Servicios de Traslados" },
    { name: "subtitle", title: "Subtítulo", type: "string", initialValue: "Conectamos Bogotá con comodidad y seguridad. Desde el aeropuerto hasta servicios por horas para tus necesidades." },
    {
      name: "airportServices",
      title: "Servicios Aeropuerto",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "string" },
            { name: "price", title: "Precio", type: "string" },
            { name: "duration", title: "Duración", type: "string" },
            { name: "capacity", title: "Capacidad", type: "string" },
            { name: "image", title: "Imagen (asset)", type: "image", options: { hotspot: true } },
            { name: "imageUrl", title: "Imagen (URL externa)", type: "url" },
            { name: "features", title: "Características", type: "array", of: [{ type: "string" }] },
          ],
          preview: { select: { title: "title", subtitle: "price" } },
        },
      ],
    },
    {
      name: "hourlyServices",
      title: "Servicios por Horas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "string" },
            { name: "price", title: "Precio", type: "string" },
            { name: "minHours", title: "Mínimo de horas", type: "string" },
            { name: "capacity", title: "Capacidad", type: "string" },
            { name: "image", title: "Imagen (asset)", type: "image", options: { hotspot: true } },
            { name: "imageUrl", title: "Imagen (URL externa)", type: "url" },
            { name: "features", title: "Características", type: "array", of: [{ type: "string" }] },
          ],
          preview: { select: { title: "title", subtitle: "price" } },
        },
      ],
    },
  ],
}
