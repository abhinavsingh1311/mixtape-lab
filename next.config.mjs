// next.config.js
const nextConfig = {
    images: {
        domains: ['https://mixtape-lab.vercel.app/'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/assets',
                    outputPath: 'static/assets',
                },
            },
        });
        return config;
    },
};

export default nextConfig;