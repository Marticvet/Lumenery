import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/schemaTypes";
import {deskStructure} from "./src/structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID.");

export default defineConfig({
  name: "lumynery",
  title: "Lumynery Content Studio",
  projectId,
  dataset,
  plugins: [structureTool({structure: deskStructure}), visionTool()],
  schema: {types: schemaTypes},
});
