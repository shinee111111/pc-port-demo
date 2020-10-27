window.onload = () => {
  const $ = (selector) => document.querySelector(selector)

  const btn1 = $('#btn1')
  const btn2 = $('#btn2')
  const btn3 = $('#btn3')

  let ws = null

  // 连接
  btn1.onclick = () => {
    if(ws) {
      return
    }
    ws = io('ws://127.0.0.1:20020')
    console.log(ws)

    ws.on('getAllSerialPortList', data => {
      console.log(data)
    })

  }

  // 断开
  btn2.onclick = () => {
    ws.disconnect()
    if(!ws.connected && ws.disconnected) {
      ws = null
    }
    console.log(ws)
  }

  // 获取串口信息
  btn3.onclick = () => {
    ws.emit('getAllSerialPortList', 'faster please')
  }
}
