//Better performance by doing bellow tings
//Clustering for horizontaly scaling the game 
//You can buy better server services for verticaly scaling the game
var sticky = require('sticky-session'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    cluster = require('cluster'),
    port = process.env.PORT || 3000;


  var app = express(), io;

  server = http.Server(app);
  app.get('/', function (req, res) {
    console.log('send message by worker: ' + cluster.worker.id);
    res.send('Socket.io on Cluster! You work on cluster worker id='+cluster.worker.id);
});

  io = socketIO(server);

  // Add your socket.IO connection logic here
  // Here we inplement all our code


if(!sticky.listen(server,port))
{
  server.once('listening', function() {
    console.log('Server started on port '+port);
  });

  if (cluster.isMaster) {
    console.log('Master server started on port '+port);
  } 
}
else {
    console.log('- Child server started on port '+port+' case worker id='+cluster.worker.id);
  }