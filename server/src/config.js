import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWTSECRET,
    secretKey: process.env.SECRET_KEY,
}