// Load our HTML body
var html = require('html!./app.html');
document.write(html);

// Inject the CSS
require('style!css!./app.css');

// Add our script(s)
var angular = require('angular');
//var _ = require('lodash');
require('./app.js');