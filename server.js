const express = require('express');
const uuid4 = require('uuid/v4');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var nodes = [];

io.on('connection', (socket) => {
  socket.id = uuid4();
  //create node custom node object to manage instances
  nodes.push(socket);
  console.log(socket.id + ': user connected');

  socket.on('sendJob', () => {
    workDelegator.job()
  });

  socket.on('disconnect', () => {
    //remove node from list
    nodes.forEach( (node, i) => {
      if(node.id == socket.id) {
        delete nodes[i]
      }
    });
    console.log(socket.id + ': user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
