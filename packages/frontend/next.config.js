/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {};

module.exports = withPWA({
  reactStrinctMode: true,
});
module.exports = createVanillaExtractPlugin(nextConfig);
