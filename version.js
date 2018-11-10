const { exec } = require('child_process');
const package = require('./package.json');
const fs = require('fs');

exec('git tag', (err, tag) => {
    if (err) {
        console.error(err);
        return;
    }
    const newTag = generateNewTag(tag);
    updatePackageJson(newTag)
    .then(() => commitPackageJson(newTag))
    .then(() => gitTag(newTag))
    .then(gitPush)
    .then(() => {
        console.log('New version generated :)')
        process.exit(0);
    });
});

function commitPackageJson(tag){
    return new Promise((res, rej) => {
        exec(`git commit -am "New tag ${tag} [skip ci]"`, (err, stdout) => {
            if (err) {
                console.error(err);
                process.exit(-1);
            } else {
                console.log(stdout);
                res();
            }
        });
    })
}

function gitTag(tag) {
    return new Promise((res, rej) => {
        exec(`git tag ${tag}`, (err, stdout) => {
            if (err) {
                console.error(err);
                process.exit(-1);
            } else {
                console.log(stdout);
                res();
            }
        });
    });
}

function gitPush() {
    return new Promise((res, rej) => {
        exec('git push', (err, stdout) => {
            if (err) {
                console.error(err);
                process.exit(-1);
            } else {
                console.log(stdout);
                res();
            }
        });
    });
}

function generateNewTag(tag) {
    if(tag && tag.split) {
        let newTag = tag.split('.');
        newTag[newTag.length -1] = parseInt(newTag[newTag.length -1]) + 1;
        newTag = newTag.join('.');
        console.log('new tag generated: ', newTag);
        return newTag;
    } else {
        return 'v0.0.0';
    }
}

function updatePackageJson(tag) {
    return new Promise((res, rej) => {
        package.version = tag;
        const content = JSON.stringify(package, null, 2);
        fs.writeFile('./package.json', content, (err) => {
            if(err) {
                console.error(err);
                process.exit(-1);
            } else {
                console.log('Package.json Updated');
                res();
            }
        });
    })
}
