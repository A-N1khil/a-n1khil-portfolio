module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
        },
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};