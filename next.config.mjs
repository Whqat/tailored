/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                // allow images from utfs.io
                protocol: "https",
                hostname: "utfs.io",
                pathname: "/**",
            },
            {
                //allow from lh3.googleusercontent.com
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
