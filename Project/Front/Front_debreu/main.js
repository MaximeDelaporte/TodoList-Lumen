const electron = require('electron'); // déclaration du mode electron pour avoir accès à toutes ses APIs

const app = electron.app; // cycle de vie de l'appli
const BrowserWindow = electron.BrowserWindow; // pour le processus de rendu


const remote = require('electron').remote; // ca, ca permet d'utiliser toutes les APIs normalement indispo dans les scripts de rendu.
const ipc = electron.ipcMain;
const dialog = electron.dialog;




// Initialize Window
let mainWindow; // creation d'une variable globale, qui contiendra notre fenêtre principale.


function createWindow () { // création de la function qui initialisera notre fenêtre
  mainWindow = new BrowserWindow ({ // definition de la fenetre
    width: 800,
    height: 500,
    movable: true,
    center: true,
    maximized: false,
    frame: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);      // on doit charger un chemin absolu
  mainWindow.on('closed', () => {
    mainWindow = null; // lorsque la fenêtre est fermée, on l'a définie à null.
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // verification si on est pas sous MAC OS, car sur mac, les appli ne se ferment pas et continuent en arrière-plan
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) { // vérification si la fenêtre n'existe pas encore
    createWindow();  // si c'est le cas, création de la fenetre.
  }
})


// IPC ---------------------------------------------------------------------
//ipc.on('open-file-dialog', function (event) {
//    dialog.showOpenDialog({
 //       properties: ['openFile'], function(files){
//            if (files) event.sender.send('selectedElement', files)
//        }
//    });
//});


// REMOTE -----------------------------------------------------------------
// remote.dialog.showErrorBox('Erreur !', 'l\'appli a rencontré une fucking error. Tout va péter dans 10 secondes ... Tous aux abris !!!');


// MENU CONTEXTUEL-------------------------------------------------------------------
// var Menu = require('electron').remote.Menu;
//
// document.getElementsById('menu').addEventListener('contextmenu', (event) => {
//   event.preventDefault();
//   const template = [
//     {label: 'Ajouter aux favoris',
//     click: () => { alert('article bien ajouté aux favoris');}},
//
//     {label: 'Partager',
//     submenu: [{
//       label: 'Diaspora*',
//       click: () =>{shareOnDiaspora();}
//     }]
//     },
//   ];
//     var menu = remote.Menu.buildFromTemplate(template);
//     menu.popup();
// });

// MENU POUR APPLI --------------------------------------------------------
// const template = [
//   {
//     label: 'Fichier',
//     submenu: [
//       {
//         label: 'Enregistrer'
//       }, {
//         label: 'Ouvrir'
//       }, {
//         label: 'Quitter'
//       }
//     ]
//   },
// ];
// const menu = remote.Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);
