const ghpages = require('gh-pages');

ghpages.publish('build', {
        branch: 'master'
    }, (err) => {
        console.log(err ? err : "Pushed build/ successfully to master branch.");
    }
);