/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["i.ibb.co", "tecdn.b-cdn.net", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
