const { runScript } = require('./helpers/exec')
const path          = require('path')
const fs            = require('fs')
const { shell, ipcMain, BrowserWindow } = require('electron')


class TurronJs {

    activeWindow = null

    turronDownloadPath = path.join(__dirname, '/../downloaded')

    macosTurronShFileName   = path.join(__dirname, '/macos/turronsh/turron.command')
    macosSourcesFileName    = path.join(__dirname, '/macos/turronsh/sources.txt')

    windowsTurronShFileName = path.join(__dirname, '/macos/turronsh/turron.command')
    windowsSourcesFileName = path.join(__dirname, '/macos/turronsh/sources.txt')

    enable( window ) {
        this.activeWindow = window

        this.enableListeners()
    }

    enableListeners() {

        ipcMain.on('run-turron', event => {
            turronJs.runTurron()
        })
    
        ipcMain.on('set-turron-sources', (event, sources) => {
            this.setSources(sources)
        })
    
        ipcMain.on('open-turron-downloads', event => {
            this.openDownloadDir()
        })
    
        ipcMain.on('get-turron-sources', event => {
            this.getSources()
        })

    }


    // ===================================
    // Sources handling
    // ===================================
    getSources() {
        fs.readFile(this.getSourcesFileName(), 'utf8', (err,data) => {
            if (err) {
              return console.log(err);
            }

            this.activeWindow.webContents.send('get-sources', data);
        })
    }

    setSources( sourcesList ) {
        const sourcesContent =  sourcesList.join('\r\n') + '\r\n'

        fs.writeFile(this.getSourcesFileName(), sourcesContent, (err) => {
            if(err)
                return console.log(err);

            console.log("The file was saved!");
        }); 
    }

    // ===================================
    // Turron actions
    // ===================================
    runTurron() {
        switch (this.getPlatform()) {
            case 'darwin':
                return this.runTurronMacos()
                break;
                
            case 'win32':
                return this.runTurronWindows()
                break;
        
            default:
                break;
        }
    }

    runTurronMacos() {
        runScript(this.activeWindow, this.macosTurronShFileName, null);
    }

    runTurronWindows() {
        runScript(this.activeWindow, this.windowsTurronShFileName, null);
    }

    openDownloadDir() {
        return shell.openPath(this.turronDownloadPath)
    }

    // ===================================
    // Helpers
    // ===================================
    getPlatform() {
        return process.platform
    }

    getSourcesFileName() {
        switch (this.getPlatform()) {
            case 'darwin':
                return this.macosSourcesFileName
                break;
                
            case 'win32':
                return this.windowsSourcesFileName
                break;
        
            default:
                break;
        }
    }


}

const turronJs = new TurronJs()


module.exports = {turronJs}