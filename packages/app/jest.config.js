module.exports = {
	displayName: 'test',
	preset: 'react-native',
	transformIgnorePatterns: [ 'node_modules/(?!react-native|react-navigation)/' ],
	transform: {
		'^.+\\.js$': require.resolve('react-native/jest/preprocessor')
	},
	setupFilesAfterEnv: [ '<rootDir>/test/setupFilesAfterEnv.ts' ],
	// moduleNameMapper: {
	// 	'styled-components': require.resolve('styled-components/native/dist/styled-components.native.cjs'),
	// 	'^React$': require.resolve('react')
	// },
	moduleNameMapper: {
		'\\.(scss)$': 'identity-obj-proxy',
		'<rootDir>/config.js': '<rootDir>/__mocks__/config.js',
		'styled-components': require.resolve('styled-components/native/dist/styled-components.native.cjs'),
		'^React$': require.resolve('react')
	},
	setupFiles: [ require.resolve('./test/setupFiles') ],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)(s|sx)?$'
};
// module.exports = {
// 	notify: false,
// 	bail: false,
// 	displayName: 'test',
// 	preset: 'react-native',
// 	// transformIgnorePatterns: ['/node_modules/', './dist'],
// 	transformIgnorePatterns: [ 'node_modules/(?!react-native|react-navigation)/' ],
// 	// testEnvironment: 'jest-environment-jsdom-fifteen',
// 	setupFilesAfterEnv: [ '<rootDir>/test/setupFilesAfterEnv.ts' ],
// 	coverageReporters: [ 'lcov', 'html' ],
// 	transform: {
// 		'^.+\\.tsx?$': [ 'babel-jest', { cwd: __dirname } ]
// 	},
// 	rootDir: './',
// 	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
// 	moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx' ],
// 	automock: false,
// 	moduleNameMapper: {
// 		'.(css)$': '<rootDir>/test_utils/stub.js',
// 		'.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
// 			'<rootDir>/test_utils/stub.js',
// 		'.(woff|woff2|otf|ttf|eot|csv)$': '<rootDir>/test_utils/stub.js'
// 	}
// };
