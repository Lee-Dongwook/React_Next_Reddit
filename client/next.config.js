require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.gravatar.com", "localhost", `${process.env.AWS_ADDRESS}`],
  },
};

module.exports = nextConfig;
