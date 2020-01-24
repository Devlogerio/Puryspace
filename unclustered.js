//*** Profiling on server and client is a little bit diffrent but so important, profiling means Analyze where the computer spends most of its time in order to optimize the script and make sure your game, client and server runs fast, for this go watch number 15 video ***
//whenever you want to spy a value in this document you should use eval("for example(variable name): SOCKET_LIST"); command
//when we are uploading our game we should know all of our dependencies(libraries), so its important, right here we have express, socket.io and mongojs, http us also required but http is built in nodejs so we dont need to add it to our package.json, infact everything that we npm install needs to be a part of our dependencies in package.json, you should definetly check the 13 video minute 8 its sooo important, things i didnt wrote here about package.json for heroku
//we trmporary remove all the data base related stuff for uploading this game, the things that have been changed are: two lines bellow, isValidPassword section, isUserNameTaken section, addUser. so at the end when you wanted to add your database you should take them back to normal
//var mongojs = require('mongojs');//we add mongojs library, Heroku hosting will look for our dependencies in package.json file in our project
//we also did "npm istall v8-profiler" for profiling the server, you dont to put it inside package.json, its for profiling the server
var db = null //mongojs('localhost:27017/myGame',['account','progress']);//localhost: name of host, 27017: where database listenes to and can be access fom data base startup, myGame: name of our database, ['account','progress']: here we specify all the collections that we are going to use, when we use null database its like a fake one so we did something to addUser isValidPassword and... to accept anything
    //db.account.insert({username:"b",password:"bob"});//after above insertions we can now simply do the exact queries we use in mongodb but this time from our server and it works

require('./entity'); //load a file is with requre('path and name of the file without the type in this case without the .js'); ./ means its in the current directory, for going back one directory u use ../
//require('./client/js/inventory'); //load another file

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000); //port with heroku is a bit diffrent and we should use a port instead of 2000, for offline just write 2000 inside ()
console.log('Server started.');

SOCKET_LIST = {}; //its a global variable to have access to it from everywhere, make sure to dont mess it up



var DEBUG = true; //we add it becouse of it be true players can do anything, crashing, cheating, hacking, anything to the server from client side by eval, so we use this, when you are uploading thismyou will set DEBUG to false


//var USERS = {//this will contain all the users
//	//username:password
//	"bob":"asd",
//	"bob1":"bob",
//	"bob2":"ttt",
//}
//we use call back function becouse we dont know how much it takes to give us the answer, maybe 1min maybe 1 sec so if we use a callback function it will wait for the result then do the action other wise it will gives us an undifined.
//everytime we have an action that happen somehwere in the future, whe dont really know when, or in some cases like a settimeout we know when, we Use Call back. call back is a function that we use as the second parameter of the action or function and in that function we call our the data, like sockets.on('connection',function(data){}), here, the function(data) is a call back function. becouse we dont know when 'connection' going to happen so we use a call back function
//ex: isValidPassword(data,function(resault){   });
var isValidPassword = function(data, cb) { //this function will compair given password with the saved passwords
    return cb(true) //comment or delete this whenever you wanted to upload this, if you delete this you have to uncomment two lines bellow
        /* db.account.find({username:data.username,password:data.password},function(err,res){//this is the query that gives us every simgle row from database that match to what we asked for, this is a callback function
        	if(res.length > 0)//or if(res[0]), if the lengh of res(resault) be more than 0 it means that database found a match and sent it to us
        		cb(true)//so we set the cb(call back resault) to true
        	else
        		cb(false)//so we set the cb(call back resault) to false
        });*/
}
var isUserNameTaken = function(data, cb) { //this function will see if the username is already in the list
    return cb(false) //comment or delete this whenever you wanted to upload this, if you delete this you have to uncomment two lines bellow
        /*db.account.find({username:data.username},function(err,res){//this is the query that gives us every simgle row from database that match to what we asked for, this is a callback function
        	if(res.length > 0)//or if(res[0]), if the lengh of res(resault) be more than 0 it means that database found a match and sent it to us
        		cb(true)//so we set the cb(call back resault) to true
        	else
        		cb(false)//so we set the cb(call back resault) to false
        });*/
}
var addUser = function(data, cb) { //this function will see if the username is already in the list
    return cb(); //comment or delete this whenever you wanted to upload this, if you delete this you have to uncomment two lines bellow
    /*db.account.insert({username:data.username,password:data.password},function(err){//here we insert a new row to our database table, in insertion there is no res(resault) but only err(error)
		cb();
	});*/
}


var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) { //when a player connects, all the things that happen inside this function is called and done whenever a player is connected so the player has not signed in yet but it will be called whenever he/she connects
    socket.id = Math.random(); //assign an id to socket
    SOCKET_LIST[socket.id] = socket; //list of all online sockets


    socket.on('signIn', function(data) { // this function should not handle the player events so we call the onDisconnect and onDisconnect handles it, the package we recieved here(data)contais: //{username,password}
        //we use call back function becouse we dont know how much it takes to give us the answer, maybe 1min maybe 1 sec so if we use a callback function it will wait for the result then do the action other wise it will gives us an undifined.
        //isValidPassword(data, function(res) { //this is a callback function(), we pass a parameter with the resault, in this case 'res',once again isValidPassword is a call back so the second parameter is a function with resault and in that function we do our things
        //if (res) { //we see if the paswword is valid or not
        var username = data.username;//we get an instance of username
        var party = data.party;//we get an instance of username
        var color = data.color;
        if(username.length <= 10 && party.length <= 15 && color.length <= 15){//user name should not be more than specific length
            if(data.username === '' )//if no username is choosen
                username = "Noob " + Math.round(Math.random() * 1000);//we set the name to a random number noob
            Player.onConnect(socket, username, party, color); //this function will be called,we give it the socket and the username, (socket contains some data, and becouse we are in the socket itselg so we allways access to the right socket), we also get the party code and send it to player creation so we know friends and foes, we also get choosen color
        }
        else{
            socket.emit('signInResponse', {//we alert the client about it
                success: false
            }); //we emit to client the success false
        }
        //} 
        // else {
        //     socket.emit('signInResponse', {
        //         success: false
        //     }); //we emit to client the success false
        // }
        //});
    });
    // socket.on('signUp', function(data) { // this function should nut handle the player events so we call the onDisconnect and onDisconnect handles it
    //     isUserNameTaken(data, function(res) { //isUserNameTaken  is a call back so the second parameter is a function with resault and in that function we do our things
    //         if (res) {
    //             socket.emit('signUpResponse', {
    //                 success: false
    //             }); //we emit to client the success false
    //         } else {
    //             //we use call back function becouse we dont know how much it takes to give us the answer, maybe 1min maybe 1 sec so if we use a callback function it will wait for the result then do the action other wise it will gives us an undifined.
    //             addUser(data, function(res) { //adding user is a call back so the second parameter is a function with resault and in that function we do our things
    //                 socket.emit('signUpResponse', {
    //                     success: true
    //                 }); //we emit to client the success true
    //             });
    //         }
    //     }); //we see if the paswword is valid or not
    // });



    socket.on('disconnect', function() { // this function should nut handle the player events so we call the onDisconnect and onDisconnect handles it
        Player.onDisconnect(socket);
        delete SOCKET_LIST[socket.id];
    });
    //socket.on('sendMsgToServer',function(data){//we listen to the sendMsgToServer and get the package from in and send it to ther players, if we do this here so we also send this message to players who has not signed in yet, so we only want the player send messages to the server if he is online, so we put it in Player.onConnect so it will be called only if player is connected
    //	var playerName = ("" + socket.id).slice(2,7);//herew we get the id of player (by slicing we get a slice of the id) to be ware of who is sending it
    //for(var i in SOCKET_LIST){//we loop throw every socket in our list
    //	SOCKET_LIST[i].emit('addToChat',playerName + ' :' + data);//we send the package to each of them, the package is the message someone sent and we send it by his id
    //}
    //});
    socket.on('evalServer', function(data) { //we listen to the sendMsgToServer and get the package from in and send it to ther players.
        try {
            if (!DEBUG) //if DEBUG is false
                return; //so if DEBUG is false, no one can sneak here in the server
            res = eval(data);
            socket.emit('evalAnswer', res); //we send the eval resaults to the person who asked it, the socket is what we are already in, the same socket sends it the same will get it. we wont loop throw sockets in SOCKET_LIST.
        } catch (err) {
            socket.emit('evalAnswer', err.message); //we send the eval resaults to the person who asked it, the socket is what we are already in, the same socket sends it the same will get it. we wont loop throw sockets in SOCKET_LIST.
        }
    });
});




//game main loop
setInterval(function() { //global loop should not beware of how we update a player so we call player.update
    // the code bellow was not clean so we sent have of it to entity file
    //var packs = Entity.getFrameUpdateData();//becouse we have sent initPack and removePack to the Entity file so we cant have access to them so we made a class under Entity and the Entity will give it to us so we cant mess with their data here, by the way we call it Packs so its diffrent with the bellow one which is called pack
    ////var pack = Player.update(); 
    //var pack = {//update the player and bullet and gets the packages that is gonna send to all, the package is changed now and its a list of diffrent packages which is array, player package and bullet package, in fact we create a package containing all the updated data about tthe player and bullet
    //	player:Player.update(),
    //	bullet:Bullet.update(),//right now we create bullets in this update section of bullet
    //}
    //
    //
    ////sending data to each player containing step 1,2,3
    //for(var i in SOCKET_LIST){//we loop throw all the sockets
    //	var socket = SOCKET_LIST[i];
    //	//socket.emit('newPositions',pack);//we emit all the position to them via the package we recieved,we send the pack we filled above with newPosition message, when the client is modified into 3 section we use update message as bellow
    //	socket.emit('init',packs.initPack);//1) we filled the initPack whenever we created a new player or bullet
    //	socket.emit('update',pack);//2) we filled the pack above, we fill it in everyframe with new data about players and bullets in this same setInterval in fact we filled it right above here
    //	socket.emit('remove',packs.removePack);//3) we filled the initPack whenever we removed a new player or a bullet
    //}
    ////we reset them to empty every single frame otherwise we will have overflow, we do this so next time we sent initPack if no new playeror bullet is created so we send an empty data same thing happens for removePack, but pack which is the update of players and bullets is diffrent
    //packs.initPack.player = [];//empty array
    //packs.initPack.bullet = [];//empty array
    //packs.removePack.player = [];//empty array
    //packs.removePack.bullet = [];//empty array

    //sending data to each player containing step 1,2,3
    var packs = Entity.getFrameUpdateData();
    for (var i in SOCKET_LIST) { //we loop throw all the sockets
        var socket = SOCKET_LIST[i];
        //socket.emit('newPositions',pack);//we emit all the position to them via the package we recieved,we send the pack we filled above with newPosition message, when the client is modified into 3 section we use update message as bellow
        socket.emit('init', packs.initPack); //1) we filled the initPack whenever we created a new player or bullet
        socket.emit('update', packs.updatePack); //2) we filled the pack above, we fill it in everyframe with new data about players and bullets in this same setInterval in fact we filled it right above here
        socket.emit('remove', packs.removePack); //3) we filled the initPack whenever we removed a new player or a bullet
    }
}, 1000 / 25); //every single frame