export default {
    name: "general",
    title: "Información general",
    type: "document",
    fields: [
        {
            name: "whatsappNumbers",
            title: "Números de WhatsApp",
            type: "array",
            of: [{ type: "string" }],
            description: "Lista de números en formato internacional sin +. Ej: 573054798365",
        },
        {
            name: "slogan",
            title: "Frase / Slogan",
            type: "string",
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "email",
            title: "Correo electrónico",
            type: "string",
        },
        {
            name: "whatsappChannel",
            title: "Canal de WhatsApp",
            type: "string",
            description: "Identificador o enlace del canal principal de WhatsApp (opcional)",
        },
        {
            name: "openingHours",
            title: "Horario de atención",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "days", title: "Días", type: "string" },
                        { name: "hours", title: "Horario", type: "string" },
                    ],
                },
            ],
            description: "Ej: { days: 'Lun-Vie', hours: '08:00 - 18:00' }",
        },
    ],
}
