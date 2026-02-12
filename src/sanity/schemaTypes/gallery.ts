import { defineField, defineType } from "sanity";

export const gallery = defineType({
    name: "gallery",
    title: "Gallery",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Wedding", value: "Wedding" },
                    { title: "Editorial", value: "Editorial" },
                    { title: "Documentary", value: "Documentary" },
                    { title: "Portrait", value: "Portrait" },
                    { title: "Wildlife", value: "Wildlife" },
                    { title: "Commercial", value: "Commercial" },
                    { title: "Architectural", value: "Architectural" },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            description: "e.g. 'Wedding / Celebration' or 'Fashion / Editorial'",
        }),
        defineField({
            name: "cover",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "date",
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
        }),
        defineField({
            name: "services",
            title: "Services",
            type: "string",
            description: "e.g. 'Photography, Creative Direction'",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: "wide",
            title: "Wide Card (spans 2 columns in grid)",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "cover",
        },
    },
    orderings: [
        {
            title: "Date (Newest)",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
    ],
});
