/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'baymoon.s3.amazonaws.com'], // Add 'localhost' as an allowed domain
    },
}

module.exports = nextConfig
