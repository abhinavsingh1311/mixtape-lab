const nextConfig = {
    images: {
        domains: ['mixtape-lab.vercel.app'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glb|gltf|hdr)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/assets/[hash][ext]',
            },
        });
        return config;
    },
};

export default nextConfig;