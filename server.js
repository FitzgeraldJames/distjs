const express = require('express');
const uuid4 = require('uuid/v4');
const Node = require('./src/Node');
const workDelegator = require('./src/workDelegator')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//HTTP Routing
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin/index.html');
});

app.get('/embed', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

// TODO? Make this node list and helper methods a class
/**
 * A list to hold all the Node objects that are currently connected to the network
 */
const nodes = [];
/**
 * Function to turn list of Node objects into a list of serialized objects to be userAgent
 * @param {list} nodes - a list of Node objects
 * @return {list} containing the serialized version of the nodes list
 */
function serialize(nodes) {
    const n = [] ; nodes.forEach(node => n.push(node.serialize()))
    return n
}
//Delegator Initialisation
let Delagator = new Delagator

// Websocket Routing
/**
 * Handles the socket io for the admion page for graphing and statitics
 */
const admin = io.of('/admin')
admin.on('connection', socket => {
    socket.emit('nodes', serialize(nodes));
})
/**
 *  Deal with worker connections
 */
io.on('connection', socket => {
  //assign users a unique address
  socket.id = uuid4();
  //create node custom node object to manage instances
  let node = new Node(socket);
  nodes.push(node);
  console.log(node.id + ': user connected');

  //WORK REQUESTS
  socket.on('job', () => {
    Delegator.job()
  });
  socket.on('job', () => {
    workDelegator.batch()
  });
  // TODO remove uptime testing method
  socket.on('upTime', () => {
    nodes.forEach( (node, i) => {
      if(node.id == socket.id) {
        console.log(node.upTime);
      }
    });
  });
  //manage disconnect
  socket.on('disconnect', () => {
    //remove node from list
    nodes.forEach( (node, i) => {
      if(node.id == socket.id) {
        node.disconnect();
      }
    });
    //console.log(serialize(nodes))
    console.log(socket.id + ': user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
