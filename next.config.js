/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    config.module.rules[2].oneOf?.forEach(one => {
      if (!`${one.issuer?.and}`.includes("_app")) return;
      one.issuer.and = [path.resolve()];
    });
    return config;
  },
};

module.exports = nextConfig;
