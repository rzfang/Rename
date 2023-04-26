const fs = require('fs').promises;
const path = require('path');
const { app, BrowserWindow, dialog, ipcMain } = require('electron');

let mainWindow

/*
  < file names. */
async function listFiles () {
  const { filePaths: FlPths } = await dialog.showOpenDialog(mainWindow, { properties: [ 'openDirectory' ] }); // file paths.
  const DirPth = FlPths[0]; // directory path.

  let FlNms; // file names.

  try {
    FlNms = await fs.readdir(DirPth); // file names.
  }
  catch (Err) {
    console.log('--- 003 ---');
    console.log(Err);

    return;
  }

  return FlNms;
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.ENV === 'development') { // open Chrome dev console in development mode.
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.handle('listFiles', listFiles);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
