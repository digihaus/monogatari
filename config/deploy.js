const fs = require('fs-extra');
const ghpages = require('gh-pages');
const colors = require('colors');

const deploy = () => {
    console.log('Running deploy...'.grey);

    var version = process.env.npm_package_version.split('-')[0];
    var repo = 'https://' + process.env.GITHUB_TOKEN + '@github.com/digihaus/monogatari.git';

    fs.copySync('dist/latest', 'dist/' + version);

    ghpages.publish('dist/latest', { dest: 'latest', repo: repo, silent: true }, function (err) {
        if (err) {
            console.log('Error deploying to gh-pages'.magenta);
        } else {
            console.log('Done deploy to gh-pages '.grey + 'latest/'.cyan);
            ghpages.publish('dist/' + version, { dest: version, repo: repo, silent: true }, function () {
                if (err) {
                    console.log('Error deploying to gh-pages'.magenta);
                } else {
                    console.log('Done deploy to gh-pages '.grey + version.cyan + '/'.cyan);
                }
            });
        }
    });
};

deploy();