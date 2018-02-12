var socket      = require('socket.io-client')('https://shielded-dawn-50249.herokuapp.com/');
var notifier    = require('node-notifier');
var cmd         = require('node-cmd');
const path      = require('path');
var projectPath = path.resolve(__dirname);
const git       = require('simple-git')(projectPath);

//Lors de la réception de la clé "notification"
socket.on('notification', function(data){

    //Si le paramètre title n'existe pas, on le définit automatiquement
    if(!data.title) { data.title = 'EPIIC - notification interne'; }

    //Si on catch la clé &update dans le message
    if(data.message == '&update') {

        notifier.notify({
            title   : data.title,
            message : 'Lancement du procéssus de mise à jours automatique',
            icon    : path.join(__dirname, 'logo_epiic_white.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : false // Wait with callback, until user action is taken against notification
        });

        git.pull('origin', 'master');
        cmd.run(`pm2 restart epiic-notifier-client`);
    }
    else {

        notifier.notify({
            title   : data.title,
            message : data.message,
            icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : false // Wait with callback, until user action is taken against notification
        });
    }
});
