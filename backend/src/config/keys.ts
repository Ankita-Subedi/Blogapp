import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mongoURL: process.env.MONGO_URI,
  port: process.env.PORT,
  jwt: process.env.JWT_SECRET,
}));
