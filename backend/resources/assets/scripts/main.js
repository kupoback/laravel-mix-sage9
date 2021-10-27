/** import external dependencies */
import $ from 'jquery';
import "waypoints/lib/jquery.waypoints.min.js";
// import Swiper from 'swiper';

/** import local dependencies */
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home'; // Used for front-page.blade.php
// import blog from './routes/blog'; // Used for home.blade.php
import pageTemplateTemplateAbout from './routes/about';

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
const routes = new Router({
	/** All pages */
	common,
	/** Home page */
	home,
	/** Posts Archive */
	// blog,
	/** Custom Page Templates */
	pageTemplateTemplateAbout,
});

/**
 * Polyfill Corrections useful for Vue
 */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
if (typeof NodeList.prototype.forEach !== 'function')  {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

/** Load Events */
jQuery(document).ready( () => {
    // window.$ = window.jQuery = require('jquery');
    routes.loadEvents()
});