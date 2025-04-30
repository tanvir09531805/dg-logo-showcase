const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );
const CopyPlugin = require("copy-webpack-plugin");
const path = require( 'path' );

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        index: path.resolve( process.cwd(), 'src/', 'index.js' ),
    },
    output: {
        filename: '[name].js',
        path: path.resolve( process.cwd(), '../../admin/dashboard/assets' )
    },
    plugins: [
        ...defaultConfig.plugins,
        new CopyPlugin({
            patterns: [
                { from: path.resolve( process.cwd(), 'src/static' ), to: path.resolve( process.cwd(), '../../admin/dashboard/static' ) },
            ],
        }),
    ],
};
