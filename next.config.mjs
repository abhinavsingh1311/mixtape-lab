/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    output: 'standalone',
    images: {
        unoptimized: true
    },
    webpack: (config) => {
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

export default nextConfig;