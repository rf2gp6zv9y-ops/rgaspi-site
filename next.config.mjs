/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to all pages in the app
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Allow any site to embed this page in an <iframe>
            value: "frame-ancestors *;",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // NOTE: X-Frame-Options is legacy and does not support a wildcard;
          // if your platform injects X-Frame-Options: SAMEORIGIN you may need
          // to remove/override it via platform settings.
        ],
      },
    ];
  },
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: ['10.100.104.111', '10.100.121.237'],
};

export default nextConfig;
