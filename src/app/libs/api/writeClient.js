import { createClient } from "@sanity/client";

let permissions = process.env.SANITY_API_WRITE_TOKEN;

if (process.env.NODE_ENV === "development") {
    permissions = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;
}

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: permissions,
  apiVersion: "2023-05-03",
  useCdn: false, // `false` if you want to ensure fresh data
});

export default writeClient;
