const { app, BrowserWindow, ipcMain,dialog } = require('electron');

const fs = require('fs');


/** 
  Return Configurations as JavaScript Object.
  Configs are Stored in .../%appData%/DormRec/
*/
function readConfig(){
  let ConfPath = app.getPath('appData') + "\\DormRec\\config.json";
  if(fs.existsSync(ConfPath) ){
    return JSON.parse(fs.readFileSync(ConfPath));
  }else{
    let default_data = {
      def_elec_cost : 7,
      def_water_cost : 5,
      def_room_cost: 2000
    }
    fs.mkdirSync(app.getPath('appData') + "\\DormRec\\");

    let def_con = JSON.stringify(default_data,null,2);
    try{
    fs.writeFileSync(ConfPath,def_con);
    }
    catch(err) {
      console.log(err)
    }

    return JSON.parse(fs.readFileSync(ConfPath));
  }
  
}

function ReadAllRecords(){
  let RecordPath = app.getPath('appData') + `\\DormRec\\Records\\`;
  
}

function ReadRecords(RoomName) {
  let RecordPath = app.getPath('appData') + `\\DormRec\\Records\\${RoomName}.json`;
  if(fs.existsSync(RecordPath)){
    let rec = fs.readFile(RecordPath);
    return JSON.parse(rec);
  }else {
    fs.writeFile(RecordPath,"{}");
    return {}
  }
}

function AddRoom(RoomName){
  let RecordPath = app.getPath('appData') + `\\DormRec\\Records\\${RoomName}.json`;
  if(fs.existsSync(RecordPath)){
    let rec = fs.readFile(RecordPath);
    return JSON.parse(rec);
  }else {
    fs.writeFileSync(RecordPath,JSON.stringify(readConfig()[roomName] = RoomName));
    return {}
  }
}

function saveDefaultConfig(newConfig){
  let ConfPath = app.getPath('appData') + "\\DormRec\\config.json";
  let new_con = JSON.stringify(newConfig);

  try {
    fs.writeFileSync(ConfPath,new_con);
  }
  catch(err){
    dialog.showErrorBox("Unable to save config",err.toString());
    throw (err);
  }
}

ipcMain.handle('saveDefaultConfig', async (_,arg)=>{
  saveDefaultConfig(arg);
});

ipcMain.handle('addRoom',async (_,arg)=>{
  AddRoom(arg);
});

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
