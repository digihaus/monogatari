var requirejs = require('requirejs');

var paths = requirejs('./paths');

var config = {
  name: 'Monogatari',
  baseUrl: './src',
  paths: paths,
  preserveLicenseComments: true,
  out: './build/' + process.env.npm_package_name + '.min.js',
  wrap: {
    start: '/*! ' + process.env.npm_package_name + '-r' + process.env.npm_package_revision + ' */'
  }
};

requirejs.optimize(config, function(buildResp) {
  console.log(buildResp);
}, function(err) {
  console.log(err);
});