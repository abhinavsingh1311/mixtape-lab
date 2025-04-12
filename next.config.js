/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
    output: 'standalone',
    images: {
        unoptimized: true
    },
    webpack: (config) => {
        // Handle glb/gltf files
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/models/[hash][ext]'
            }
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/models/:path*',
                destination: '/static/models/:path*'
            }
        ];
    }
};

module.exports = nextConfig;