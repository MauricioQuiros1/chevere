export default {
  name: "aboutPage",
  title: "Página: Nosotros",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Título (Hero)", type: "string", initialValue: "Conoce Nuestro Equipo" },
    {
      name: "heroSubtitle",
      title: "Subtítulo (Hero)",
      type: "text",
      rows: 3,
      initialValue: "Somos un equipo apasionado por mostrar la belleza y riqueza cultural de Colombia",
    },
    {
      name: "founder",
      title: "Fundador (Hero)",
      type: "object",
      fields: [
        { name: "name", title: "Nombre", type: "string", initialValue: "Mauricio Quiros" },
        { name: "role", title: "Cargo", type: "string", initialValue: "Fundador y Director" },
        {
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 4,
          initialValue:
            "Con más de 15 años de experiencia en turismo colombiano, Mauricio fundó Chevere Bogotá Travel para ofrecer experiencias auténticas que conecten a las personas con la esencia de Colombia.",
        },
        { name: "image", title: "Imagen (asset)", type: "image", options: { hotspot: true } },
        { name: "imageUrl", title: "Imagen (URL externa)", type: "url" },
        {
          name: "badges",
          title: "Insignias",
          type: "array",
          of: [{ type: "string" }],
          initialValue: ["15+ años experiencia", "Guía certificado", "Experto local"],
        },
      ],
    },
    {
      name: "stats",
      title: "Estadísticas (cuadros)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icono", type: "string", options: { list: ["award", "users", "mapPin", "clock"] } },
            { name: "value", title: "Valor", type: "string" },
            { name: "label", title: "Etiqueta", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { icon: "award", value: "15+", label: "Años de Experiencia" },
        { icon: "users", value: "500+", label: "Clientes Satisfechos" },
        { icon: "mapPin", value: "20+", label: "Destinos Cubiertos" },
        { icon: "clock", value: "24/7", label: "Atención al Cliente" },
      ],
    },
    { name: "teamTitle", title: "Título (Nuestro Compromiso)", type: "string", initialValue: "Nuestro Compromiso" },
    {
      name: "teamSubtitle",
      title: "Descripción (Nuestro Compromiso)",
      type: "text",
      rows: 3,
      initialValue: "Cada miembro de nuestro equipo comparte la pasión por brindar experiencias excepcionales",
    },
    {
      name: "teamCards",
      title: "Tarjetas de Compromiso",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icono", type: "string", options: { list: ["car", "shield", "heart", "star", "mapPin", "users"] } },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      initialValue: [
        { icon: "car", title: "Conductor Profesional", description: "Nuestro conductor es un experto local con licencia vigente y amplio conocimiento de las rutas turísticas más seguras y pintorescas de Colombia." },
        { icon: "shield", title: "Seguridad Garantizada", description: "Nuestro vehículo cuenta con seguro completo, mantenimiento regular y sistemas de seguridad actualizados para tu tranquilidad." },
        { icon: "heart", title: "Servicio Personalizado", description: "Adaptamos cada tour a tus intereses y necesidades, creando experiencias únicas que superan tus expectativas en cada viaje." },
        { icon: "star", title: "Experiencia Auténtica", description: "Te conectamos con la verdadera esencia de Colombia a través de lugares, sabores y tradiciones que solo los locales conocen." },
      ],
    },
    {
      name: "founderHighlight",
      title: "Bloque Fundador (Destacado)",
      type: "object",
      fields: [
        { name: "title", title: "Título", type: "string", initialValue: "Fundador y Director" },
        { name: "subtitle", title: "Subtítulo", type: "string", initialValue: "Conoce a la persona que hace posible tus mejores experiencias" },
        { name: "name", title: "Nombre", type: "string", initialValue: "Mauricio Quiros" },
        { name: "role", title: "Cargo", type: "string", initialValue: "Fundador y Director" },
        { name: "description", title: "Descripción", type: "text", rows: 4, initialValue: "Con más de 10 años de experiencia en turismo, Mauricio fundó Chevere Bogotá Travel con la misión de mostrar la verdadera esencia de Colombia. Su pasión por la hospitalidad y conocimiento profundo del país garantizan experiencias auténticas e inolvidables." },
        { name: "image", title: "Imagen (asset)", type: "image", options: { hotspot: true } },
        { name: "imageUrl", title: "Imagen (URL externa)", type: "url" },
      ],
    },
    { name: "valuesTitle", title: "Título (Nuestros Valores)", type: "string", initialValue: "Nuestros Valores" },
    {
      name: "valuesSubtitle",
      title: "Descripción (Nuestros Valores)",
      type: "text",
      rows: 3,
      initialValue:
        "Los principios que nos guían en cada servicio y que nos han convertido en la opción preferida para descubrir Colombia.",
    },
    {
      name: "values",
      title: "Valores",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icono", type: "string", options: { list: ["heart", "clock", "shield", "star", "users", "mapPin"] } },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
            { name: "colorClass", title: "Clases de color (Tailwind)", type: "string" },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    },
  ],
}
