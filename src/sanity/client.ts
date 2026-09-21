import "server-only";
import {createClient} from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_READ_TOKEN?.trim() || undefined;

export const sanityConfigured = /^[a-z0-9-]+$/i.test(projectId) && /^[a-z0-9_-]+$/i.test(dataset);

export const sanityClient = sanityConfigured
  ? createClient({projectId, dataset, apiVersion: "2026-09-01", perspective: "published", useCdn: !token, token})
  : null;
