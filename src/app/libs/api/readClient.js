import {createClient}  from "@sanity/client";

const readClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-03',
    useCdn: true // `false` if you want to ensure fresh data
})

export default readClient;