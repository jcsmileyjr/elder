/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public', 
    register: true,
    skipWaiting: true,
})

const nextConfig = {
    env: {
        NEXT_PUBLIC_SANITY_API_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
        SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    }
};

//module.exports = nextConfig;
module.exports = withPWA(
    nextConfig
)
