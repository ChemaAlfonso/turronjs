const { runScript } = require('./helpers/exec')
const path          = require('path')
const { TurronJs }  = require('./turron')

class TurronJsWin32 extends TurronJs {
    win32TurronShFileName = path.join(__dirname, '/win32/turronsh/turron.ps1')
    win32TurronAudioShFileName = path.join(__dirname, '/win32/turronsh/turron-audio.ps1')

    constructor( window ) {
        super( window )
    }

    // ===================================
    // Turron actions
    // ===================================
    runTurron( audio = false ) {

        this.runTurronBySh( audio )
        
    }

    runTurronBySh( audio ) {
        const targetCommandPath = audio ? this.win32TurronAudioShFileName : this.win32TurronShFileName
        runScript(this.activeWindow, 'powershell -ExecutionPolicy ByPass ' + targetCommandPath, null);
    }


}


module.exports = {TurronJs: TurronJsWin32}