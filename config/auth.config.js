require ('dotenv').config();
module.exports = {
    secret: process.env.JWT_SECRET || "tusecretoparalostokens",
    jwtExpiration: process.env.JWT_EXPIRATION || 86400, // 24 horas en segundos
    jwtRefreshExpiration: 604800, // 7 días en segundos
    saltRouds: process.env.SALT_ROUNDS || 8
  }; 