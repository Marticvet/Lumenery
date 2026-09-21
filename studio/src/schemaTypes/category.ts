import {defineField, defineType} from "sanity";

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({name: "title", title: "Name", type: "localizedString", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "URL name", type: "slug", options: {source: "title.de", maxLength: 80}, validation: (rule) => rule.required()}),
    defineField({name: "order", title: "Display order", type: "number", initialValue: 100, validation: (rule) => rule.integer()}),
  ],
  preview: {select: {title: "title.de", subtitle: "slug.current"}},
  orderings: [{title: "Display order", name: "orderAsc", by: [{field: "order", direction: "asc"}]}],
});
