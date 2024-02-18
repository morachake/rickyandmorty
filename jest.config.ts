// jest.config.ts
import 'ts-node/register';
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  ...createJestConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Add any necessary moduleNameMapper entries for module aliasing
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Use a separate setup file

  // Add any other Jest configuration you need
};

export default createJestConfig(config);
