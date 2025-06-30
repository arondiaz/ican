// /** @type {import('next').NextConfig} */
// const nextConfig = {  images: {
//     domains: ['res.cloudinary.com', "res-console.cloudinary.com"],
//   },};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "res-console.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // cuando en el frontend llames a /api/login
        destination: "https://ican-production.up.railway.app/:path*", // redirige al backend real
      },
    ];
  },
};

export default nextConfig;
