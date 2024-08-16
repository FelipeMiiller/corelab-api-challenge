import { HttpException, HttpStatus } from '@nestjs/common';
import loadEnvironmentConfig from './env';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Mocking fs and dotenv
jest.mock('fs');
jest.mock('dotenv');

describe('loadEnvironmentConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load environment variables from .env file', () => {
    const mockEnv = { TEST_VAR: 'test' };
    (fs.readdirSync as jest.Mock).mockReturnValue(['.env.development']);
    (dotenv.config as jest.Mock).mockReturnValue({ parsed: mockEnv });

    const result = loadEnvironmentConfig(); // Ensure this returns { env: mockEnv, using: '.env.development' }
    expect(result).toHaveProperty('env'); // Check if 'env' exists
    expect(result.env).toEqual(expect.objectContaining(mockEnv));
    expect(result.using).toBe('.env.development');
  });

  it('should throw an error if no .env file is found', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue([]);

    expect(() => loadEnvironmentConfig()).toThrow(HttpException);
    expect(() => loadEnvironmentConfig()).toThrow('Error in loadEnvironmentConfig');
  });
});
