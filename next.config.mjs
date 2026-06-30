const nextConfig = {
  images:{
    qualities: [75,80,90,100],
    remotePatterns:[
      { protocol:"https", hostname:"res.cloudinary.com" },
      { protocol:"https", hostname:"flagcdn.com" },
    ],
  },
  reactCompiler: true,
  reactStrictMode: false,
};

export default nextConfig;
