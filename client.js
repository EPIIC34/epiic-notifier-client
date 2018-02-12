var socket   = require('socket.io-client')('https://shielded-dawn-50249.herokuapp.com/');
var notifier = require('node-notifier');
const path   = require('path');

//Lors de la réception de la clé "notification"
socket.on('notification', function(data){

    if(!data.title) { data.title = 'EPIIC - notification interne'; }

    notifier.notify(
        {
            title: data.title,
            message: data.message,
            icon: path.join(__dirname, 'logo_epiic.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: false // Wait with callback, until user action is taken against notification
        },
        function(err, response) {}
    );
});
