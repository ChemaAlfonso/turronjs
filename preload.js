const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  runTurron: (message) => ipcRenderer.send('run-turron', message),
  setSources: (sources) => ipcRenderer.send('set-turron-sources', sources),
  getSources: () => ipcRenderer.send('get-turron-sources'),
  openDownloads: (sources) => ipcRenderer.send('open-turron-downloads', sources),

  send: ( channel, data ) => ipcRenderer.invoke( channel, data ),
  handle: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )
})

// window.addEventListener('DOMContentLoaded', () => {

//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//     }

// })