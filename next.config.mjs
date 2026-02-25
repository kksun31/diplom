

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
        {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // <--- ВОТ ЭТО ВАЖНО ДЛЯ ГУГЛ-АККАУНТОВ
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

