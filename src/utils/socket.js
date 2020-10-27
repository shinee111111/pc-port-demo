function socketServer(mainWindow) {
  const Koa = require('koa');
  const app = new Koa();
  const server = require('http').Server(app.callback());
  const io = require('socket.io')(server);
  const cors = require('koa-cors')
  const sp = require('./serial')
  const port = 20020;

  const { webContents } = mainWindow

  require('./chalk')

  app.use(cors())

  server.listen(port, () => {
    console.green(`app run at : http://127.0.0.1:${port}`);
  });

  io.on('connection', socket => {

    socket.on('disconnect', () => {
      console.red('已断开socket')
      webContents.send('log', '已断开socket')
    });

    console.green('已连接socket')
    webContents.send('log', '已连接socket')

    socket.on('getAllSerialPortList', data => {
      console.log('server is getting allSerialPortList ...')
      webContents.send('log', 'server is getting allSerialPortList ...')

      // 开始获取串口列表
      sp.getSerialPortList().then((rs) => {
        socket.emit('getAllSerialPortList', rs)
        webContents.send('log', rs)
      })

    });

  });

}

module.exports = socketServer