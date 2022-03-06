const { runScript } = require('./helpers/exec')
const path          = require('path')
const { TurronJs }  = require('./turron')

class TurronJsWin32 extends TurronJs {

    constructor( window ) {
        super( window )
    }

    // ===================================
    // Turron actions
    // ===================================
    runTurron() {
        console.log('Turron will be processed')
    }


}


module.exports = {TurronJs: TurronJsWin32}