const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: Path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CopyWebpackPlugin([
			'src/index.html',
			{ context: 'src',    from: '*.css', to: '.' },
			{ context: 'assets', from: '*',     to: 'public' },
		]),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env']
					}
				}
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.md$/,
				exclude: /node_modules/,
				use: {
					loader: 'raw-loader',
				}
			},
		]
	},
	watchOptions: {
		poll: 1000,
		ignored: [/node_modules/],
	},
};
