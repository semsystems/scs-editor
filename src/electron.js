const {app, BrowserWindow, remote, Menu} = require('electron');
const debug = require('electron-debug');

debug();

console.log(123);

let mainWindow;

const createWindow = async () => {
  await app.whenReady();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL("http://localhost:3000");
}

app.on('ready', createWindow);
