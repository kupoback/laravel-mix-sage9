const mix = require("laravel-mix");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");

const assetPath = `./resources/assets`;
const browserUrl = "https://laravel-mix-be.test"; // Used for the frontend watcher

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */
mix.setPublicPath("./dist")
   .options({
       processCssUrls: false,
       postCss: [
           require("autoprefixer"),
       ]
   })
    /**
     * Compiling the SASS
     */
   .sass(`${assetPath}/styles/main.scss`, "styles")
    /**
     * Compiling Vue JS
     * Uncomment to try Vue.
     */
    // .vue({version: 2}) // Change version number to match, but sticking with Vue 2 here
    // .js(`${assetPath}/vue/vue.js`, "scripts")
    /**
     * Compiling React JS
     */
    // .react()
    // .js(`${assetPath}/react/react.js`, "scripts")
    /**
     * Compiling JS
     */
   .js(`${assetPath}/scripts/main.js`, "scripts")
   .autoload({jquery: ["$", "window.jQuery"]})
   .extract()
    /**
     * Copy the fonts and images to the dist folder
     */
   .copyDirectory(`${assetPath}/fonts`, "dist/fonts")
    /**
     * Copy and compress SVG, JPEG, PNG, and Gifs
     */
   .webpackConfig({
       plugins: [
           new CopyWebpackPlugin({
               patterns: [
                   {
                       from: `${assetPath}/images`, // -> the source location (relative to where your webpack.mix.js is located)
                       to: "images", // Laravel mix will place this in 'dist/images'
                   },
               ],
           }),
           new ImageminPlugin({
               test: /\.(jpe?g|png|gif|svg)$/i,
               optipng: {optimizationLevel: 2},
               gifsicle: {optimizationLevel: 3},
               pngquant: {quality: "65-90", speed: 4},
               svgo: {
                   plugins: [
                       {removeViewBox: false},
                   ],
               },
               plugins: [imageminMozjpeg({quality: 75})],
           }),
       ],
   })
   .browserSync({
       proxy: browserUrl,
       port: 3000, // Change this to a different number, like 8080, if you encounter issues starting it
       files: [
           "./app/**/*.{php}",
           "./dist/**/*.{scss,css,js,vue}",
           "./resources/views/**/*.{php}",
       ],
       reloadOnRestart: true,
   })
    /**
     * Add source maps and version the files
     */
   .sourceMaps(!mix.inProduction(), "source-map");

if (mix.inProduction()) {
    mix.version(
        [
            "dist/scripts/manifest.js",
            "dist/scripts/vendor.js",
            "dist/scripts/main.js",
            // 'dist/scripts/vue.js', // Uncomment if using vue
            // 'dist/scripts/react.js', // Uncomment if using react
            "dist/styles/main.css",
        ]
    );
}
