# Sage 9 With Laravel-Mix

The aim of this project is to incorporate [laravel-mix](https://laravel-mix.com/) with the power of [Sage 9](https://roots.io/docs/sage/9.x).

This setup replaces the previous Webpack compiler with a more end-user friendly configuration tool to customize and optimize the asset compiler as needed for the theme.

Laravel-mix at the most basic, is a wrapper for Webpack. Instead of running through docs on how to configure loaders, watchers, and tests for common assets such as JavaScript,
SASS, CSS, React, Vue, or others, Laravel-mix incorporates common name methods to run through those methods with less options needed. This is all handled with the `webpack.mix.js`
file found in the root of this project.

It also still allows you to hook into Webpack's config, if there's anything additional you need to integrate.

### WebpackConfig Example

This is an example of how the `CopyWebpackPlugin` and the `ImageminPlugin` is used to copy and optimize and images used in this project.

```javascript
   mix.webpackConfig({
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
```

### Sage 9 Integration

With the replacement of the pre-existing webpack, there was a bit more involvement with needing to hook it up with WordPress' enqueue.

In `setup.php`, this is already done, however, a further explaination follows.

For the Javascript to reference any extracted plugins, the `mainfest.js` file needs to be enqueued, as well as the `vendor.js` file. For the `vue.js` and the `main.js` file, the dependency is set for the `vendor.js` file, so that it has a source of reference.

```php
wp_register_script('sage/manifest.js', asset_path('scripts/manifest.js'), ['jquery'], null, true);
wp_register_script('sage/vendor.js', asset_path('scripts/vendor.js'), ['jquery'], null, true);
wp_register_script('sage/main.js', asset_path('scripts/main.js'), ['sage/vendor.js'], null, true);

// These were split in case of needing to register or unregister as needed, or on a per-page basis
wp_enqueue_script('sage/manifest.js');
wp_enqueue_script('sage/vendor.js');
wp_enqueue_script('sage/main.js');
```

## Known Issues

While Browsersync has a watcher setup for changes in the `app` directory, as well as the `resources/views` directory, investigation is still ongoing with actually getting the watcher to trigger when a change is complete. A possible issue being that the `views` directory has `blade.php` as opposed to just `.php` files, but ongoing looking into is in progress.


## Laravel-Mix Sources

* [Installation](https://laravel-mix.com/docs/6.0/installation)
* [Javascript Bundling](https://laravel-mix.com/docs/6.0/mixjs)
    * [Vue Support](https://laravel-mix.com/docs/6.0/vue)
* [SASS Compiling](https://laravel-mix.com/docs/6.0/sass)
    * [CSS Compiling](https://laravel-mix.com/docs/6.0/css)
    * [PostCSS Compiling](https://laravel-mix.com/docs/6.0/postcss)
* [BrowserSync Settings](https://laravel-mix.com/docs/6.0/browsersync) 
