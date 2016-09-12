
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static("./public"));
app.get('/:name', function(req, res){
  res.json(eval(req.params.name));
});

io.on('connection', function(socket){
  socket.on('location', function(data){
    io.emit('location', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;



//////SIMULATION DATA

const A = {
    name: 'A',
    data: [{
        lat: 40.804528,
        lng: -73.957717
    }, {
        lat: 40.801410,
        lng: -73.960206
    }, {
        lat: 40.798551,
        lng: -73.963339
    }, {
        lat: 40.795725,
        lng: -73.966215
    }, {
        lat: 40.794458,
        lng: -73.971279
    }]
};

const B = {
    name: 'B',
    data: [{
        lat: 40.708536,
        lng: -73.961019
    }, {
        lat: 40.712584,
        lng: -73.968404
    }, {
        lat: 40.717392,
        lng: -73.984053
    }, {
        lat: 40.719303,
        lng: -73.990116
    }, {
        lat: 40.723011,
        lng: -73.992948
    }]
};

const C = {
    name: 'C',
    data: [{
        lat: 40.705688,
        lng: -74.070226
    }, {
        lat: 40.724504,
        lng: -74.060504
    }, {
        lat: 40.733283,
        lng: -74.049715
    }, {
        lat: 40.728688,
        lng: -74.031923
    }, {
        lat: 40.728385,
        lng: -74.007166
    }]
};
