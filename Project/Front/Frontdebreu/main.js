const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let screen;

const renderApp = function() {
    // create the browser window
    screen = new BrowserWindow({
        width: 1280,
        height: 720,
    });
    // render the required website/entrypoint
    screen.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //screen.loadURL('file://${__dirname}/index.html');
    // Open the DevTools.
    //screen.webContents.openDevTools();

    // dereference the screen object when the window is closed
    screen.on('closed', function() {
        screen = null;
    });
};

// call the renderApp() method when Electron has finished initializing
app.on('ready', renderApp);

// when all windows are closed, quit the application on Windows/Linux
app.on('window-all-closed', function() {
    // only quit the application on OS X if the user hits cmd + q
    if (process.platform !== 'darwin') {
    app.quit();
}
});

app.on('activate', function() {
    // re-create the screen if the dock icon is clicked in OS X and no other
    // windows were open
    if (screen === null) {
    renderApp();
}
});