const fs = require('fs-extra');
const browserify = require('browserify');
const liveServer = require('live-server');
const watch = require('watch');
const uglifyJS = require('uglify-js');
const ghpages = require('gh-pages');
const esdoc = require('esdoc');

const DIST_DIR = 'dist/';
const COMPILED_FILENAME = 'monogatari.js';
const MINIFIED_FILENAME = 'monogatari.min.js';
const VERSION = process.env.npm_package_version;
const HEADER_TEXT = '// monogatari v' + VERSION + '\n';

const LIVE_SERVER_CONFIG = {
    port: 8080,
    host: '0.0.0.0',
    root: './',
    watch: ['monogatari*.js', 'usage'],
    open: false,
    wait: 1000,
    logLevel: 2
};

const BROWSERIFY_CONFIG = {
    entries: 'src/main/Monogatari.js',
    paths: ['src/main/'],
    standalone: 'Monogatari', // wrap with UMD
    noParse: [
        require.resolve('three'),
        require.resolve('howler'),
        require.resolve('./lib/Box2D_v2.3.1_min')
    ]
};

const ESDOC_CONFIG = {
    "source": "src/main",
    "destination": DIST_DIR + "docs",
    "plugins": [{
        "name": "esdoc-standard-plugin"
    }]
}

const clean = () => {
    fs.removeSync(DIST_DIR);
    fs.removeSync(COMPILED_FILENAME);
}

const compile = () => {
    browserify(BROWSERIFY_CONFIG)
        .transform('babelify', {
            presets: ['es2015'],
            ignore: 'Box2D_v2.3.1_min*'
        })
        .bundle(function (err, bundleBuf) {
            if (err) throw err;
            else fs.writeFileSync(COMPILED_FILENAME, HEADER_TEXT + bundleBuf.toString('utf-8'));
        });
};

const package = () => {
    compile();
    esdoc.default.generate(ESDOC_CONFIG);
    var compiled = fs.readFileSync(COMPILED_FILENAME, 'utf-8');
    var minified = uglifyJS.minify(compiled).code;
    var dirLatest = DIST_DIR + "latest/";
    var dirVersion = DIST_DIR + VERSION;
    fs.emptyDirSync(dirLatest);
    fs.writeFileSync(dirLatest + MINIFIED_FILENAME, HEADER_TEXT + minified);
    fs.copySync(dirLatest, dirVersion);
}

const deploy = () => {
    package();
    var repo = process.env.GH_TOKEN ? 'https://' + process.env.GH_TOKEN + '@github.com/digihaus/monogatari.git' : undefined;
    ghpages.publish('dist/latest', { dest: 'latest', repo: repo }, (err) => { if (err) throw err });
    ghpages.publish('dist/' + VERSION, { dest: VERSION, repo: repo }, (err) => { if (err) throw err });
};

const live = () => {
    watch.watchTree('./src', { interval: 1 }, (f, curr, prev) => {
        compile();
    });
    liveServer.start(LIVE_SERVER_CONFIG);
}

const args = process.argv.slice(2);

if (args[0] === "clean") clean();
else if (args[0] === "compile") compile();
else if (args[0] === "package") package();
else if (args[0] === "deploy") deploy();
else if (args[0] === "live") live();