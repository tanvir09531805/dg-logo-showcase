const path = require( 'path' );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const requestToExternal = ( str ) => {
	if ( str.split( '/' )[0].replace( '@', '' ) === 'divi' ) {
		return str.split( '/' )[0].replace( '@', '' ) + '-' + str.split( '/' )[1];
	}
}

module.exports = {
	entry: {
		bundle: './src/modules/index.js',
	},

	externals: {
		jquery: 'jQuery',
		underscore: '_',
		lodash: 'lodash',
		react: ['vendor', 'React'],
		'react-dom': ['vendor', 'ReactDOM'],

		// WordPress dependencies.
		'@wordpress/i18n': [ 'wp', 'i18n' ],
		'@wordpress/hooks': [ 'wp', 'hooks' ],

		// Divi dependencies.
		'@divi/rest': [ 'divi', 'rest' ],
		'@divi/data': [ 'divi', 'data' ],
		'@divi/module': [ 'divi', 'module' ],
		'@divi/module-utils': [ 'divi', 'moduleUtils' ],
		'@divi/modal': [ 'divi', 'modal' ],
		'@divi/field-library': [ 'divi', 'fieldLibrary' ],
		'@divi/icon-library': [ 'divi', 'iconLibrary' ],
		'@divi/module-library': [ 'divi', 'moduleLibrary' ],
		'@divi/style-library': [ 'divi', 'styleLibrary' ],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},

			{
				test: /\.(jsx|js)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'thread-loader',
						options: {
							workers: -1,
						},
					},
					{
						loader: 'babel-loader',
						options: {
							compact: false,
							presets: [
								[ '@babel/preset-env', {
									modules: false,
									targets: '> 5%',
								} ],
								'@babel/preset-react',
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
							],
							cacheDirectory: false,
						},
					}
				]
			},

			{
				test: /\.s?css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
							importLoaders: 2,
						},
					},
					{
						loader: 'sass-loader',
						options: {},
					},
				],
			}
		]
	},
	optimization: {
		// Split CSS code for visual builder and Front-end.
		// style.scss file will use for front-end.
		// module.scss or any other *.scss file without style.scss will be used for Front-end.
		splitChunks: {
			cacheGroups: {
				vb: {
					type: 'css/mini-extract',
					test: /[\\/]style(\.module)?\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true,
					name( _, chunks, cacheGroupKey ) {
						const chunkName = chunks[0].name;
						return `${ path.dirname( chunkName ) }/${ cacheGroupKey }-${ path.basename( chunkName ) }`;
					},
				},
				default: false,
			},
		},
	},

	plugins: [
		new MiniCssExtractPlugin( {
			filename: '../build/styles/[name].css',
		} ),
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: '**/module.json',
					context: 'src/modules/',
					to: path.resolve( __dirname, 'config' ),
				},
			]
		} ),
		// new DependencyExtractionWebpackPlugin( { requestToExternal } )
	],

	resolve: {
		extensions: [ '.js', '.jsx', '.tsx', '.ts' ],
	},

	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'build' ),
	},
	stats: {
		errorDetails: true,
	},
};
