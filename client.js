var socket      = require('socket.io-client')('https://shielded-dawn-50249.herokuapp.com/');
var nrc         = require('node-run-cmd');
var notifier    = require('node-notifier');
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
            message : 'Lancement du procéssus de mise à jour automatique',
            icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : false // Wait with callback, until user action is taken against notification
        });

        git.pull('origin', 'master');
    }
    if(data.message == "&shutdown") {

        var nc    = require('node-notifier');

        nc.notify({
            title   : data.title,
            message : 'Tous les pc vont s\'éteindre, cliquez sur la notification pour annuler l\'arrêt de votre machine',
            icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : true, // Wait with callback, until user action is taken against notification
            timeout : 20
        });

        nc.on('click', function() {

            nc.notify({
                title   : data.title,
                message : "N'oubliez pas d'éteindre la machine en partant, bonne soirée EPIIC.",
                icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
                sound   : true, // Only Notification Center or Windows Toasters
                wait    : false, // Wait with callback, until user action is taken against notification
            });
        });

        nc.on('timeout', function() { nrc.run('shutdown -s -t 180') })
    }
    else {

        notifier.notify({
            title   : data.title,
            message : data.message,
            icon    : path.join(__dirname, 'logo_epiic_white.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : false // Wait with callback, until user action is taken against notification
        });
    }
});
