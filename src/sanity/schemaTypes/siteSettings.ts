import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "studioName",
            title: "Studio Name",
            type: "string",
            initialValue: "OYANGE",
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
            initialValue: "Visual Alchemy",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            initialValue: "Silent Narratives.",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
        }),
        defineField({
            name: "email",
            title: "Contact Email",
            type: "string",
            initialValue: "martinaquila5@gmail.com",
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
            initialValue: "+254 717 393 576",
        }),
        defineField({
            name: "location",
            title: "Studio Location",
            type: "string",
            initialValue: "Westlands, Nairobi",
        }),
        defineField({
            name: "instagram",
            title: "Instagram URL",
            type: "url",
        }),
        defineField({
            name: "behance",
            title: "Behance URL",
            type: "url",
        }),
        defineField({
            name: "whatsapp",
            title: "WhatsApp Link",
            type: "url",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});
