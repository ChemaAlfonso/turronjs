const { runScript } = require('./helpers/exec')
const path          = require('path')
const { TurronJs }  = require('./turron')

class TurronJsDarwin extends TurronJs {

    macosTurronShFileName   = path.join(__dirname, '/macos/turronsh/turron.command')

    constructor( window ) {
        super( window )
    }

    // ===================================
    // Turron actions
    // ===================================
    runTurron() {
        runScript(this.activeWindow, this.macosTurronShFileName, null);
    }


}


module.exports = {TurronJs: TurronJsDarwin}