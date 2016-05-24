({
    name: 'Monogatari',
    baseUrl: './main',
    paths: {
        'lib': '../lib',
        'lib/Three': '../lib/three.min',
        'lib/Box2d': '../lib/box2d',
        'lib/Chance': '../lib/Chance',
        'lib/Detector': '../lib/Detector',
        'lib/Howler': '../lib/howler',
        'lib/Loki': '../lib/lokijs.min',
        'lib/WebFont': '../lib/webfontloader'
    },
    preserveLicenseComments: false,
    out: './dist/' + process.env.npm_package_name + '.min.js',
    wrap: {
        start: '// ' + process.env.npm_package_name + '-r' + process.env.npm_package_revision
    }
})