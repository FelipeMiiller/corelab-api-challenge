import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.EXPRESS_PORT || '3000',
  origin: process.env.ORIGIN || 'http://localhost:3000',
}));

export const pathEnv = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV.trim()}` : `.env`;
