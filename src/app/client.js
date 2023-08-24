import sanityClient  from "@sanity/client";

const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_API_DATASET,
    useCdn: true // `false` if you want to ensure fresh data
})

export default client;