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
        // Handle glb/gltf files
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/models/[hash][ext]'
            }
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            'three': require.resolve('./three-patch.js')
        };

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
