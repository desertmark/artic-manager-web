// this file builds the config object used at build time to bind the config values thorught webpack.DefinePlugin, 
// so it is executed by node not the browser.

module.exports = function getConfig(env) {
    let config = {
        name: 'Development',
        configName: 'dev',
        API_URL:'http://localhost:3001'
    }
    switch (env.toLocaleLowerCase()) {
        case 'prod':
        case 'production':
            config = {
                name: 'Production',
                configName: 'prod',
                API_URL: 'https://qa-artic-manager.herokuapp.com'
            };
            break;
        case 'qa':
            config = {
                name: 'QA',
                configName: 'qa',
                API_URL: 'https://qa-artic-manager.herokuapp.com'
            };
            break;
        default:
            config;
    }
    return config;    
};