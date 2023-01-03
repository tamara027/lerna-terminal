module.exports = {
	extends: [
		'@merkle-open/eslint-config/configurations/es8-node.js',
	],
	rules: {
		'builtinGlobals': 0,
		'complexity': 0,
		'import/no-unresolved': 0,
		'max-len': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-redeclare': 0,
	},
	globals: {
		describe: true,
		it: true,
		expect: true,
		beforeEach: true,
	},
};
