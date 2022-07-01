/** import external dependencies */
import 'jquery';

/** import local dependencies */
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home'; // Used for front-page.blade.php
import blog from './routes/blog'; // Used for home.blade.php

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
const routes = new Router({
	common,
	home,
	blog,
});

/** Load Events */
$(() => routes.loadEvents());
