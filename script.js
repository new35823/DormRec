const { ipcRenderer } = require('electron');

ipcRenderer.invoke('requestConfig').then();


function openSettings(){
    ipcRenderer.send('openSettings');
}