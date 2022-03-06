const { runScript } = require('./helpers/exec')
const path          = require('path')
const { TurronJs }  = require('./turron')

class TurronJsDarwin extends TurronJs {

    macosTurronShFileName      = path.join(__dirname, '/macos/turronsh/turron.command')
    macosTurronShAudioFileName = path.join(__dirname, '/macos/turronsh/turron-audio.command')

    constructor( window ) {
        super( window )
    }

    // ===================================
    // Turron actions
    // ===================================
    runTurron( audio = false ) {
        const targetCommandPath = audio ? this.macosTurronShAudioFileName : this.macosTurronShFileName
        runScript(this.activeWindow, targetCommandPath, null);
    }


}


module.exports = {TurronJs: TurronJsDarwin}