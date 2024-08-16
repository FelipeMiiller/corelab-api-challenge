import { HttpException, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv'; // Changed to single quotes
import * as fs from 'fs';
import * as path from 'path';
const ROOTPATH = path.resolve();

function listEnvPaths() {
  return fs
    .readdirSync(ROOTPATH)
    .filter((file) => file.startsWith('.env'))
    .map((file) => path.join(ROOTPATH, file));
}

export default function loadEnvironmentConfig(): { env: NodeJS.ProcessEnv; using: string } {
  try {
    const envPaths = listEnvPaths();
    const NODE_ENV = process.env.NODE_ENV || 'development';
    const envfilter = envPaths.filter((file) => file.endsWith(NODE_ENV));
    const defaultEnvPath = envPaths.find((file) => file.endsWith('.env'));

    if (envfilter.length > 0) {
      return {
        env: { ...process.env, ...dotenv.config({ path: envfilter[0] }).parsed },
        using: `.env.${envfilter[0].split('.env.')[1]}`,
      };
    }

    if (defaultEnvPath) {
      return {
        env: { ...process.env, ...dotenv.config({ path: `${ROOTPATH}/.env` }).parsed },
        using: '.env',
      };
    }
    throw new Error('.env file not found');
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Error in loadEnvironmentConfig',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        cause: error,
      },
    );
  }
}
