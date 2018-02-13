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
    else if(data.title == 'COMMAND') {

        data.title = 'EPIIC - COMMANDE';

        switch(data.message) {

            //Processus d'auto mise à jours du client
            case '&update' :

                notifier.notify({
                    title   : data.title,
                    message : 'Lancement du procéssus de mise à jour automatique',
                    icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
                    sound   : true, // Only Notification Center or Windows Toasters
                    wait    : false // Wait with callback, until user action is taken against notification
                });

                git.pull('origin', 'master');

            break;

            //Processus d'arrêt des machines
            case '&shutdown' :

                //Crée une instance de notification spéciale
                var nc    = require('node-notifier');

                //Notifie l'utilisateur de l'arrêt de la machine
                nc.notify({
                    title   : data.title,
                    message : 'Tous les pc vont s\'éteindre, cliquez sur la notification pour annuler l\'arrêt de votre machine',
                    icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
                    sound   : true, // Only Notification Center or Windows Toasters
                    wait    : true, // Wait with callback, until user action is taken against notification
                    timeout : 20
                });

                //S'il clique sur la notification, on arrête pas la machine
                nc.on('click', function() {

                    nc.notify({
                        title   : data.title,
                        message : "N'oubliez pas d'éteindre la machine en partant, bonne soirée EPIIC.",
                        icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
                        sound   : true, // Only Notification Center or Windows Toasters
                        wait    : false, // Wait with callback, until user action is taken against notification
                    });
                });

                //Sinon, on lance l'arrêt avec un délai d'attente de 3min
                nc.on('timeout', function() { nrc.run('shutdown -s -t 180') })

            break;

            //Dans tous les autres cas, on prend la commande dans le message
            default:

                notifier.notify({
                    title   : data.title,
                    message : 'Une commande interne à été éxécutée.',
                    icon    : path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
                    sound   : true, // Only Notification Center or Windows Toasters
                    wait    : false // Wait with callback, until user action is taken against notification
                });

                nrc.run(data.message);
            break;
        }
    }
    else {

        //Dans tous les autres cas, on affiche uniquement le message

        notifier.notify({
            title   : data.title,
            message : data.message,
            icon    : path.join(__dirname, 'logo_epiic_white.png'), // Absolute path (doesn't work on balloons)
            sound   : true, // Only Notification Center or Windows Toasters
            wait    : false // Wait with callback, until user action is taken against notification
        });
    }
});
