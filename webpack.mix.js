const mix = require("laravel-mix");
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
   .browserSync({
      proxy: browserUrl,
      port: 3000, // Change this to a different number, like 8080, if you encounter issues starting it
      files: [
         './app/**/*.php',
         './resources/views/*.{php}',
         './resources/assets/*.{scss,css,js,vue}',
      ],
      reloadOnRestart: true,
   })

   /**
    * Compiling the SASS
   */
   .sass(`${assetPath}/styles/main.scss`, "styles")
   .options({
       processCssUrls: false,
       postCss: [
          require('autoprefixer'),
       ]
   })

   /**
    * Compiling Vue JS
    * Uncomment to try Vue.
    */
   // .vue({version: 2})
   // .js(`${assetPath}/vue/vue.js`, 'scripts')

   /**
    * Compiling JS
    */
  .js(`${assetPath}/scripts/main.js`, "scripts")
  .autoload({ jquery: ["$", "window.jQuery"] })
  .extract()

   /**
    * Copy the fonts and images to the dist folder
    */
   .copyDirectory(`${assetPath}/fonts`, "dist/fonts")
   .copyDirectory(`${assetPath}/images`, "dist/images")
   // Comment out if not using font-awesome
   .copyDirectory(`./node_modules/font-awesome/fonts`, "dist/fonts")

   /**
    * Add source maps and version the files
    */
   .sourceMaps()
   .version();
