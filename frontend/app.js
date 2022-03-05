let downloadList = []

const addInput          = document.querySelector('#addInput')
const addButton         = document.querySelector('.add__button')
const downloadButton    = document.querySelector('.do__button')
const badgeElement      = document.querySelector('.do__button .badge')
const openDownloadsButton = document.querySelector('.view__button')
const listElement       = document.querySelector('.added__list')
const consoleElement    = document.querySelector('.console')

// ===================================
// Helpers
// ===================================
const setDownloadText = () => {

    if ( !downloadList.length ) {
        badgeElement.innerHTML = ''
        badgeElement.classList.add('badge--empty')
        downloadButton.setAttribute('disabled', 'disabled')
        return
    }

    badgeElement.innerHTML = downloadList.length
    badgeElement.classList.remove('badge--empty')
    downloadButton.removeAttribute('disabled')

}

const addTextToTerminal = ( text ) => {
    text = text.replaceAll('[0;31m', '')
    text = text.replaceAll('[0;32m', '')
    text = text.replaceAll('[0;33m', '')
    text = text.replaceAll('[0;34m', '')
    text = text.replaceAll('[0m', '')

    consoleElement.innerHTML = consoleElement.innerHTML + '<br>' + text

    consoleElement.scrollTop = consoleElement.scrollHeight
}

const persistSources = () => {
    window.electronAPI.setSources(downloadList)
}

const setInitialSources = ( sourceList ) => {
    let storedSources = sourceList.split('\r\n') || []

    storedSources = storedSources.filter(Boolean)

    storedSources.forEach( ss => addToList(ss) )

    addInput.focus()

}

// ===================================
// List handling
// ===================================
const addToList = ( directUrl ) => {

    const url = directUrl || addInput.value

    if ( !url || downloadList.includes( url ) ) return

    // Update list
    downloadList.push(url.trim())

    // Update html
    const actualListElements = [...document.querySelectorAll('.added__element')]

    actualListElements.forEach( actualListElement => actualListElement.parentElement.removeChild( actualListElement ) )

    downloadList.forEach( downloadUrl => {
        const elementTemplate = `
            <span class="added__url">${downloadUrl}</span>
            <button data-url="${downloadUrl}" class="added__remove" title="Quitar de la lista">🗑</button>
        `

        const li = document.createElement('li')
        li.classList.add('added__element')
        li.innerHTML = elementTemplate

        listElement.appendChild(li)
    })

    setDownloadText()

    persistSources()

    addInput.focus()
}

const removeFromList = ( removingUrl ) =>  {
    // Update list
    downloadList = downloadList.filter( url => url !== removingUrl )

    // Update html
    const removingElement = document.querySelector(`button[data-url="${removingUrl}"]`)

    removingElement.parentElement.parentElement.removeChild(removingElement.parentElement)

    setDownloadText()

    persistSources()

    addInput.focus()
}


// ===================================
// Download
// ===================================
const download = () => {
    window.electronAPI.runTurron(downloadList)
}

const openDownloads = () => {
    window.electronAPI.openDownloads()
}

// ===================================
// Events
// ===================================
const handleEvent = e => {

    const { target } = e

    if ( !target ) return

    if ( target.id === 'addButton' ) {
        addToList()
        addInput.value = ''
    }

    if ( target.id === 'addInput' && e.key === 'Enter' ) {
        addToList()
        addInput.value = ''
    }

    if ( target.classList.contains('added__remove') ) {
        const url = target.getAttribute('data-url')
        removeFromList(url)
    }
    
    if ( target.id === 'downloadButton' ) {
        download()
    }

}

const handleMainRequest = ( channel, callback ) => {
    window.electronAPI.handle( channel, ( event, data ) => function( event, data ) {
        callback( data )
    }, event);
}


// ===================================
// Start
// ===================================
window.electronAPI.getSources()

addInput.focus()
addInput.addEventListener('keydown', handleEvent)
document.addEventListener('click', handleEvent)
openDownloadsButton.addEventListener('click', openDownloads)

handleMainRequest('terminal-output', addTextToTerminal)
handleMainRequest('get-sources', setInitialSources)
