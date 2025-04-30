const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );
const CopyPlugin = require("copy-webpack-plugin");
const path = require( 'path' );

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        components: path.resolve( process.cwd(), 'components/src/', 'components.js' ),
        controls: path.resolve( process.cwd(), 'customizer-controls/src/', 'controls.js' ),
    },
    output: {
        filename: '[name].js',
        path: path.resolve( process.cwd(), '../../admin/customizer' )
    },
    plugins: [
        ...defaultConfig.plugins,
        new CopyPlugin({
            patterns: [
                { from: path.resolve( process.cwd(), 'styles/' ), to: path.resolve( process.cwd(), '../../admin/customizer/css' ) },
            ],
        }),
    ],
};
