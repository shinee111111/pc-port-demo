const { ipcRenderer } = require('electron')

window.onload = () => {
  const h1 = document.querySelector('#log')
  // 监听来自主进程的信息
  ipcRenderer.on('log', (info, msg) => {
    console.log(msg)
    try {
      msg = JSON.stringify(msg)
    } catch (e) {

    }
    h1.innerHTML = msg
  })
}