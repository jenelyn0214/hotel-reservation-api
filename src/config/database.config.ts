import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  databaseURI: process.env.MONGODB_URI || '',
}));
