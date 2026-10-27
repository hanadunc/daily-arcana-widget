const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {

const win = new BrowserWindow({
  width: 340,
  height: 580,
  frame: false,
  transparent: true,
  hasShadow: false,
  thickFrame: false, // Prevents Windows from adding its native window border/shadow padding
  backgroundColor: '#00000000',
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