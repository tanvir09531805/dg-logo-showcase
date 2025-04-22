const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

defaultConfig.plugins[1].options.filename = "[name].css";

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        index: path.resolve( process.cwd(), 'src/', 'index.js' ),
    },
	output: {
		filename: '[name].js',
        path: path.resolve( process.cwd(), '../../admin/menu/assets' )
	}
};
