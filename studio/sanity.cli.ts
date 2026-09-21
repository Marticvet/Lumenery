import {defineCliConfig} from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID. Copy studio/.env.example to studio/.env.local after creating the Sanity project.");
}

export default defineCliConfig({
  api: {projectId, dataset},
  deployment: {appId: "q6506qf5zzdt0by6ptg00lk3", autoUpdates: true},
});
