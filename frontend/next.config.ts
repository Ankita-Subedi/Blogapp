import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**", // Allow images inside /uploads
      },
    ],
  },
};

export default nextConfig;

// <img
//   src={previewImage}
//   alt="Preview"
//   className="w-32 h-32 object-cover rounded-md mt-2"
// />;
