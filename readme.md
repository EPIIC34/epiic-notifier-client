# EPIIC NOTIFIER CLIENT
Permet de recevoir des notifications clients envoyé depuis l'intranet EPIIC.

# Pré-requis : 
Installer [NODE JS](https://nodejs.org/fr/)

###### Installer le gestionnaire de tâches PM2 et PM2 windows startup : 
```
npm install pm2 -g
npm install pm2-windows-startup -g
pm2-startup install
```

# Installer l'app
###### Cloner le dépot : 
```
cd C:
git clone https://github.com/EPIIC34/epiic-notifier-client.git
```

###### Lancer l'application via PM2 :
```
cd c:/epiic-notifier-client
pm2 start client.js -n "epiic-notifier-client" 
```

###### Sauvegarder le processus en tâche de démarrage
```
pm2 save
```

# FIN
