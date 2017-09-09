const fs = require('fs-extra');
const path = require('path');
const browserify = require('browserify');
const liveServer = require('live-server');
const watch = require('watch');
const colors = require('colors');

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
    paths: 'src',
    standalone: 'Monogatari', // wrap with UMD
    noParse: [
        require.resolve('three'), 
        require.resolve('howler')
    ]
};

const compile = () => {
    console.log('Running compile...'.grey);
    browserify(browserifyParams).bundle(function (err, buf) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFileSync('monogatari.js', buf);
            console.log('Done creating '.grey + 'monogatari.js'.cyan + ' file'.grey);
        }
    });
};

const args = process.argv.slice(2);

if (args[0] === '-live') {
    watch.watchTree('./src', function (f, curr, prev) {
        if (typeof f == 'object' && prev === null && curr === null) {
            compile();
        } else if (curr.nlink === 0) { // f was deleted
            compile();
        } else if (prev === null) { // f was created
            compile();
        } else { // f was changed
            compile();
        }
    });
    liveServer.start(liveServerParams);
} else {
    compile();
}