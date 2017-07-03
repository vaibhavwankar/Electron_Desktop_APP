const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
let mainWindow
var path = require('path')


const template = [
  {
    label: 'Reload',
    click: function () {
      mainWindow.loadURL(`file://${__dirname}/index.html`)
    }
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Updates',
        click: function () {
          let child = new BrowserWindow({
            parent: mainWindow,
            modal: true,
            show: false,
            width: 550,
            height: 500,
            icon: 'build/32x32.png'
          })
          child.loadURL(`file://${__dirname}/update.html`)
          child.show()
          child.on('closed', function () {
            child = null
          })

        }
      },

    ]
  },
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    show: false,
    titleBarStyle: 'hidden',
    icon: ('../build/32x32.png')
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.openDevTools()


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


const updater = require('electron-simple-updater');
updater.init({
  checkUpdateOnStart: false,
  autoDownload: false
});
