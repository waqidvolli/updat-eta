
var express = require("express");
var path = require("path");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors');
app.use(cors());
// app.use(express.static("./public"));
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

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/welcome.html'));
});

app.get('/track.html/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/track.html'));
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
