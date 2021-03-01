import { 
    app, 
    BrowserWindow
} from 'electron'


var MainWindow: BrowserWindow;

const screen: Function = function (name: string): {index: string} {
    return {
        index: `./src/screens/${name}/index.html`
    }
}

const CreateWindow: Function = async function (path?: string): Promise<void> {
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
    MainWindow.loadFile(path || screen('main').index)
}

app.on('ready', () => {
    CreateWindow()
})

