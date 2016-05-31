({
  name: 'Monogatari',
  baseUrl: './src',
  paths: {
    'lib': '../lib',
    'lib/Three': '../lib/three.min',
    'lib/Box2d': '../lib/box2d',
    'lib/Howler': '../lib/howler'
  },
  preserveLicenseComments: false,
  out: './build/' + process.env.npm_package_name + '.min.js',
  wrap: {
    start: '// ' + process.env.npm_package_name + '-r' + process.env.npm_package_revision
  }
})