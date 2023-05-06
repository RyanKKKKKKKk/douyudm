let express = require('express');
let  cors = require('cors');
const douyu = require('douyudm')

//设置房间号，初始化
const roomId = 100
const room = new douyu(roomId)
let nowMessage = "";
let gift = "";
//系统事件
room.on('connect', function () {
    console.log('[connect] roomId=%s', this.roomId)
})
room.on('disconnect', function () {
    console.log('[disconnect] roomId=%s', this.roomId)
})
room.on('error', function(err) {
    console.log('[error] roomId=%s', this.roomId)
})

//消息事件
room.on('chatmsg', function(res) {
    nowMessage = `<lv ${res.level}> [${res.nn}] ${res.txt}`
    console.log('[chatmsg]', `<lv ${res.level}> [${res.nn}] ${res.txt}`)
})
room.on('loginres', function(res) {
    console.log('[loginres]', '登录成功')
})
room.on('uenter', function(res) {
    console.log('[uenter]', `${res.nn}进入房间`)
})
room.on('spbc', function(res) {
    gift = `------------- 感谢[${res.sn}] 赠送的 ${res.gn}x${res.gc}`
    console.log(`------------- 感谢[${res.sn}] 赠送的 ${res.gn}x${res.gc}`)
})
//开始监听
room.run()


let app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send({message:nowMessage,gift:gift});
  nowMessage = ""
  gift = ""
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})