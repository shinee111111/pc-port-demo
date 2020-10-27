const { app, Tray, Menu } = require("electron")
const path = require('path')

let tray = null // 设为外部变量，防止被回收

function setTray(mainWindow) {
  const iconPath = path.join(__dirname,'../../static/favicon.ico')
  tray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出', click: () => {
        mainWindow.destroy()
      }
    }
  ])

  tray.setToolTip('创智源连接窗口')

  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    mainWindow.show()
  })

}

module.exports = setTray