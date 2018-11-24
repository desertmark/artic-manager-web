const { execSync } = require('child_process');

console.log('Generating new version...');
const newVersion = execSync('npm version patch --message "Deployment version %s [skip ci]"');
console.log(`Generated version ${newVersion}`);
console.log(execSync('git push'));
console.log(execSync('git push tags'));