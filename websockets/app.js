
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("./public"));
app.use('/assets',express.static('./public/assets/'));


io.on('connection', function(socket){
  socket.on(`session`, function(data){
    console.log(`Incoming data from session ${data.sessionId}...`);
    io.emit(`session_${data.sessionId}`, data);
  });
});


let sessionId = 0;
app.get('/session/init', function(req,res){
  sessionId++;
  res.json(sessionId);
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
