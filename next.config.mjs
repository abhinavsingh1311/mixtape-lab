// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mixtape-lab.vercel.app'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/models',
                        outputPath: 'static/models/',
                        name: '[name].[hash].[ext]',
                    },
                },
                {
                    loader: 'webpack-gltf-loader',
                    options: {
                        publicPath: '/_next/static/models',
                    }
                }
            ]
        });
        return config;
    },
};

export default nextConfig;