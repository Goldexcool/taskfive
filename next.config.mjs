// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'example.com',   // Add your own domains here
            'cdn.example.com',
            'images.example.com',
            'placeholder.com', // Add any other domains you use
            // You can add more domains as needed
        ],
    },
};

export default nextConfig;
