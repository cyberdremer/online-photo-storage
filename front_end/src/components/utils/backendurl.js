import { configDotenv } from "dotenv"
const backendUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`


export default backendUrl