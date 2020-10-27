// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 允许渲染进程 使用process模块
// app.allowRendererProcessReuse = false;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.resolve(__dirname, 'src/page/index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow()

  // 启动 websocket 服务器
  require('./src/utils/socket.js')(mainWindow)

  // 托盘事件
  require('./src/utils/tray.js')(mainWindow)

  // 渲染进行最小化
  mainWindow.on('minimize', (e) => {
    console.log('minimize')
  })

  // 渲染进程关闭
  mainWindow.on('close', (e) => {
    mainWindow.hide()
    mainWindow.setSkipTaskbar(true)
    e.preventDefault()
  })

  // 渲染进程呼出
  mainWindow.on('show', (e) => {
    mainWindow.setSkipTaskbar(false)
    e.preventDefault()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process