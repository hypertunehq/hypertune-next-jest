import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/**
 * Jest has an issue when resolving dual CJS / ESM modules. Instead of resolving
 * the CJS version, it resolves the ESM one which uses import syntax which it
 * then complains about.
 *
 * Relevant discussion for nanoid:
 * https://github.com/ai/nanoid/issues/363#issuecomment-1140906651
 *
 * To work around this, we modify transformIgnorePatterns so these modules
 * are transformed by Jest.
 */
const esModules = ["nanoid"];

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [`/node_modules/(?!${esModules.join("|")})`],
  moduleNameMapper: {
    ...Object.fromEntries(
      esModules.map((moduleName) => [
        `^${moduleName}(/(.*)|$)`,
        `${moduleName}$1`,
      ])
    ),
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
