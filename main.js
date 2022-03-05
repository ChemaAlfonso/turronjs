const { app, BrowserWindow } = require('electron')
const path = require('path');


// ===================================
// Dev reload
// ===================================
// Enable live reload for Electron too
// require('electron-reload')(__dirname, {
//     // Note that the path to electron may vary according to the main file
//     electron: require(`${__dirname}/node_modules/electron`)
// });


const createWindow = () => {

    const win = new BrowserWindow({
      width: 1200,
      height: 900,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')

    // Dev mode
    // win.webContents.openDevTools()

    return win

}


// ===================================
// Start
// ===================================
app.whenReady()
.then(() => {

    const window = createWindow()
    
    // ===================================
    // Turron
    // ===================================
    const { turronJs } = require('./backend/turron')
    turronJs.enable( window )

    // ===================================
    // Lifecicle handle
    // ===================================
    // Close the app not in mac
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    // Reopen the app if no windows opened on mac
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})
