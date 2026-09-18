import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aminvost.ir" }],
        destination: "https://www.aminvost.ir/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "amin-vost.vercel.app" }],
        destination: "https://www.aminvost.ir/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
