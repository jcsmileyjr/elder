import {createClient}  from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_API_DATASET,
    apiVersion: '2023-05-03',
    useCdn: true // `false` if you want to ensure fresh data
})

export default client;