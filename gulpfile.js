const { src, dest, pipe, series } = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const replace = require('gulp-replace');

function clean_files() {
    return src([
        '**/.git',
    ])
    .pipe(clean());
}

const ignode_files = [
    '**/.git',
    '**/**/*',
    '!includes/modules/**/*.jsx',
    '!includes/modules/**/*style.css',
    '!includes/**/*index.js',
    '!includes/**/*loader.js',
    '!includes/fields/**',
    '!scripts/df_scripts/**',
    '!scripts/lib/**',
    '!scripts/frontend.js',
    '!**/.gitignore',
    '!**/.git',
    '!**/*.md',
    '!node_modules/**',
    '!production/**',
    '!**/yarn.lock',
    '!**/package.json',
    '!**/package-lock.json',
    '!**/asset-manifest.json' ,
    '!**/gulpfile.js',
    '!apps/**',
    '!marketplace-phpcs/**',
    '!divi-5/visual-builder/package.json',
    '!divi-5/visual-builder/package-lock.json',
    '!divi-5/visual-builder/gulpfile.json',
    '!divi-5/visual-builder/.env.example',
    '!divi-5/visual-builder/.npmrc',
    '!divi-5/visual-builder/tsconfig.json',
    '!divi-5/visual-builder/webpack.config.js',
    '!divi-5/visual-builder/build/**',
    '!divi-5/visual-builder/node_modules/**',
    '!divi-5/visual-builder/src/**',
    '!divi-5/composer.json',
    '!divi-5/composer.lock'
]

function make_zip() {
    return src([
        ...ignode_files]
    )
    .pipe(replace("Requires PHP: 7.1", "Requires PHP: 7.1\n    Update URI: https://www.diviflash.com"))
    .pipe(zip('diviflash.zip'))
    .pipe(dest('production/webstore'));
}
function make_zip_marketplace() {
    return src([
        ...ignode_files,
        '!admin/license/**']
    ) // Here I'm excluding .min.js files
    .pipe(zip('diviflash.zip'))
    .pipe(dest('production/marketplace'));
}

exports.default = series(
    // clean_files,
    make_zip,
    make_zip_marketplace
);
