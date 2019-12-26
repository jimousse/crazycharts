const path = require('path');

const mod = {
	rules: [
		{
			test: /\.m?js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}
	]
};

module.exports = [
	// {
	// 	entry: './src/index.js',
	// 	output: {
	// 		filename: 'main.js',
	// 		path: path.resolve(__dirname, 'dist'),
	// 	},
	// 	module: mod,
	// },
	{
		mode: 'development',
		entry: './example/index.js',
		devtool: 'inline-source-map',
		output: {
			filename: 'example.js',
			path: path.resolve(__dirname, 'example'),
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		devServer: {
			contentBase: './example',
		}
	},

];