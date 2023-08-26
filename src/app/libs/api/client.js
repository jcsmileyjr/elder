import {createClient}  from "@sanity/client";

let envProjectId, envDataset, envToken;
if (process.env.NODE_ENV === 'development') {
    envProjectId = process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID;
    envDataset = process.env.NEXT_PUBLIC_SANITY_API_DATASET;
    envToken = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;
}else {
    envProjectId = SANITY_API_PROJECT_ID;
    envDataset = SANITY_API_DATASET;
    token = SANITY_API_WRITE_TOKEN;
}

const client = createClient({
    projectId: envProjectId,
    dataset: envDataset,
    token: envToken,
    apiVersion: '2023-05-03',
    useCdn: true // `false` if you want to ensure fresh data
})

export default client;