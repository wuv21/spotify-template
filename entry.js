// Load our HTML body
var html = require('html!./app.html');
document.write(html);

// Inject the CSS
require('style!css!./app.css');

// Add our script(s)
require('angular');
require('./app.js');