// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'example.com', 
            'cdn.example.com',
            'images.example.com',
            'placeholder.com', 
            'firebasestorage.googleapis.com'
            // You can add more domains as needed
        ],
    },
};

export default nextConfig;
