import loadEnvironmentConfig from './env';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';

const envConfig = loadEnvironmentConfig;

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envConfig.env.DATABASE_HOST || 'localhost',
  port: Number(envConfig.env.DATABASE_PORT) || 5432,
  username: envConfig.env.DATABASE_USERNAME || 'postgres',
  password: envConfig.env.DATABASE_PASSWORD || 'postgres',
  database: envConfig.env.DATABASE_NAME || 'corelab-api-challenge',
};

const config = {
  app: {
    env: envConfig.using,
    node_mode: envConfig.env.NODE_ENV,
    port: envConfig.env.PORT || 3000,
    origin: envConfig.env.ORIGIN || '*',
  },
  database: database,
};

export type Config = typeof config;
export default config;
