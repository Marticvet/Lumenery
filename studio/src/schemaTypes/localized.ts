import {defineField, defineType} from "sanity";

const languageFields = (type: "string" | "text") => [
  defineField({name: "de", title: "Deutsch", type, validation: (rule) => rule.required()}),
  defineField({name: "en", title: "English", type}),
  defineField({name: "bg", title: "Български", type}),
];

export const localizedString = defineType({
  name: "localizedString",
  title: "Translated short text",
  type: "object",
  fields: languageFields("string"),
  options: {columns: 1},
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Translated description",
  type: "object",
  fields: languageFields("text"),
  options: {columns: 1},
});
