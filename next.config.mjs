/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.aceternity.com",
      },
      {
        hostname: "files.edgestore.dev",
      },
      { hostname: "utfs.io" },
    ],
  },
};

export default nextConfig;
