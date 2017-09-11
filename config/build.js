const fs = require('fs-extra');
const path = require('path');
const browserify = require('browserify');
const liveServer = require('live-server');
const watch = require('watch');
const colors = require('colors');
const uglifyJS = require('uglify-js');

const distDir = 'dist/latest';

const HEADER_TEXT = '// monogatari v' + process.env.npm_package_version + '\n';

const liveServerParams = {
    port: 8080,
    host: '0.0.0.0',
    root: './',
    open: false,
    wait: 1000,
    logLevel: 2
};

const browserifyParams = {
    entries: 'src/Monogatari.js', // entry point
    paths: ['src'],
    standalone: 'Monogatari', // wrap with UMD
    noParse: [
        require.resolve('three'),
        require.resolve('howler'),
        require.resolve('../lib/Box2D_v2.3.1_min')
    ]
};

const compile = (runMinify) => {
    console.log('Running compile...'.grey);
    browserify(browserifyParams)
        .transform('babelify', {
            presets: ['es2015'],
            ignore: 'Box2D_v2.3.1_min*'
        })
        .bundle(function (err, bundleBuf) {
            if (err) {
                console.log(err);
            } else {
                var content = HEADER_TEXT + bundleBuf.toString('utf-8');
                fs.writeFileSync('monogatari.js', content);
                fs.emptyDirSync(distDir);
                fs.copySync('monogatari.js', distDir + '/monogatari.js');
                console.log('Done creating '.grey + 'monogatari.js'.cyan + ' file'.grey);
                if (runMinify) {
                    minify();
                }
            }
        });
};

const minify = () => {
    console.log('Running minify...'.grey);
    var buf = fs.readFileSync('monogatari.js', 'utf-8');
    var minified = uglifyJS.minify(buf);
    var content = HEADER_TEXT + minified.code;
    fs.writeFileSync('monogatari.min.js', content);
    fs.copySync('monogatari.min.js', distDir + '/monogatari.min.js');
    console.log('Done creating minified '.grey + 'monogatari.min.js'.cyan + ' file'.grey);
};

const args = process.argv.slice(2);

if (args[0] === '-live') {
    watch.watchTree('./src', function (f, curr, prev) {
        compile();
    });
    liveServer.start(liveServerParams);
} else {
    compile(true);
}