const { ipcRenderer } = require('electron');

const defaultElect = document.getElementById("defaultElect");
const defaultRoomCost = document.getElementById("defaultRoomCost");
const defaultWater = document.getElementById("defaultWater");
const saveBtn = document.getElementById("saveBTN");

ipcRenderer.invoke('requestConfig').then((configData)=>{
    defaultElect.value = configData.def_elec_cost;
    defaultRoomCost.value = configData.def_room_cost;
    defaultWater.value = configData.def_water_cost;
});

function SaveNewDefaultConfig()
{
    let newConf = {
        def_elec_cost : defaultElect.value,
        def_water_cost : defaultWater.value,
        def_room_cost: defaultRoomCost.value
      }

    ipcRenderer.invoke('saveDefaultConfig',newConf).then(()=>{
        saveBtn.innerHTML = "Saved!";
    }).catch(
        ()=>{
            saveBtn.classList.add("btn-danger");
            saveBtn.classList.remove("btn-success");
        }
    );
}