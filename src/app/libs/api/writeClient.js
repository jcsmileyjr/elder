import {createClient}  from "@sanity/client";

const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
    apiVersion: '2023-05-03',
    useCdn: false // `false` if you want to ensure fresh data
})

export default writeClient;