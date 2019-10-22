module.exports = {
	presets: [ 'module:metro-react-native-babel-preset' ],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-export-default-from',
		[ 'relay', { schema: 'data/schema.json' } ]
	],
	env: {
		production: {
			plugins: [ 'transform-remove-console' ]
		}
	},
	sourceMaps: true
};
