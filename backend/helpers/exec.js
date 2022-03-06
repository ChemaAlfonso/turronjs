const electron = require('electron');
const child_process = require('child_process');
const dialog = electron.dialog;

function execute(command, callback) {
    child_process.exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};

// This function will output the lines from the script 
// and will return the full combined output
// as well as exit code when it's done (using the callback).
function runScript(mainWindow, command, args, callback) {

    var child = child_process.spawn(command, args, {
        encoding: 'utf8',
        shell: true
    });

    // You can also use a variable to save the output for when the script closes later
    child.on('error', (error) => {
        dialog.showMessageBox({
            title: 'Title',
            type: 'warning',
            message: 'Error occured.\r\n' + error
        });

        mainWindow.webContents.send('terminal-output', `<span class="error__text">${error}</span>`);
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);     
        mainWindow.webContents.send('terminal-output', data);

        if ( data.includes( 'Woof Woof -> All Done' ) ) {
            dialog.showMessageBox({
                title: 'Completado!',
                type: 'info',
                message: 'Todos los recursos han sido procesados.\r\n'
            });
        }
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        // Return some data to the renderer process with the terminal-output ID
        mainWindow.webContents.send('terminal-output', data);
        //Here is the output from the command
        console.log(data);  
    });

    child.on('close', (code) => {
        //Here you can get the exit code of the script  
        // switch (code) {
        //     case 0:
        //         break;
        // }

    });
    if (typeof callback === 'function')
        callback();
}


module.exports = {execute, runScript}