/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        domains:['res.cloudinary.com', 'gravatar.com','lh3.googleusercontent.com']
    }
};

export default nextConfig;
