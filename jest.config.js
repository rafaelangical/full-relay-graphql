module.exports = {
	projects: [
		'<rootDir>/packages/app/jest.config.js',
		'<rootDir>/app/jest.config.js',
		'<rootDir>/packages/server/jest.config.js'
	],
	setupFilesAfterEnv: [ '<rootDir>/test/setupFilesAfterEnv.ts' ],
	transformIgnorePatterns: [ 'node_modules/(?!react-native|react-navigation)/' ],
	transform: {
		'^.+\\.(js|ts|tsx)?$': require('path').resolve('./customBabelTransformer')
	},
	moduleFileExtensions: [ 'js', 'css', 'ts', 'tsx' ]
};
