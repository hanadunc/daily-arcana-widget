const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  const AutoLaunch = require('auto-launch');

const dailyArcanaAutoLauncher = new AutoLaunch({
  name: 'Daily Arcana',
  path: app.getPath('exe'),
});

dailyArcanaAutoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) dailyArcanaAutoLauncher.enable();
});
  const win = new BrowserWindow({
    width: 340,
    height: 580,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    alwaysOnTop: true,
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