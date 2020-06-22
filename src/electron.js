const {app, BrowserWindow} = require('electron');

createWindow = () => {
let mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
})
  mainWindow.loadURL("http://localhost:3000");
}

app.on('ready', createWindow);
