/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce consistent URL format to prevent duplicate content
  trailingSlash: false,

  // Competitor-specific comparison pages were removed (unverifiable claims about other products)
  async redirects() {
    return ["adobe-acrobat", "smallpdf", "ilovepdf", "pdf24"].map((slug) => ({
      source: `/compare/${slug}`,
      destination: "/compare",
      permanent: true,
    }));
  },

  webpack: (config) => {
    // Handle pdfjs-dist canvas dependency
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
};

export default nextConfig;
