const { ipcRenderer } = require('electron');

ipcRenderer.invoke('requestRecords').then();

function openSettings(){
    ipcRenderer.send('openSettings');
}

function openAddRoomDialog(){
    swal({
        title: "Add Room",
        content: {
            element: "input",
            attributes: {
              placeholder: "Room Name",
              type: "text",
            }
        },
        buttons: [
            "Cancel",
            "Add"
        ]
    }).then((val)=>{
        if(val == ""){
            swal("Error!","Room name cannot be empty!","error");
        }else if(val != null) {
            ipcRenderer.invoke('addRoom',val).then(()=>{
                swal("Success!",val + " has been added!","success");
            });
        }
    });
}