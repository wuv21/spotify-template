module.exports = {
	entry: "./entry.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	externals: {
    "angular": "angular",
    "lodash": "_"
	}
}