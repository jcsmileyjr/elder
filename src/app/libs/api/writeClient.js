import { createClient } from "@sanity/client";

let permissions = process.env.SANITY_API_WRITE_TOKEN;
console.log("permissions: ", process.env.SANITY_API_WRITE_TOKEN);
if (process.env.NODE_ENV === "development") {
    permissions = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;
    console.log("DEV permissions: ", process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN);
} else {
  console.log("PROD permissions");
  console.error("prod permission",process.env.SANITY_API_WRITE_TOKEN)
}

const apiKey = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN
if(!apiKey) {
  console.log("API Key not found in environment variables");
  console.error("API Key not found in environment variables")
} else {
  console.log("Length of the API key is: " + apiKey?.length);
  console.error("Length of the API key is: " + apiKey?.length);
}

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: permissions,
  apiVersion: "2023-05-03",
  useCdn: false, // `false` if you want to ensure fresh data
});

export default writeClient;
