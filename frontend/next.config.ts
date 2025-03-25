import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()
const isDevelopment = process.env.NODE_ENV === "development"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: isDevelopment
      ? [
          {
            protocol: "http",
            hostname: "localhost",
            port: "9000",
            pathname: "/app-bucket/**",
          },
          {
            protocol: "http",
            hostname: "minio",
            port: "9000",
            pathname: "/app-bucket/**",
          },
          {
            protocol: "https",
            hostname: "storage.yandexcloud.kz",
            pathname: "/tour-aggregator-static/**",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            pathname: "/**",
          },
        ]
      : [
          {
            protocol: "https",
            hostname: "storage.yandexcloud.kz",
            pathname: "/tour-aggregator-static/**",
          },
        ],
  },
}

export default withNextIntl(nextConfig)
