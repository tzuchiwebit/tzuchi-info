/** @type {import('next').NextConfig} */

const nextConfig = {
    // output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

if (process.env.ENV_NAME === "development") {
  // nextConfig.output = 'export'
}

module.exports = nextConfig
