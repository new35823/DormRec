const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');

function readConfig(){
  let ConfPath = app.getPath('appData') + "\\DormRec\\config.json";
  let CustomizePath = app.getPath('appData') + "\\DormRec\\custom.json";
  if(fs.existsSync(ConfPath) && fs.existsSync(CustomizePath)){
    let conf = fs.readFileSync(ConfPath);
    return [JSON.parse(fs.readFileSync(ConfPath)),JSON.parse(fs.readFileSync(CustomizePath))];
  }else{
    let default_data = {
      def_amount_room : 3,
      def_elec_cost : 7,
      def_water_cost : 5,
      def_room_cost: 2000
    }
    fs.mkdirSync(app.getPath('appData') + "\\DormRec\\");

    let def_con = JSON.stringify(default_data,null,2);
    try{
    fs.writeFileSync(ConfPath,def_con);
    fs.writeFileSync(CustomizePath,"{}");
    }
    catch(err) {
      console.log(err)
    }

    return [JSON.parse(fs.readFileSync(ConfPath)),JSON.parse(fs.readFileSync(CustomizePath))];
  }
  
}

function ReadRecords() {
  let RecordPath = app.getPath('appData') + "\\DormRec\\records.json";
  if(fs.existsSync(RecordPath)){
    let rec = fs.readFile(RecordPath);
    return JSON.parse(rec);
  }else {
    fs.writeFile(RecordPath,"{}");
    return {}
  }
}

ipcMain.handle('requestRecords',()=>{
  return readRecords();
});

ipcMain.handle('requestConfig',()=>{
  return readConfig();
});

ipcMain.on('openSettings',()=>{
  openSettings();
});

function openSettings(){
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('settings.html')
  //win.removeMenu();
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
  //win.removeMenu();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
