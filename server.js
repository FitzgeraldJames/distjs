const express = require('express');
const uuid4 = require('uuid/v4');
const Node = require('./src/Node');
const workDelegator = require('./src/workDelegator')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin/index.html');
});

app.get('/embed', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

/**
 * A list to hold all the Node objects that are currently connected to the network
 */
const nodes = [];
/**
 * Function to turn list of Node objects into a list of serialized objects to be userAgent
 * @param {list} nodes - a list of Node objects
 */
function serialize(nodes) {
    const n = [] ; nodes.forEach(node => n.push(node.serialize()))
    return n
}



const admin = io.of('/admin')
admin.on('connection', socket => {
    socket.emit('nodes', serialize(nodes));
})

io.on('connection', socket => {
  //assign users a unique address
  socket.id = uuid4();
  //create node custom node object to manage instances
  let node = new Node(socket);
  nodes.push(node);
  console.log(node.id + ': user connected');

  socket.on('sendJob', () => {
    workDelegator.job()
  });

  socket.on('disconnect', () => {
    //remove node from list
    console.log(serialize(nodes))
    nodes.forEach( (node, i) => {
      if(node.id == socket.id) {
        delete nodes[i]
      }
    });
    console.log(socket.id + ': user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
