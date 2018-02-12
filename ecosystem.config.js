module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'epiic-notifier-client',
      script    : 'client.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      // user : 'node',
      // host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:EPIIC34/epiic-notifier-client.git',
      path : 'C:/epiic-notifier-client/',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
