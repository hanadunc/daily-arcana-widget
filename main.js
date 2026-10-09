const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {

const win = new BrowserWindow({
  // ... your existing width & height settings ...
  frame: false,
  transparent: true,
  backgroundColor: '#00000000', // Forces native OS window canvas to 100% transparent
  hasShadow: false,             // Kills native Windows square shadow box
  thickFrame: false,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
});

  win.loadFile('index.html');

  ipcMain.on('close-app', () => app.quit());
  ipcMain.on('minimize-app', () => win.minimize());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});