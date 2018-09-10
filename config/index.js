// this file builds the config object using at build time to bind the config values thorught webpack.DefinePlugin, 
// so it is executed by node not the browser.
const env = process.env.NODE_ENV || 'dev';
let config = {
    name: 'Development',
    API_URL:'http://localhost:3001'
}
switch (env.toLocaleLowerCase()) {
    case 'production':
        config = {
            name: 'Production',
            API_URL: 'https://qa-artic-manager.herokuapp.com'
        };
        break;
    case 'qa':
        config = {
            name: 'QA',
            API_URL: 'https://qa-artic-manager.herokuapp.com'
        };
        break;
    default:
        config;
}

module.exports = config;