const path          = require('path')
const fs            = require('fs')
const { shell, ipcMain } = require('electron')


class TurronJs {

    activeWindow = null

    turronDownloadPath      = path.join(__dirname, '/../downloaded')
    turronSourcesFileName   = path.join(__dirname, '/../sources.txt')

    constructor( window ) {
        this.activeWindow = window

        this.enableListeners()
    }

    enableListeners() {

        ipcMain.on('run-turron', event => {
            this.runTurron()
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
        throw new Error('Method runTurron not implemented on actual OS')
    }

    openDownloadDir() {
        return shell.openPath(this.turronDownloadPath)
    }

    // ===================================
    // Helpers
    // ===================================
    getSourcesFileName() {
        return this.turronSourcesFileName
    }


}


module.exports = {TurronJs}