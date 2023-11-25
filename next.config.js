/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  swcMinify: false,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/signin",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
