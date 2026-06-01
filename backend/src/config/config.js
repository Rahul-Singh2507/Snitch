import dotenv from 'dotenv';
dotenv.config();    

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in .env file")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in .env file")
}
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in .env file")
}   
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in .env file")
}   
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in .env file")
}


const config = {
    JWT_SECRET: process.env.JWT_SECRET ,
   MONGO_URI: process.env.MONGO_URI ,
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT
 
}
export default config;