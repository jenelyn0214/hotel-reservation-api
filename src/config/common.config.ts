import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  isProduction: process.env.ENVIRONMENT === 'production' || false,
  enableSwagger: process.env.ENABLE_SWAGGER === 'true' || false,
  apiKey: process.env.API_KEY || '',
  secured: process.env.SECURED || 'false',
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY || '',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY || '',
  },
}));
