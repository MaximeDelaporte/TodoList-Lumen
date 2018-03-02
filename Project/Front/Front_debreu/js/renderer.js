/*
const ipc = require('electron').ipcRenderer; // IPC permet d'envoyer des messages entre script principal et script "rendu"
const selectBtn = document.getElementsById('select');

selectBtn.addEventListener('click', function(event) {
  ipc.send('open-file-dialog')
})

ipc.on('selectedElement', function (event, path) {
  document.getElementsById('selected').innerHtml = 'vous avez selectionné : '+ path
});
*/
