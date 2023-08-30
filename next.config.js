/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SANITY_API_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
        SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    }
};

module.exports = nextConfig;
