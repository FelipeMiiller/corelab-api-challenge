import { DataSourceOptions } from 'typeorm';
import loadEnvironmentConfig from '../util/env';

const envConfig = loadEnvironmentConfig();

const database: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.env.DATABASE_HOST || 'localhost',
  port: Number(envConfig.env.DATABASE_PORT) || 5432,
  username: envConfig.env.DATABASE_USERNAME || 'postgres',
  password: envConfig.env.DATABASE_PASSWORD || 'postgres',
  database: envConfig.env.DATABASE_NAME || 'corelab-api-challenge',
  synchronize: Boolean(envConfig.env.DATABASE_SYNCHONIZE) || false,
};

const config = {
  app: {
    env: envConfig.using,
    node_mode: envConfig.env.NODE_ENV,
    port: envConfig.env.PORT || 3000,
    origin: envConfig.env.ORIGIN || 'http://localhost:3000',
  },
  database: database,
};

export type Config = typeof config;
export default config;
