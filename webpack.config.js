module.exports = {
	entry: "./app.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	// Makes debugging 100x easier
	devtool: "source-map",
	externals: [
		"angular"
	]
}