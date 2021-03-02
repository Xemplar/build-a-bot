import { 
    app, 
    BrowserWindow
} from 'electron'

import path = require('path')

import ts_remover_html from './lib/parse_html_hrefs'

var MainWindow: BrowserWindow;

/**
 * Returns file path for a screen html file
 * @param name 
 */
const CreateWindow: Function = async function (path: string = "src/screen/index.html"): Promise<void> {
    if (!MainWindow) {
        MainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            resizable: false,
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                enableRemoteModule: true,
                nativeWindowOpen: true
            }
        })
    }
    MainWindow.loadFile(path)
}

app.on('ready', async () => {
    await ts_remover_html(__dirname)
    CreateWindow()
})

