import {defineField, defineType} from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "object",
  fields: [
    defineField({name: "image", title: "Image", type: "image", options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: "alt", title: "Alternative text", description: "Describe the image for visitors who cannot see it.", type: "localizedString", validation: (rule) => rule.required()}),
    defineField({name: "caption", title: "Optional caption", type: "localizedString"}),
  ],
  preview: {select: {title: "alt.de", media: "image"}},
});
