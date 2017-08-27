const fs = require("fs");
const path = require("path");
const browserify = require('browserify');
const liveServer = require("live-server");
const watch = require("watch");

const liveServerParams = {
    port: 8080,
    host: "0.0.0.0",
    root: "./",
    open: false,
    wait: 1000,
    logLevel: 2
};

const browserifyParams = {
    entries: './src/Monogatari.js', // entry point
    paths: './src',
    standalone: 'Monogatari' // wrap with UMD
};

const compile = () => {
    console.log("Running compile...".bgWhite.black);
    browserify(browserifyParams).bundle(function (err, buf) {
        if (err) {
            console.log(err);
        } else {
            clean("./dist", () => {
                if (!fs.existsSync('./dist')) {
                    mkdirSync('./dist');
                }
                fs.writeFileSync('./dist/monogatari.min.js', buf);
                console.log("Done creating ./dist/monogatari.min.js file.".bgWhite.black);
            });
        }
    });
};

const mkdirSync = (dir) => {
    if (fs.existsSync(dir)) return;
    try {
        fs.mkdirSync(dir);
    } catch (err) {
        if (err.code == 'ENOENT') {
            mkdirSync(path.dirname(dir));
            mkdirSync(dir);
        }
    }
};

const clean = (dir, callback) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            var srcPath = path.join(dir, file);
            if (fs.lstatSync(srcPath).isDirectory()) {
                clean(srcPath, () => {
                    fs.rmdirSync(srcPath);
                });
            } else {
                fs.unlinkSync(srcPath);
            }
        });
    }
    if (callback) callback();
};

const args = process.argv.slice(2);

if (args[0] === "watch") {
    liveServer.start(liveServerParams);
    watch.watchTree("./src", function (f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {
            compile();
        } else if (curr.nlink === 0) { // f was deleted
            compile();
        } else if (prev === null) { // f was created
            compile();
        } else { // f was changed
            compile();
        }
    });
} else {
    compile();
}