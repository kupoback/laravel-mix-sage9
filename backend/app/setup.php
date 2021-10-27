<?php

namespace App;

use function asset_path;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    // Change this to true to implement Vue JS
    $use_vue = true;

    // Registration of script and style files
    wp_register_style('sage/main.css', asset_path('styles/main.css'), false, null);

    wp_register_script('sage/manifest.js', asset_path('scripts/manifest.js'), ['jquery'], null, true);
    wp_register_script('sage/vendor.js', asset_path('scripts/vendor.js'), ['jquery'], null, true);
    wp_register_script('sage/vue.js', asset_path('scripts/vue.js'), ['sage/vendor.js'], null, true);
    wp_register_script('sage/main.js', asset_path('scripts/main.js'), ['sage/vendor.js'], null, true);

    /**
     * Delete comment to use with Vue Navigation
     */
    if (!is_admin() && $use_vue) {
        /**
         * Endpoints:
         * Navigation with no children  get-nav
         * Navigation with children     get-nav-with-children
         * Uses the nav location defined under register_nav_menus
         */
        $query_obj = get_queried_object();
         wp_localize_script('sage/vue.js', 'NAV', [
             'api'         => rest_url('sage-endpoint/v1/get-nav-with-children'),
             'navLocation' => 'primary_navigation',
             'pageSlug'    => is_front_page() ? 'home' : ($query_obj->post_name ?? 'undefined'),
             'postId'      => $query_obj->ID ?? 0,
             'siteName'    => get_bloginfo('name'),
             'siteUrl'     => get_home_url(),
         ]);
    }

    // Enqueuing of Scripts and Styles
    wp_enqueue_script('sage/manifest.js');
    wp_enqueue_script('sage/vendor.js');
    $use_vue ? wp_enqueue_script('sage/vue.js') : null;
    wp_enqueue_script('sage/main.js');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('sage/main.css');
}, 100);