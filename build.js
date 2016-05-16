({
    baseUrl: './main',
    paths: {
        'lib': '../lib',
        'lib/Box2d': '../lib/box2d',
        'lib/Three': '../lib/three.min',
        'lib/WebFont': '../lib/webfontloader'
    },
    name: 'Monogatari',
    out: './dist/monogatari.min.js',
    wrap: {
        start: '/*!\n'
		+ ' * Monogatari '+ process.env.npm_package_release + '\n'
		+ ' * http://github.com/gemuzon/monogatari\n'
		+ ' * MIT License\n'
		+ ' */\n'
    }
})