import {defineArrayMember, defineField, defineType} from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  groups: [
    {name: "content", title: "Product"},
    {name: "media", title: "Photos"},
    {name: "details", title: "Details"},
    {name: "seo", title: "Search & sharing"},
  ],
  fields: [
    defineField({name: "active", title: "Visible on the website", type: "boolean", initialValue: true, group: "content"}),
    defineField({name: "featured", title: "Featured product", type: "boolean", initialValue: false, group: "content"}),
    defineField({name: "order", title: "Display order", type: "number", initialValue: 100, validation: (rule) => rule.integer(), group: "content"}),
    defineField({name: "title", title: "Product name", type: "localizedString", validation: (rule) => rule.required(), group: "content"}),
    defineField({name: "slug", title: "URL name", type: "slug", options: {source: "title.de", maxLength: 96}, validation: (rule) => rule.required(), group: "content"}),
    defineField({name: "shortDescription", title: "Short description", description: "Used on catalog cards.", type: "localizedText", group: "content"}),
    defineField({name: "description", title: "Full description", type: "localizedText", validation: (rule) => rule.required(), group: "content"}),
    defineField({name: "price", title: "Price in EUR", type: "number", validation: (rule) => rule.required().min(0).precision(2), group: "content"}),
    defineField({name: "startingAt", title: "Show price as ‘from’", type: "boolean", initialValue: false, group: "content"}),
    defineField({name: "priceUnit", title: "Price unit", type: "string", options: {list: [{title: "Per piece", value: "piece"}, {title: "Per set", value: "set"}, {title: "Per project", value: "project"}]}, initialValue: "piece", group: "content"}),
    defineField({name: "categories", title: "Categories", type: "array", of: [defineArrayMember({type: "reference", to: [{type: "category"}]})], validation: (rule) => rule.unique(), group: "content"}),
    defineField({name: "coverImage", title: "Catalog image", type: "galleryImage", validation: (rule) => rule.required(), group: "media"}),
    defineField({name: "gallery", title: "Gallery", description: "Drag the images to change their order.", type: "array", of: [defineArrayMember({type: "galleryImage"})], validation: (rule) => rule.max(20), group: "media"}),
    defineField({name: "features", title: "Highlights", type: "array", of: [defineArrayMember({type: "localizedString"})], validation: (rule) => rule.max(10), group: "details"}),
    defineField({name: "included", title: "What is included", type: "array", of: [defineArrayMember({type: "localizedString"})], validation: (rule) => rule.max(12), group: "details"}),
    defineField({name: "seoTitle", title: "Optional page title", type: "localizedString", group: "seo"}),
    defineField({name: "seoDescription", title: "Optional search description", type: "localizedText", group: "seo"}),
  ],
  preview: {
    select: {title: "title.de", price: "price", media: "coverImage.image", active: "active"},
    prepare: ({title, price, media, active}) => ({title: title || "Untitled product", subtitle: `${active === false ? "Hidden · " : ""}${typeof price === "number" ? `${price.toFixed(2)} €` : "No price"}`, media}),
  },
  orderings: [
    {title: "Display order", name: "orderAsc", by: [{field: "order", direction: "asc"}]},
    {title: "Name", name: "titleAsc", by: [{field: "title.de", direction: "asc"}]},
    {title: "Price: low to high", name: "priceAsc", by: [{field: "price", direction: "asc"}]},
  ],
});
