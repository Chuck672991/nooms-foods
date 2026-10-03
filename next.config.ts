import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent folder makes Next guess the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Next 16 requires every non-default `quality` to be allow-listed.
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
