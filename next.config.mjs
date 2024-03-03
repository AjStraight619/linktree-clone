/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'link-tree-clone-local.s3.us-west-1.amazonaws.com',
        
          
          },
        ],
      },
};

export default nextConfig;
