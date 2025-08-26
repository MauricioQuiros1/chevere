export default {
    name: "hero",
    title: "Sección Principal",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Título",
            type: "string",
            description: "Título principal que aparece en el Hero",
        },
        {
            name: "whatsappText",
            title: "Texto botón WhatsApp",
            type: "string",
            description: "Texto que mostrará el botón de reserva por WhatsApp",
        },
        {
            name: "toursButtonText",
            title: "Texto botón Tours",
            type: "string",
            description: "Texto que mostrará el botón para ver tours",
        },
        {
            name: "whatsappNumber",
            title: "Número WhatsApp",
            type: "string",
            description: "Número (formato internacional, sin +). Ej: 573054798365",
        },
        {
            name: "desktopImages",
            title: "Imágenes (Escritorio)",
            description: "Imágenes a mostrar en pantallas de escritorio",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
                        { name: "fallback", title: "URL alternativa", type: "url" },
                        { name: "alt", title: "Texto alternativo", type: "string" },
                    ],
                },
            ],
        },
        {
            name: "mobileImages",
            title: "Imágenes (Móvil)",
            description: "Imágenes a mostrar en pantallas móviles",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
                        { name: "fallback", title: "URL alternativa", type: "url" },
                        { name: "alt", title: "Texto alternativo", type: "string" },
                    ],
                },
            ],
        },
    ],
}