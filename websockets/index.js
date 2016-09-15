
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static("./public"));

let sessionId =
app.get('/init', function(req, res){

});


io.on('connection', function(socket){
  console.log('1.1')
  socket.on(`session`, function(data){
    console.log('1>incoming data...');
    io.emit(`session${sessionId}`, data);
  });
});


// app.get('/:name', function(req, res){
//   res.json(eval(req.params.name));
// });

// let sessionId = 0;
// app.get('/api/init', function(req,res){
//   sessionId++;
//   res.json(sessionId);
//
//   io.on('connection', function(socket){
//     socket.on(`session${sessionId}`, function(data){
//       io.emit(`session${sessionId}`, data);
//     });
//   });
// });



http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
