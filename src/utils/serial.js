const SerialPort = require("serialport")

class SerialConstroller {
  constructor() { }

  getSerialPortList() {
    return new Promise((resolve, reject) => {
      SerialPort.list().then(
        ports => resolve(ports),
        err => reject(err)
      )
      // 竞争异常
      setTimeout(() => {
        reject(['超时获取'])
      }, 1000)
    })

  }
}

module.exports = new SerialConstroller()