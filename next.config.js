/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['image.tmdb.org'],
    },
    experimental: {
        images: {
            unoptimized: true,
        },
    },
    async rewrites() {
        return [
        {
            source: '/tv/season',
            destination: '/episodes',
        },
        {
            source: '/info',
            destination: '/info',
        },
        {
            source: '/cast',
            destination: '/cast',
        },
        {
            source: '/movies/:genre/:page',
            destination: '/movies',
        },
        {
            source: '/series/:genre/:page',
            destination: '/series',
        },
        {
            source: '/upcoming/:page',
            destination: '/upcoming',
        },
        ];
    },
};

module.exports = nextConfig;