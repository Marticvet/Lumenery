import type {StructureResolver} from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Lumynery")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
