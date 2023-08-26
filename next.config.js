/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SANITY_API_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
    }
};

module.exports = nextConfig;
