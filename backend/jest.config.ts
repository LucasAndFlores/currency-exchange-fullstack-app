import type { Config } from 'jest'

const config: Config = {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageProvider: 'v8',
	rootDir: '.',
	testMatch: ['**/__tests__/unit/*.ts', '**/__tests__/integration/*.ts'],
	setupFiles: [`${__dirname}/__tests__/env/setupTest.ts`],
	setupFilesAfterEnv: [
		`${__dirname}/__tests__/mocks/prisma/singletonPrismaClient.ts`
	]
}

export default config
