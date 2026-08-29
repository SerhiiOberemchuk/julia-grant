import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Технічний домен Vercel → основний, щоб Google не бачив дві копії сайту.
      // Прев'ю-деплої (julia-grant-git-*.vercel.app) під правило не підпадають.
      {
        source: "/:path*",
        has: [{ type: "host", value: "julia-grant.vercel.app" }],
        destination: "https://juliagrant.com.ua/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
