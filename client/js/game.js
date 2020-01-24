
    //the client have an state means that it remembers players and everything and update them per time




    //global related things
    var canvas = document.getElementById("canvas"); //in here we made another variable called canvas in this one we have access to the canvas as an html directly
    var ctx = canvas.getContext("2d"); //getting(adding) element from html and assign a var to it for javascript usage
    var canvasMap = document.getElementById("canvas-map"); //getting(adding) element from html and assign a var to it for javascript usage
    var ctxMap = canvasMap.getContext("2d"); //getting(adding) element from html and assign a var to it for javascript usage
    var canvasUi = document.getElementById("canvas-ui"); //getting(adding) element from html and assign a var to it for javascript usage
    var ctxUi = canvasUi.getContext("2d"); //getting(adding) element from html and assign a var to it for javascript usage
    var topTenShowDiv = document.getElementById("topTenShowDiv"); //getting(adding) element from html and assign a var to it for javascript usage
    var chatConsole = document.getElementById("chatConsole");//getting(adding) element from html and assign a var to it for javascript usage
    var respawnKilledBy = document.getElementById("respawnKilledBy");//getting(adding) element from html and assign a var to it for javascript usage
    var gameOVerKilledBy = document.getElementById("gameOVerKilledBy");//getting(adding) element from html and assign a var to it for javascript usage
    
    
    //var gpsStyle = document.getElementById('gps');
    //var gps = document.getElementById("gps").getContext("2d");
    //ctxMap.font = '30px Arial';//changing the style of canvas with javascitp

    //list of all posiible 16/9  ratios can be found in https://pacoup.com/2011/06/12/list-of-true-169-resolutions/ link
    var WIDTH = 1280; //(logical pixel)these are constant variable, these things are so easy to be changed later on, this is going to be for the logic pixels, all the logic will be based on this number
    var HEIGHT = 720; //(logical pixel)these xare constant variable, these things are so easy to be changed later on, this is going to be for the logic pixels, all the logic will be based on this number
    var CANVAS_WIDTH = 1280; //(rendering pixel)these are constant variable, these things are so easy to be changed later on, this is going to be the scale, for drawing we use this number
    var CANVAS_HEIGHT = 720; //(rendering pixel)these xare constant variable, these things are so easy to be changed later on, this is going to be the scale, for drawing we use this number
    var MAP_RADIUS = 10000; //radius of the map, this is actually te width and eight of a rectangle
    var STAR_NUMBER = 5000;//number of particles that acts as stars
    var worldView = 800;//the distance that a player can actually see things in pixel
    var fps = 40;//frame per seconds
    var socket = io(); //we create a socket by calling io after adding the socket.io to our project with npm
    //var socket = io.connect('https://puryspace.herokuapp.com/'); //we create a socket by calling io after adding the socket.io to our project with npm
    
    var backCanvas = document.getElementById("backCanvas");//this is for background which in this case wecreateour particles in
    var backCtx = backCanvas.getContext("2d");//here we get the background as a 2d canva for graphical usage

    var gamePage = document.getElementById("gamePage"); //in here we made another variable called canvas in this one we have access to the canvas as an html directly
    var howItsMadePage = document.getElementById("howItsMadePage"); //in here we made another variable called canvas in this one we have access to the canvas as an html directly
    var wikiPage = document.getElementById("wikiPage"); //in here we made another variable called canvas in this one we have access to the canvas as an html directly
    var contactPage = document.getElementById("contactPage"); //in here we made another variable called canvas in this one we have access to the canvas as an html directly
    menueClick = function(button){
        if(button === 'GAME'){
            gamePage.style.display = 'block';
            howItsMadePage.style.display = 'none';
            wikiPage.style.display = 'none';
            contactPage.style.display = 'none';
        }
        if(button === 'HOW ITS MADE'){
            gamePage.style.display = 'none';
            howItsMadePage.style.display = 'block';
            wikiPage.style.display = 'none';
            contactPage.style.display = 'none';
        }
        if(button === 'WIKI'){
            gamePage.style.display = 'none';
            howItsMadePage.style.display = 'none';
            wikiPage.style.display = 'block';
            contactPage.style.display = 'none';
        }
        if(button === 'CONTACT'){
            gamePage.style.display = 'none';
            howItsMadePage.style.display = 'none';
            wikiPage.style.display = 'none';
            contactPage.style.display = 'block';
        }
    }

    let resizeCanvas = function(fromGunChange) { //for resizing the canva if this be called the canvas will be resized

        //note that we have three canvas here, canvas which is for game and canvasMap which is for the ui of the game and backCanvas for background
        var innerWidth = window.innerWidth - 4;
        var innerheight = window.innerHeight - 4;
        CANVAS_WIDTH = innerWidth; // we set the HEIGHT to the width of the screen and -4 is for removing the scroll bar
        CANVAS_HEIGHT = innerheight; // we set the HEIGHT to the height of the screen and -4 is for removing the scroll bar
        //you can change the display ratio here
        let ratio = 16 / 9;
        if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio)
            CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
        else
            CANVAS_HEIGHT = CANVAS_WIDTH / ratio;

        /*//this might fix the center screen problem but it sometimes misses the innerWidth and innerHeight i dont know why
        if(CANVAS_WIDTH < innerWidth){
            canvas.style.marginLeft = (innerWidth - CANVAS_WIDTH)/2;
            canvasMap.style.marginLeft = (innerWidth - CANVAS_WIDTH)/2;
        }
        if(CANVAS_HEIGHT < innerheight){
            canvas.style.marginTop = (innerheight - CANVAS_HEIGHT)/2;
            canvasMap.style.marginTop = (innerheight - CANVAS_HEIGHT)/2;
        }
        */

        //this is for the content of the canvas, rendering pixels are for the canvas
        backCanvas.width = WIDTH; //for the logic
        backCanvas.height = HEIGHT; //for the logic
        canvas.width = WIDTH; //for the logic
        canvas.height = HEIGHT; //for the logic
        canvasMap.width = WIDTH; //for the logic
        canvasMap.height = HEIGHT; //for the logic
        canvasUi.width = WIDTH; //for the logic
        canvasUi.height = HEIGHT; //for the logic
        
        //whenever you alter the canvas, all the setting will be reset so you need to set them all again


        //you can change the graphocs to low and hight by bellow codes
        ctxMap.font = '30px Arial'; //changing the style of canvas with javascitp
        ctxUi.font = '30px Arial'; //changing the style of canvas with javascitp
        ctxMap.mozilaImageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctxMap.msSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctxMap.imageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctx.mozilaImageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctx.msSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctx.imageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctxUi.mozilaImageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctxUi.msSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury
        ctxUi.imageSmoothingEnabled = false; // better graphics for pixel art, if you dont use it, the images will be blury

        //this is for the size of the canvas
        var cw = '' + CANVAS_WIDTH + 'px';
        var ch = '' + CANVAS_HEIGHT + 'px';
        canvas.style.width = cw; //for scaling we change the size(zooming methode)
        canvas.style.height = ch; //for scaling we change the size(zooming methode)
        canvasMap.style.width = cw; //for scaling we change the size(zooming methode)
        canvasMap.style.height = ch; //for scaling we change the size(zooming methode)
        canvasUi.style.width = cw; //for scaling we change the size(zooming methode)
        canvasUi.style.height = ch; //for scaling we change the size(zooming methode)
        backCanvas.style.width = cw; //for scaling we change the size(zooming methode)
        backCanvas.style.height = ch; //for scaling we change the size(zooming methode)
        
        

    }
    resizeCanvas(false); //we manually call resize once becouse if not the size will be small untill the player resize the screen


    window.addEventListener('resize', function() { //this event will be called every time resizing happens
        resizeCanvas(false); //resizes the canvas
    });




    //everything related to signIn
    var signDiv = document.getElementById("signDiv"); //getting(adding) element from html and assign a var to it for javascript usage
    var signDivUsername = document.getElementById("signDiv-username"); //getting(adding) element from html and assign a var to it for javascript usage
    var signDivColor = document.getElementById("signDiv-color"); //getting(adding) element from html and assign a var to it for javascript usage
    var signDivSignIn = document.getElementById("signDiv-signIn"); //getting(adding) element from html and assign a var to it for javascript usage
    //var signDivSignUp = document.getElementById("signDiv-signUp"); //getting(adding) element from html and assign a var to it for javascript usage
    //var signDivPassword = document.getElementById("signDiv-password"); //getting(adding) element from html and assign a var to it for javascript usage
    var partyCode = document.getElementById("signDiv-partycode"); //getting(adding) element from html and assign a var to it for javascript usage
    var gameDiv = document.getElementById("gameDiv"); //getting(adding) element from html and assign a var to it for javascript usage
    var respawnDiv = document.getElementById("respawnDiv");
    var gameOverDiv = document.getElementById("gameOverDiv");
    var itemShopButton = document.getElementById("itemShopButton");
    var shopDiv = document.getElementById("shopDiv");
    
    signDivColor.value = '#'+(Math.random()*0xFFFFFF<<0).toString(16);//generating a random color
    var loading = false;//if the game is loading so player cant signIn again
    signDivSignIn.onclick = function() { //whenever user sign in
        
        if(signDivUsername.value.length <= 10 && partyCode.value.length <= 15){
            if(loading === false){//if it was clicked before
                socket.emit('signIn', {
                    username: signDivUsername.value,//user name
                    //password: signDivPassword.value,
                    party: partyCode.value,//code for playing together
                    color: signDivColor.value,//color
                }); //we emit a package to the server and send usernamePassword and partycode so friends and foes will be known
                loading = true;//we set the loading to true
                signDivSignIn.style.backgroundColor = "gray";
                signDivSignIn.innerHTML = "Loading..."
            }
        }
        else if(signDivUsername.value.length > 10 && partyCode.value.length > 15){
            signDivUsername.style.color = "red";
            partyCode.style.color = "red";
        }
        else if(signDivUsername.value.length > 10){
            signDivUsername.style.color = "red";
        }
        else if(partyCode.value.length > 15){
            partyCode.style.color = "red";
        }
    }
        //we dont signUp anymore
        // signDivSignUp.onclick = function() { //whenever user sign up
        //     socket.emit('signUp', {
        //         username: signDivUsername.value,
        //         password: signDivPassword.value
        //     }); //we emit a package to the server and send usernamePassword
        // }
    socket.on('signInResponse', function(data) { //we listen to signInResponse
        //loading = false;//we set the loading to true here but becouse we have set it before we dont need to change it again
        if (data.success === true) { //if it sends us success = true
            signDiv.style.display = 'none'; //we hide the signDiv
            gameDiv.style.display = 'inline-block'; //we display the gameDiv
        } else{
            loading = false;//we set the loading to true
            signDivSignIn.style.backgroundColor = "#dddddd";
            signDivSignIn.innerHTML = "Play"
                //alert("Sign in unsucessful."); //for the final and published project dont use alert, use a div or something for this, its not convinient to use alert, right now we dont use alert or anything
        }
    });
    // socket.on('signUpResponse', function(data) { //we listen to signUpResponse, data here can contain a message
    //     if (data.success) { //if it sends us success = true
    //         alert("Sign up sucessful."); //for the final and published project dont use alert, use a div or something for this, its not convinient to use alert}
    //     } else
    //         alert("Sign in unsucessful."); //for the final and published project dont use alert, use a div or something for this, its not convinient to use alert
    // });



    //everything related to the chat
    var chatText = document.getElementById("chat-text"); //getting(adding) element from html and assign a var to it for javascript usage
    var chatInput = document.getElementById("chat-input"); //getting(adding) element from html and assign a var to it for javascript usage
    var chatForm = document.getElementById("chat-form"); //getting(adding) element from html and assign a var to it for javascript usage

    socket.on('addToChat', function(data) { //add to chan listener, whenever it recieves data, it will add it to inner html of chat text
        //chatText.innerHTML += '<div>' + data + '</div>';
        var p = Player.list[data.id];
        if(p){
            p.msg = data.msg;
            removeChat(p);
        }
        //hideShowChat();
    });
    socket.on('evalAnswer', function(data) { //add to chan listener, whenever it recieves data, it will add it to inner html of chat text
        console.log(data); //its best not to add it to chat innerHTML, also chat doesnt show objects, list and ... so its more convinient if add it to the console by console.log(data);
        //chatText.innerHTML += '<div>' + data + '</div>';
    });

    chatForm.onsubmit = function(e) { //onsubmit this will listens to Enter button press on the element we gave it in this case its the chatForm, e is nessecary
        hideShowChat();//this will hide or show the chat text
        e.preventDefault(); //whenever we use onsubmit we must have a preventdefault() other wise the page will be refreshed each time we press enter on it, it prevents page from reloading but only reloads the form.

        if (chatInput.value.trim() !== '') {//if chat is not empty
            //if (chatInput.value[0] === '/') //if the first digit of our value is '/' then we are sending an eval command to server
            //    socket.emit('evalServer', chatInput.value.slice(1)); //we send the value to server but its an eval message and we remove the first digit from our value which is '/' then send it
            // else if (chatInput.value[0] === '@') { //we check if message starts with @ so its gonna be a private message (pm
            //     //we need to extract the username and the message from something like this: @bob,message << so everything after ,@, and before ',' is gonna be the username and everything after ',' is gonna be the message
            //     socket.emit('sendPmToServer', {
            //         username: chatInput.value.slice(1, chatInput.value.indexOf(',')), //chatInput.value.slice(1,chatInput.value.indexOf(',') << here we are slicing everything from the first character all the way to the first ','
            //         message: chatInput.value.slice(chatInput.value.indexOf(',') + 1), //chatInput.value.slice(chatInput.value.indexOf(',' + 1) << here we are slicing everything from one character after the first ',' all the way to the end
            //     });
            // } 
            if (chatInput.value.length <= 30) {
                socket.emit('sendMsgToServer', chatInput.value);
                chatInput.value = '';
            }
            chatInput.value = ''; //after sending the message to server we reset the value inside the chatIput to null as it most be
        }
    }

    var hideShowChat = function() {//this will hide or show chat text
        //chatText.scrollTop = chatText.scrollHeight;//we scroll to button
        //chatText.style.opacity = 1;//we make it bold and shine
        //chatText.style.opacity = 0.3;//we make it bold and shine
        if(chatText.style.display === 'none')
            chatText.style.display = 'block';//we bring back the chat text
        else
            chatText.style.display = 'none';//we remove the chat text
        //setTimeout(function() {//after 5 seconds
        //    chatText.style.opacity = 0.2;//we set it back to transparent
        //}, 5000);
    }
    var removeChat = function(player) {//this will remove player chat
        if(player){
            setTimeout(function() {//after 5 seconds
                player.msg = "";//we empty the player message
            }, 6000);
        }
    }

    function respawnMe(state) {//this will e called when clicking on respawn after death
        if (state === 'Respawn') {//if its a respawn
            socket.emit('respawn');//we ask for respawn
            respawnDiv.style.display = 'none';//we hide the respawn div
            chatConsole.style.display = 'block';//chat console goes hidden anyway
        } else if (state === 'Game Over') { //if game over
            location.reload(); //we reload the page
        }
    }

    shopShower = function(){
        if(shopDiv.style.display === "none"){
            shopDiv.style.display = "block";
        }
        else{
            shopDiv.style.display = "none";
        }
    }
    //everything related to the UI
    // var changeMap = function(){//here we implemented the function for changeMap button
    // 		socket.emit('changeMap');//this package will be send for making saver undrastand that player wants to change the map, this contains nothing, basicly by clicking the change map button we are going to send a package called changeMap with no content
    // };


    //var inventory = new Inventory(socket, false); //this null is how we know that we are on the client or the server
    // socket.on('updateInventory', function(items) { //when ever there is an update from inventory, item would be the list of items
    //     inventory.items = items; //we set the items
    //     inventory.refreshRender(); //we call the refresh render
    // });

    //everything related to the game
    var selfId = null //we need to be sure of who the client is, so we have a global selfId variable with null then we fill it by init pack
    var killedBy = ''; //we assign the killer name
    var gameOver = false; //here the page knows if game is over or not
    // var Img = {}; //We make an object for Images
    // Img.player = new Image(); //A new object which is Image
    // Img.player.src = '/client/img/player.png'; //we assign the src of image we want
    // Img.bullet = new Image(); //A new object which is Image
    // Img.bullet.src = '/client/img/bullet.png'; //we assign the src of image we want

    // Img.map	= {};//We make the map inside Img object an Object becouse we have 2 maps inside 1
    // Img.map['field'] = new Image();//A new object which is Image
    // Img.map['field'].src = '/client/img/map.png';//we assign the src of image we want
    // Img.map['forest'] = new Image();//A new object which is Image
    // Img.map['forest'].src = '/client/img/map2.png';//we assign the src of image we want

    var playerControllerGunList = [ //Text that will be shown in gun bar when scrolling, remember that this is a list so it is zero indexed means that starting from 0, note that we also must have this in server side
        'Default',
    ];
    var choosenGunText = 'Default';//we set the default choosen gun to Default :) so we dont need o sync it at init

    //note: instead of having a newPositions becouse its not efficient and bandwidth and speed will be taken, so we first save all the online player information then only update online players
    //socket.on('newPositions',function(data){//we listen to the newPostion message, right here the data is nut an array, its a list of arrays so we use data.player, data.bullet and ...
    //	ctx.clearRect(0,0,500,500);// cleaning the screan with the width and height of 500
    //	for( var i = 0 ; i < data.player.length; i++)//we loop throw all the players
    //	ctx.fillText(data.player[i].number,data.player[i].x,data.player[i].y);//we draw a text on screen at positions we got from data.player, and the text is the number we got(text,x,y)
    //	
    //			for( var i = 0 ; i < data.bullet.length; i++)//we loop throw all the bullets
    //	ctx.fillRect(data.bullet[i].x-5,data.bullet[i].y-5,10,10);//we draw a rect on screen at positions we got from data.bullet, by the way, bullets doesnt have a number so we draw a rect(x,y,with,height)
    //});
    //becouse of the note above, so we will need to have seprate what we have done above to 3 parts like bellow
    //1) init(initialization) package, whenever a new player or new bullet is created we will add it to init package, and it contains all the data, again: when new stuff created we add it here, so it contains all the data, its a big data collection however we only do it once means only when something is created
    //2) update package, update package only contains the difference, it is sent every frame but it is really tiny becouse it only sends the difference
    //3) remove package, it only sends the id of the thing that is going to be removed from init package
    //at the end we draw player in an set interval with the player and bullet list that we have, just like this newPositions but instead of looping data sent by the server we loop throw players and bullets that are stored in the lists

    //(init)here we create a container that contains all the data about players and bullets

    //var playerList = {};//first refelex can be make a list of players, but at the end we want more logic on client so its a better idea to creat an acual class for it
    var Player = function(initPack) { //so we make it exactly like the server, its a player constructor class, in orther to initialize a player we need the initialization package and that will be the package sent from the server
        //this initPack is exactly like param in server
        var self = {}; //we create an empty object
        self.id = initPack.id;
        self.username = initPack.username;
        self.party = initPack.party;
        self.color = initPack.color;
        self.x = initPack.x;
        self.y = initPack.y;
        self.hp = initPack.hp;
        self.hpMax = initPack.hpMax;
        self.fuel = initPack.fuel;
        self.fuelMax = initPack.fuelMax;
        self.score = initPack.score;
        self.map = initPack.map;
        self.mouseAngle = initPack.mouseAngle;
        self.gun = initPack.gun;
        self.nitroCapacity = initPack.nitroCapacity;
        self.nitroMax = 100;
        self.nitro = false;
        self.moveCall = false;
        self.destroyed = false;
        self.hasUpgrade = 0;
        self.life = initPack.life;
        self.msg = "";
        self.colorTest = function(){//test color function
            if(isColorValid(self.color) === 'Light'){//if color is dark
                self.color = shadeColor1(self.color, -10);//we lighten it by 20%
            }
            // if(isColorValid(self.color) === 'Dark'){//if color is dark
            //     self.color = shadeColor1(self.color, 20);//we lighten it by 20%
            // }
            // else if(isColorValid(self.color) === 'Too dark'){//if the color is too dark
            //     self.color = shadeColor1(self.color, 60);//we lighten it by 60%
            // }
        }
        self.colorTest();//we cal color test for the first time

        // self.afterdestroyed = function(){

        // }

        self.draw = function() {//draw the player function
            var player = Player.list[selfId]; //we get the controller or player of this pc
            if (player.map !== self.map) //here we check if the bullet is not in the map that our player controller is so we dont draw it and we return, this is temporary and we will make a better system for this
                return;
            //In order to draw the players relative to the player controller with selfId we will need to do the following things
            var x = self.x - player.x + WIDTH / 2;
            var y = self.y - player.y + HEIGHT / 2;
            // var controllerX = player.x - self.x + WIDTH / 2;
            // var controllerY = player.y - self.y + HEIGHT / 2;
            if (self.destroyed === true) {//if player ship is destroyed
                self.drawBoom(x, y, self.mouseAngle);//draw a boom
                return;
            }

            if (getObjectDistance(self, Player.list[selfId]) < worldView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                self.drawPlayer(x, y, self.nitro, self.color); //we draw player
                if (self.id !== selfId) //if its not herself or himself
                {
                    self.drawOponentDetails(x, y);//we draw the oponent details like hp and ...
                }

            }

        };



        self.drawPlayer = function(x, y, nitro, color) { //here we draw the ship or ufo of player

            //we no longer draw an image for the player
            //var width = Img.player.width*2;//we are inlarging the image by 2 factor
            //var height = Img.player.height*2;//we are inlarging the image by 2 factor
            //ctx.drawImage(Img.player,0,0,Img.player.width,Img.player.height,x-width/2,y-height/2,width,height);//we draw the Player Image as this: (specify the Image, we crop the image in this case we take the full image as: "0,0,image width, image height",center of the image will be set to self x, center of image will be set to self y)
            //we no longer draw score and player number
            //ctx.fillText(self.number,self.x,self.y);//we draw the player with its number on the position the x and y
            //ctx.fillText(self.score,self.x,self.y-60);//we draw the score

            //draw triangle for the player
            var xLarge = self.score/1500; //we increase the size of player by his hp
            ctx.save();
            if (self.moveCall) {
                if (!nitro) { //if nitro is off
                    // the engine fire as triangle
                    //drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5, -5, -20, 0, -5, 5, 5, "red", "black")
                    //drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5 - xLarge / 3, -5 - xLarge / 3, -20 - xLarge, 0, -5 - xLarge / 3, 5 + xLarge / 3, 5 + xLarge / 3, "red", "black")
                    drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5 - xLarge / 3, -5 - xLarge / 3, -xLarge-35 * 0.5 + Math.random() * -5, 0, -5 - xLarge / 3, 5 + xLarge / 3, 5 + xLarge / 3, "red", "black")//if performance dropped use upper line
                } else { //if nitro is on
                    // the engine fire as triangle but bigger becouse nitro is on
                    //drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5, -5, -25, 0, -5, 5, 5, "red", "black")
                    //drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5 - xLarge / 3, -5 - xLarge / 3, -25 - xLarge * 2, 0, -5 - xLarge / 3, 5 + xLarge / 3, 5 + xLarge / 3, "red", "black")
                    drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -5 - xLarge / 3, -5 - xLarge / 3, -xLarge-50 * 0.5 + Math.random() * -5, 0, -5 - xLarge / 3, 5 + xLarge / 3, 5 + xLarge / 3, "red", "black");//if performance dropped use upper line
                }
            }
            // the player as trianglex or a 4 corner triangle
            if(self.id !== selfId)
            drawText(ctx, x, y - 60, self.msg, 20, self.color, 5, 'sans-serif',1); //we draw the player message
            else
            drawText(ctx, x, y - 40, self.msg, 20, self.color, 5, 'sans-serif',1); //we draw the player message
            drawShipTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, xLarge, 5, shadeColor1(color, -40), color, self.gun);//we draw the player space ship
            //drawTriangle(ctx, x, y, self.mouseAngle * Math.PI / 180, -10 - xLarge, -10 - xLarge, 15 + xLarge, 0, -10 - xLarge, 10 + xLarge, 5, shadeColor1(color, -40), color)
            ctx.restore();
        }


        self.drawOponentDetails = function(x, y) {//function of drawing the details of oponents
            //draw hp
            //var hpWidth = 30 * self.hp / self.hpMax; //Logic for the hp bar, x * y/z, x:size(30 pixel wide), y:current out of max hp, z:max hp, this is linear calculation
            //ctx.fillStyle = 'red';//we cet the color to red
            //ctx.fillRect(x - hpWidth / 2, y - 25, hpWidth, 4);//we draw the hp bar: x-hpWidth makes it centered, y-40 is high up above, hpWidth is the width of hp and 4 is the height of hp bar

            //draw hp and name of player
            ctx.save(); //save settings
            //ctx.globalAlpha = 0.7; //set the blury effect
            var globalAlpha = 0.7;//transparency
            drawText(ctx, x, y - 40, self.username, 20, "black", 5, 'sans-serif',globalAlpha); //we draw the player name
            
            var hpWidth = 50 * self.hp / self.hpMax; //Logic for the hp bar, x * y/z, x:size(30 pixel wide), y:current out of max hp, z:max hp, this is linear calculation
            if (hpWidth < 0) //we check that hpWidth wont go under 0
                hpWidth = 0;//we set the hpWidth back to 0
            drawRect(ctx, x - 25, y - 30, hpWidth, 5, 'red', globalAlpha);//we draw player hp as a red rect
            drawStrokeRect(ctx, x - 25, y - 30, 50, 5, '#a5a5a5', globalAlpha, 1);//we draw border for player hp
            ctx.restore(); //save settings


            
            //draw fuel and name of player
            ctx.save(); //save settings
            var fuelWidth = 50 * self.fuel / self.fuelMax; //Logic for the fuel bar, x * y/z, x:size(30 pixel wide), y:current out of max hp, z:max hp, this is linear calculation
            if (fuelWidth < 0) //we check that fuelWidth wont go under 0
                fuelWidth = 0;//we set the fuelWidth back to 0
            drawRect(ctx, x - 25, y - 35, fuelWidth, 5, 'green', globalAlpha);
            drawStrokeRect(ctx, x - 25, y - 35, 50, 5, '#a5a5a5', globalAlpha, 1);
            ctx.restore(); //save settings



            
        }


        self.drawBoom = function(x, y, angle) {//draw boom function
            // drawPolygon(6,40,x,y,3,'black','yellow',angle);
            // drawPolygon(6,30,x,y,3,'black','red',angle);
            drawStar(ctx, x, y, 7, 50, 'black', 15, 'yellow', 0.6);//we draw a big star
            drawStar(ctx, x, y, 6, 30, 'black', 10, 'red', 0.5);//we draw a small star inside it
            //drawStar(ctx, x, y, 6, 50, 'black', 30, 'red', 0.5); a nice one
        }

        Player.list[self.id] = self; //add the player to Player.list
        return self;
    }
    Player.list = {}; //list of all players (objects)



    //var bulletList = {};//first refelex can be make a list of bullets, but at the end we want more logic on client so its a better idea to creat an acual class for it
    var Bullet = function(initPack) { //so we make it exactly like the server, its a bullet constructor class, in orther to initialize a bullet we need the initialization package and that will be the package sent from the server
        var self = {}; //we create an empty object
        self.id = initPack.id;
        self.x = initPack.x;
        self.y = initPack.y;
        self.map = initPack.map;
        self.angle = initPack.angle;
        self.gun = initPack.gun;
        self.color = shadeColor1(initPack.color,-50);
        self.colorTest = function(){//test color function
            if(isColorValid(self.color) === 'Light'){//if darl
                self.color = shadeColor1(self.color, -60);//make it 20% lighter
            }
            // if(isColorValid(self.color) === 'Dark'){//if darl
            //     self.color = shadeColor1(self.color, -20);//make it 20% lighter
            // }
            // else if(isColorValid(self.color) === 'Too dark'){//if too dark
            //     self.color = shadeColor1(self.color, -60);//make it 60% lighter
            // }
        }
        self.draw = function() {//draw the bullet
            if (Player.list[selfId].map !== self.map) //here we check if the bullet is not in the map that our player controller is so we dont draw it and we return, this is temporary and we will make a better system for this
                return;
            //In order to draw the bullets relative to the player controller with selfId we will need to do the following things
            //we no longer draw image for bullets
            //var width = Img.bullet.width/2;//we are deviding the size of this image by 2
            //var height = Img.bullet.height/2;//we are deviding the size of this image by 2
            //ctx.fillRect(self.x-5,self.y-5,10,10);//we draw a recatngle on the position the x and y

            //ctx.drawImage(Img.bullet,0,0,Img.bullet.width,Img.bullet.height,x-width/2,y-height/2,width,height);//we draw the bullet as this: (specify the Image, we crop the image in this case we take the full image as: "0,0,image width, image height",center of the image will be set to self x, center of image will be set to self y), becouse we draw the bullets relative to players now, we use x and y insteadi of self.x and self.y
            //drawing a triangle by move to and line to
            if (getObjectDistance(self, Player.list[selfId]) < worldView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                var x = self.x - Player.list[selfId].x + WIDTH / 2;
                var y = self.y - Player.list[selfId].y + HEIGHT / 2;
                if (self.gun === 'Default' || self.gun === 'Station Exclusive') { //if the gun is default
                    // ctx.beginPath();//start
                    // ctx.moveTo(-10, -5);
                    // ctx.lineTo(5, 0);
                    // ctx.lineTo(-10, 5);
                    // ctx.fill();
                    // ctx.closePath();//ends
                    ctx.save()
                    drawTriangle(ctx, x, y, self.angle * Math.PI / 180, -10, -5, 5, 0, -10, 5, 0, self.color, self.color)
                    ctx.restore(); //restore saved settings of canvas 2d
                } else if (self.gun === 'Simple Machine gun') { //if the gun is default
                    // ctx.beginPath();//start
                    // ctx.moveTo(-5, -3);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.lineTo(3, 0);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.lineTo(-5, 3);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.closePath();//ends
                    // ctx.fill();
                    // ctx.closePath();//ends
                    ctx.save()
                    drawTriangle(ctx, x, y, self.angle * Math.PI / 180, -5, -3, 3, 0, -5, 3, 0, self.color, self.color)
                    ctx.restore(); //restore saved settings of canvas 2d
                } else if (self.gun === 'Basic Homming' || self.gun === 'One Shot Homming') { //if the gun is homming
                    ctx.save(); //save settings of canvas 2d
                    ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                    ctx.rotate(self.angle * Math.PI / 180); //rotating by PI
                    //to make a missle
                    drawRect(ctx, 0, -1.5, 20, 3, self.color);//we draw a big rectangle
                    drawRect(ctx, 0, -2.5, 5, 5, self.color);//we draw a small rectangle
                    ctx.restore();
                } else if (self.gun === 'Starter Snipe' || self.gun === 'Pro Snipe') { //if the gun is snipe
                    // ctx.beginPath();//start
                    // ctx.moveTo(-4, -3);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.lineTo(15, 0);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.lineTo(-4, 3);//becouse it inside the translated canvas so x and y is according to that
                    // ctx.closePath();//ends
                    // ctx.fill();
                    // ctx.closePath();//ends
                    ctx.save();
                    drawTriangle(ctx, x, y, self.angle * Math.PI / 180, -4, -3, 15, 0, -4, 3, 2, self.color, self.color)
                    ctx.restore();
                } else if (self.gun === 'Triple Spread') { //if the gun is spread
                    ctx.save(); //save settings of canvas 2d
                    ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                    drawArc(ctx, 0, -1, 3, 0, 2 * Math.PI, self.color, 1, self.color, 0);
                    ctx.restore();

                } else if (self.gun === 'Timeout Mine' || self.gun === 'Timeout More Mine' || self.gun === 'One Shot Mine') { //if the gun is mine
                    //drawStar(givenCanvas, cx, cy, spikes, outerRadius, outerRadiusColor, innerRadius, innerRadiusColor, globalAlpha)
                    ctx.save();
                    drawStar(ctx, x, y, 20, 10, shadeColor1(self.color, -20), 0, self.color, 0.5)//we draw a little star like spongy
                    ctx.restore();
                        // ctx.save(); //save settings of canvas 2d
                        // ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                        // ctx.rotate(self.angle * Math.PI / 180); //rotating by PI
                        // ctx.fillStyle = self.color;
                        // ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                        // ctx.strokeStyle = shadeColor1(self.color, 30);
                        // ctx.strokeWidth = 5;
                        // ctx.beginPath();
                        // ctx.arc(0, 0, 20, 0, 2 * Math.PI, false); //becouse it inside the translated canvas so x and y is according to that
                        // ctx.stroke();
                        // ctx.fill();
                        // ctx.closePath(); //ends
                        // ctx.restore();
                } else if (self.gun === 'Straight Wave') { //if the gun is wave
                    ctx.save(); //save settings of canvas 2d
                    ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                    ctx.rotate(self.angle * Math.PI / 180); //rotating by PI
                    drawBazierCurve(ctx, 0, 30, 20, 0, 0, -30, self.color, 3,0.5)//we draw a bazier curve
                    ctx.restore();
                    //ctx.fill(); //we dont fill the bazier curve

                }else if (self.gun === 'Twin Cannon' || self.gun === 'Triple Cannon' || self.gun === 'Quad Cannon') { //if the gun is cannon
                    ctx.save(); //save settings of canvas 2d
                    ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                    drawArc(ctx, 0, -1, 6, 0, 2 * Math.PI, self.color, 1, self.color, 0);//we draw a circle
                    ctx.restore();

                }else if (self.gun === 'x2 Fueler' || self.gun === 'x3 Fueler' || self.gun === 'x4 Fueler' || self.gun === 'x5 Fueler') { //if the gun is cannon
                    ctx.save(); //save settings of canvas 2d
                    ctx.translate(x, y); //x and y of the position that we want to rotate the canvas from	
                    drawArc(ctx, 0, -1, 10, 0, 2 * Math.PI, '', 5, self.color, 4);//we draw a circle
                    ctx.restore();

                }
            }
        };
        Bullet.list[self.id] = self; //add the bullet to Bullet.list
        return self;
    }
    Bullet.list = {}; //list of all players (objects)


    ///////////////////////////////////////////Stone Constructor/////////////////////////////////////////////////////////
    var Stone = function(initPack) { //stone cunstructor
        var self = {};
        self.id = initPack.id;
        self.type = initPack.type;
        self.color = initPack.color;
        self.map = initPack.map;
        self.x = initPack.x;
        self.y = initPack.y;
        self.radius = initPack.radius;
        self.hp = initPack.hp;
        self.score = initPack.score;
        self.isOut = false;
        self.angle = Math.floor(Math.random() * 359 + 1); //random angle
        self.sideCount = randomNumberRange(5, 10); //number of sides for polygon
        self.draw = function() { //it will draw stones
            if (Player.list[selfId].map !== self.map) //here we check if the bullet is not in the map that our player controller is so we dont draw it and we return, this is temporary and we will make a better system for this
                return;
            if (getObjectDistance(self, Player.list[selfId]) < worldView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                if (self.radius <= 10)
                    self.radius = 12;
                var x = self.x - Player.list[selfId].x + WIDTH / 2; //we calculate the x of stone according to player position in the middle of screen
                var y = self.y - Player.list[selfId].y + HEIGHT / 2; //we calculate the y of stone according to player position in the middle of screen
                //we no longet draw a circle for stones
                // ctx.save();
                // ctx.beginPath(); 
                // ctx.arc(x, y, self.radius, 0, 2 * Math.PI, false);
                // ctx.fillStyle = self.color;
                // ctx.fill();
                // ctx.lineWidth = 5;
                // ctx.strokeStyle = shadeColor1(self.color, 30);
                // //ctx.strokeStyle = 'red';
                // ctx.stroke(); 
                // ctx.restore();
                //drawPolygon(sideCount,size,centerX,centerY,strokeWidth,strokeColor,fillColor,rotationDegrees);
                drawPolygon(ctx,self.sideCount, self.radius, x, y, 5, shadeColor1(self.color, 30), self.color, self.angle); //we call drawPolygon and draw a random polygon
            }
        }
        Stone.list[self.id] = self;
        return self;
    }
    Stone.list = {};
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////Stone Constructor/////////////////////////////////////////////////////////
    var Fuel = function(initPack) { //fuel cunstructor
        var self = {};
        self.id = initPack.id;
        self.map = initPack.map;
        self.radius = initPack.radius;
        self.literX = initPack.literX;
        self.x = initPack.x;
        self.y = initPack.y;
        self.draw = function() { //it will draw fuel
            if (Player.list[selfId].map !== self.map) //here we check if the fuel is in right map as player
                return;
            if (getObjectDistance(self, Player.list[selfId]) < worldView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                var x = self.x - Player.list[selfId].x + WIDTH / 2; //we calculate the x of stone according to player position in the middle of screen
                var y = self.y - Player.list[selfId].y + HEIGHT / 2; //we calculate the y of stone according to player position in the middle of screen
                ctx.save();
                drawArc(ctx, x, y, self.radius, 0, 2 * Math.PI, 'white', 1, 'green', 5);//we draw a circle
                drawText(ctx, x - 12, y + 10, 'x' + self.literX, 25, 'green', 0, 'Impact',1);//we draw a text inside it
                ctx.restore();
                // ctx.strokeColor = "black";
                // ctx.strokeRect(x,y,20,20);
                // ctx.fill()

            }
        }
        Fuel.list[self.id] = self;
        return self;
    }
    Fuel.list = {};
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






















    ///////////////////////////////////////////Stone Constructor/////////////////////////////////////////////////////////
    var Station = function(initPack) { //station cunstructor
        var self = {};
        self.id = initPack.id;
        self.map = initPack.map;
        self.radius = initPack.radius;
        self.hp = initPack.hp;
        self.hpMax = initPack.hpMax;
        self.parent = initPack.parent;
        self.x = initPack.x;
        self.y = initPack.y;
        self.color = initPack.color;
        self.angle = initPack.angle;
        self.draw = function() { //it will draw station
            if (Player.list[selfId].map !== self.map) //here we check if the station is not in the map that our player controller is so we dont draw it and we return, this is temporary and we will make a better system for this
                return;
            if (getObjectDistance(self, Player.list[selfId]) < worldView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                var x = self.x - Player.list[selfId].x + WIDTH / 2; //we calculate the x of stone according to player position in the middle of screen
                var y = self.y - Player.list[selfId].y + HEIGHT / 2; //we calculate the y of stone according to player position in the middle of screen
                var xLarge = self.radius/8; //we increase the size of player by his hp
                //draw hp and name of player
                ctx.save(); //save settings
                //ctx.globalAlpha = 0.7; //set the blury effect
                var globalAlpha = 0.7;
                drawText(ctx, x, y - 40, 'AI', 25, "black", 5, 'sans-serif',globalAlpha); //we draw the station name

                var hpWidth = 50 * self.hp / self.hpMax; //Logic for the hp bar, x * y/z, x:size(30 pixel wide), y:current out of max hp, z:max hp, this is linear calculation
                if (hpWidth < 0) //we check that hpWidth wont go under 0
                    hpWidth = 0;
                drawRect(ctx, x - 25, y - 35, hpWidth, 5, 'red', globalAlpha);
                drawStrokeRect(ctx, x - 25, y - 35, 50, 5, 'black', globalAlpha, 1);
                ctx.restore(); //save settings
                ctx.save();
                drawTriangle(ctx, x, y, self.angle * Math.PI / 180, -5 - xLarge, -5 - xLarge, -35 * 0.5 + Math.random() * -5 - xLarge, 0, -5 - xLarge, 5 + xLarge/2, 5 + xLarge/2, "red", "black")//we draw the station as rectangle
                drawTriangle(ctx, x, y, self.angle * Math.PI / 180, -10 - xLarge , -10 - xLarge , 15 + xLarge , 0, -10 - xLarge , 10 + xLarge , 5 + xLarge, shadeColor1(color, -40), self.color)//we draw and engine fire for it
                ctx.restore();
                //drawArc(ctx, x, y, self.radius, 0, 2 * Math.PI, self.color, 1, shadeColor1(self.color, -40), 5);
                
                // ctx.strokeColor = "black";
                // ctx.strokeRect(x,y,20,20);
                // ctx.fill()

            }
        }
        Station.list[self.id] = self;
        return self;
    }
    Station.list = {};
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















































    function buyItem(gun,item) {//buying item
        socket.emit('buyItem', {//send the item or the gun we want to server for furthur check
            gun: gun,
            item: item,
        });
    }
    socket.on('itemBought', function(data) {//if the item bought
        if (data.state === true) {//if succesfully done
            shopDiv.style.display = "none";
            itemShopButton.style.borderColor = "Green";
            itemShopButton.style.color = "Green";
            itemShopButton.style.opacity = 1;
            if(data.gunList){//if the gun is bought
                playerControllerGunList = data.gunList;//we set the gunlist of the player to the gunlist we recieved
                choosenGunText = playerControllerGunList[playerControllerGunList.length - 1];//the choosen gun is set to what he or she bought
                snipeScrollScreen(choosenGunText);//
                itemShopButton.innerHTML = "Gun Bought and equipped";
            }
            if(data.item){
                itemShopButton.innerHTML = "Item Bought and used";
            }
        }
        else{
            itemShopButton.innerHTML = "Not enough Score";
        }
        itemShopButtonNormaller();
    })

    itemShopButtonNormaller = function(){
        setTimeout(() => {
            itemShopButton.style.borderColor = "#000000";
            itemShopButton.style.color = "black";
            itemShopButton.innerHTML = "Item Shop";
            itemShopButton.style.opacity = 0.3;
        }, 3000);
    }

    //now if we call Player.list[selfId]
    //1) now we want to create a new type of package called init(update packages)
    socket.on('init', function(data) { //we call the package init
        if (data.selfId) //if data contains something called selfId, if you want the player to see someone else after death i think you should modify here
            selfId = data.selfId; //we will make client aware of who he is so we get the selfId and store it.			
        //init pack is like this: { player: [(id:123,numbe:'1',x:0,y:0),(id:1,numbe:'2',x:0,y:0)], bullet: []} server will send a package simillar to this, An object containing player list and bullet list and in player list there are objects with id number and x,y also bullet list contains object of bullets
        for (var i = 0; i < data.player.length; i++) //we loop throw all the players inside the init package we recieved
        {
            new Player(data.player[i]); //we call a new player with the data sent
        }
        for (var i = 0; i < data.bullet.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            new Bullet(data.bullet[i]); //we call a new bullet with the data sent
        }
        for (var i = 0; i < data.stone.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            new Stone(data.stone[i]); //we call a new bullet with the data sent
        }
        for (var i = 0; i < data.fuel.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            new Fuel(data.fuel[i]); //we call a new bullet with the data sent
        }
        for (var i = 0; i < data.station.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            new Station(data.station[i]); //we call a new bullet with the data sent
        }
    });

    //2) now we want to create a new type of package called update(update packages)
    socket.on('update', function(data) { //we call the package init, ***THIS NEEDS TO GET IMPROVED TO HANDLE COMPRESSED DATA***
        //update pack is like this: { player: [(id:123,x:0,y:0),(id:1,x:0,y:0)], bullet: []} server will send a package simillar to this, An object containing player list and bullet list and in player list there are objects with id and x,y also bullet list contains object of bullets (this package doese not contain some atrubutes of objects in init so its lighter)
        for (var i = 0; i < data.player.length; i++) //we loop throw all the players inside the update package we recieved
        {
            var pack = data.player[i]; //we put each of them inside a pack
            var p = Player.list[pack.id]; //for each of them we get the player associated with the player that needs to be updated
            if (p) { //there might be a bug that server thinks we have the player but client doesnt have it so we test that do we have a player whith that id in memory, if yes so we do update
                if (pack.x !== undefined) // if package have new iformation about x
                    p.x = pack.x; //update the x of the player
                if (pack.y !== undefined) // if package have new iformation about y
                    p.y = pack.y; //update the y of the player
                if (pack.hp !== undefined) // if package have new iformation about hp
                    p.hp = pack.hp; //update the hp of the player
                if (pack.fuel !== undefined) // if package have new iformation about party
                    p.fuel = pack.fuel; //update the the party
                if (pack.score !== undefined) // if package have new iformation about score
                    p.score = pack.score; //update the score of the player
                if (pack.map !== undefined) // if package have new iformation about map
                    p.map = pack.map; //update the map
                if (pack.mouseAngle !== undefined) // if package have new iformation about mouseAngle
                    p.mouseAngle = pack.mouseAngle; //updatethe player
                if (pack.moveCall !== undefined) // if package have new iformation about movement
                    p.moveCall = pack.moveCall; //update the movement of the player
                if (pack.nitroMax !== undefined) // if package have new iformation about nitro capacity
                    p.nitroMax = pack.nitroMax; //update the nitroMax
                if (pack.nitro !== undefined) // if package have new iformation about nitro
                    p.nitro = pack.nitro; //update the nitro
                if (pack.destroyed !== undefined) // if package have new iformation about destroyed
                    p.destroyed = pack.destroyed; //updatethe destroyed
                if (pack.username !== undefined) // if package have new iformation about username
                    p.username = pack.username; //updatethe username
                if (pack.party !== undefined) // if package have new iformation about party
                    p.party = pack.party; //update the the party
                if (pack.gun !== undefined) // if package have new iformation about party
                    p.gun = pack.gun; //update the the party
                if (pack.color !== undefined){ // if package have new iformation about party
                    p.color = pack.color; //update the the party
                    p.colorTest();
                }

                //after upgrade
                if (pack.nitroCapacity !== undefined) // if package have new iformation about nitro capacity
                    p.nitroCapacity = pack.nitroCapacity; //update the the nitro capacity
                if (pack.hpMax !== undefined) // if package have new iformation about hpMax
                    p.hpMax = pack.hpMax; //update the the party
                if (pack.hasUpgrade !== undefined) // if package have new iformation about hasUpgrade
                    p.hasUpgrade = pack.hasUpgrade; //update the the hasUpgrade
                if (pack.gunList !== undefined) // if package have new iformation about gunList
                    p.gunList = pack.gunList; //update the the gunList
                if (pack.life !== undefined) // if package have new iformation about life
                    p.life = pack.life; //update the the life

                // console.log(pack.gunList);
                // console.log(pack.hasUpgrade);
                // console.log(pack.upgradeXpLim);
                // console.log(pack.upgradeXp);
                // console.log(pack.hpMax);
                // console.log(pack.upgradeXp);
                // console.log(pack.nitroCapacity);
            }
        }
        for (var i = 0; i < data.bullet.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            var pack = data.bullet[i];
            var b = Bullet.list[pack.id];
            if (b) { //there might be a bug that server thinks we have the bullet but client doesnt have it so we test that do we have a bullet whith that id in memory, if yes so we do update
                if (pack.x !== undefined) // if package have new iformation about x
                    b.x = pack.x; //update the x of the bullet
                if (pack.y !== undefined) // if package have new iformation about y
                    b.y = pack.y; //update the y of the bullet
                if (pack.angle !== undefined) // if package have new iformation about y
                    b.angle = pack.angle; //update the y of the bullet
            }
        }
        for (var i = 0; i < data.stone.length; i++) { //update stones
            var pack = data.stone[i];
            var s = Stone.list[pack.id];
            if (s) {
                if (pack.x !== undefined)
                    s.x = pack.x;
                if (pack.y !== undefined)
                    s.y = pack.y;
                if (pack.hp !== undefined)
                    s.hp = pack.hp;
                if (pack.radius !== undefined)
                    s.radius = pack.radius;
                if (pack.isOut !== undefined)
                    s.isOut = pack.isOut;
            }
        }
        for (var i = 0; i < data.fuel.length; i++) { //update fuel
            var pack = data.fuel[i];
            var f = Fuel.list[pack.id];
            if (f) {
                if (pack.x !== undefined)
                    f.x = pack.x;
                if (pack.y !== undefined)
                    f.y = pack.y;
                // if (pack.radius !== undefined)
                //     f.radius = pack.radius;
            }
        }
        for (var i = 0; i < data.station.length; i++) { //update station
            var pack = data.station[i];
            var s = Station.list[pack.id];
            if (s) {
                if (pack.radius !== undefined)
                    s.radius = pack.radius;
                if (pack.hp !== undefined)
                    s.hp = pack.hp;
                if (pack.parent !== undefined)
                    s.parent = pack.parent;
                if (pack.angle !== undefined)
                    s.angle = pack.angle;
                if (pack.x !== undefined)
                    s.x = pack.x;
                if (pack.y !== undefined)
                    s.y = pack.y;
                if (pack.color !== undefined){
                    s.color = pack.color;
                    s.colorTest();
                }
            }
        }
    });

    //3) now we want to create a new type of package called remove(remove packages)
    socket.on('remove', function(data) { //we call the package init
        //remove pack is like this: { player: [123], bullet: [12323,123123]} server will send a package simillar to this, An object containing player list and bullet list and in player list there are objects with only id also bullet list contains only bullet ids that are going to get remove (this is so light and only contains id of objects that are going to be removed)
        for (var i = 0; i < data.player.length; i++) //we loop throw all the players inside the init package we recieved
        {
            delete Player.list[data.player[i]]; //we delete them from the list we have here
        }
        for (var i = 0; i < data.bullet.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            delete Bullet.list[data.bullet[i]]; //we delete them from the list we have here
        }
        for (var i = 0; i < data.stone.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            delete Stone.list[data.stone[i]]; //we delete them from the list we have here
        }
        for (var i = 0; i < data.fuel.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            delete Fuel.list[data.fuel[i]]; //we delete them from the list we have here
        }
        for (var i = 0; i < data.station.length; i++) //we loop throw all the bullets inside the init package we recieved
        {
            delete Station.list[data.station[i]]; //we delete them from the list we have here
        }
    });

    // listening to game over call
    socket.on('destroyed', function(data) { //we call the package destroyed
        if (data.gameOver === false) {//if the game is not going to be over
            killedBy = data.killer;
            respawnDiv.style.display = 'inline-block';
            respawnKilledBy.innerHTML = "You have been destroyed by " + killedBy;
        } else {//if the game is over
            gameOverDiv.style.display = 'inline-block';
            //gameOVerKilledBy.innerHTML = "You have been destroyed and your out of Life " + killedBy; ;////due to a bug it doesnt work
            //location.reload();
        }
        shopDiv.style.display = "none";
        chatConsole.style.display = 'none';//chat console goes hidden anyway
        // signDiv.style.display = 'inline-block'; //we display the gameDiv
        // gameDiv.style.display = 'none'; //we hide the signDiv
    });











    ///////////////////////////////////////////Stone Constructor/////////////////////////////////////////////////////////
    var Star = function() { //star cunstructor(particles)
        var self = {};
        self.x = randomNumberRange(-1000,MAP_RADIUS + 1000);
        self.y = randomNumberRange(-1000,MAP_RADIUS + 1000);
        self.spdX = randomNumberRangeFloat(-0.2,0.2);
        self.spdY = randomNumberRangeFloat(-0.2,0.2);
        self.width = randomNumberRange(2,20);
        self.radius = randomNumberRange(1,3);
        // self.width = randomNumberRange(2,20);
        // self.height = randomNumberRange(2,20);
        self.globalAlpha = randomNumberRangeFloat(0.3,0.6);
        self.id = Math.random();
        self.draw = function() { //it will draw stars
            if (selfId) { //if the player exists, we do this becouse if no player exists or player did not signed in yet so we wont be able to find the x and y according to him
                
                if (getObjectDistance(self, Player.list[selfId]) > worldView)//if too far away
                    return;//we return
                
                var x = self.x - Player.list[selfId].x + WIDTH / 2; //we calculate the x of stone according to player position in the middle of screen
                var y = self.y - Player.list[selfId].y + HEIGHT / 2; //we calculate the y of stone according to player position in the middle of screen
                
                //drawRect(backCtx, x, y, self.width, self.height, 'white', self.globalAlpha);
                drawArc(backCtx, x, y, self.radius, 0, 2 * Math.PI, '#000000', self.globalAlpha, '', 2);//we draw a circle
                self.x += self.spdX;
                self.y += self.spdY;
            }
            if(self.x >= MAP_RADIUS + 1000 || self.x <= -1000){//if out of map + 1000
                self.spdX = -self.spdX;
            }
            if(self.y >= MAP_RADIUS + 1000 || self.y <= -1000){//if out of map + 1000
                self.spdY = -self.spdY;
            }
        }
        Star.list[self.id] = self;
        return self;
    }
    Star.list = {};
    var firstStarCall = function() { //this function will instantly fill the map with 1000 stones after server starts, reason its at the end becouse we have to keep the order of code run order from top to down, we can use a function firstStoneCall(){} but its just it yer
        for (i = 0; i < STAR_NUMBER; i++) {
            Star();
        }
    }
    firstStarCall(); //we generate all the stones









    //now the setInterval(like server)
    setInterval(function() { //its a set interval means that calling following function every few miliseconds
        if (!selfId) //the set interval function is called even the player is not logged in so we will see some errors like score error, so we say if we did not recieve the init package that contains selfId it return, the setInterval wont work then so we see no error
            return //we get out of setInterval if the player hasnt recieve the init package, and we undrestand that by seeing if selfId is null or not, so untile we recieve an init package we will not draw anything
            //be wise that everything that drawn is relative to the player that is controlled and is called with selfId thats why we see the map moving behind the player and player is allways at the middle of screen
            //Drawing and clearing the screen has priority so it means if we draw player then the map so the player will be hidden by the map
        clearCanvas(ctx, 0, 0, WIDTH, HEIGHT); //clear the hole ctx
        clearCanvas(ctxUi, 0, 0, WIDTH, HEIGHT); //clear the hole ctxUi
        clearCanvas(ctxMap, 0, 0, WIDTH, HEIGHT); //clear the hole ctxMap
        clearCanvas(backCtx, 0, 0, WIDTH, HEIGHT); //clear the hole backCtx
        drawMap(); //we draw the map
        //drawScore();//we draw the score of player
        //we clear hole ctx here, for the map we create a new function
        for (var i in Star.list) //loop throw every Star
            Star.list[i].draw(); //we draw the Star
        for (var i in Station.list) //loop throw every Station
            Station.list[i].draw(); //we draw the Station
        for (var i in Fuel.list) //loop throw every Fuel
            Fuel.list[i].draw(); //we draw the Fuel
        for (var i in Bullet.list) //loop throw every bullet
            Bullet.list[i].draw(); //we draw the bullet
        for (var i in Player.list) //loop throw every player
            Player.list[i].draw(); //we draw the player
        for (var i in Stone.list) //loop throw every Stone
            Stone.list[i].draw(); //we draw the Stone
        var p = Player.list[selfId];
        drawCircleConsole(p); //we draw the UI console of the player controller, the reason we put it here is becouse it is going to be drawn on top of everything else
        LeaderBoardsShow();
    }, fps); //every 40 miliseconds


    /*//if using tileset we call the function bellow
	var TILE_SIZE = 32;
	Maps = function(id,imgSrc,grid){
	var self = {
		id:id,
		image:new Image(),
		width:grid[0].length * TILE_SIZE,
		height:grid.length * TILE_SIZE,
		grid:grid,
	}
	self.image.src = imgSrc;


	self.draw = function(){
		var x = WIDTH/2 - Player.list[selfId].x;
		var y = HEIGHT/2 - Player.list[selfId].y;
		ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.image.width*2,self.image.height*2);
	}
	return self;
}

	var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	var array2D = [];
	for(var i = 0 ; i < 40; i++){
		array2D[i] = [];
		for(var j = 0 ; j < 40; j++){
			array2D[i][j] = array[i * 40 + j];
		}
	}

	Maps.current = Maps('field','client/img/map.png',array2D);
*/

    var drawMap = function() { //we draw the map here
        //In order to draw the map relative to the player controller with selfId we will need to do the following things
        var player = Player.list[selfId];
        var x = WIDTH / 2 - player.x; // x of the map according to the position of the player
        var y = HEIGHT / 2 - player.y; // y of the map according to the position of the player
        //var playerCount = getObjectSize(Player.list) * sizePerPlayer; //this is going to be add to the width and height so map grows and decreases when players are more or less, note that this should be the exact of what is inside the server code
        //ctx.drawImage(Img.map[player.map],x,y);//we draw a really basic map

        //Maps.current.draw();//we draw the tiled map here like this

        ctx.save();
        //Draw Edge Rect
        // ctx.beginPath();
        // ctx.rect(x, y, MAP_RADIUS, MAP_RADIUS);//we draw the map boundings at the width and height and a start point relative to the count of players online, with the /2 we make the map grow or decrease from 4 sides
        if (player.map == '1')//if map is 1
            color = '#f4d442';//we make the color of border to yellow
        else//else
            color = 'blue';//to blue
        //drawArc(ctx, x + MAP_RADIUS / 2, y + MAP_RADIUS / 2, MAP_RADIUS / 2, 0, 2 * Math.PI, '#4286f4', 1, color, 30);
        drawArc(ctx, x + MAP_RADIUS / 2, y + MAP_RADIUS / 2, MAP_RADIUS / 2, 0, 2 * Math.PI, '', 1, color, 30);//we draw the map as a cricle
        ctx.restore();

        //Grid Background with lines from display view not the map
        // ctx.save();
        // ctx.beginPath();
        // ctx.globalAlpha = 0.1;
        // var p = 0;
        // for (var horizontal = x - WIDTH / 2; horizontal <= WIDTH; horizontal += 100) { //from 0 0  of screen relative to player x
        //     ctx.moveTo(horizontal + p, p);
        //     ctx.lineTo(horizontal + p, HEIGHT + p); //to width of the screen of screen relative to player x
        // }
        // for (var vertical = y - HEIGHT / 2; vertical <= HEIGHT; vertical += 100) { //from 0 0  of screen relative to player y
        //     ctx.moveTo(p, vertical + p);
        //     ctx.lineTo(WIDTH + p, vertical + p); //to height of the screen of screen relative to player y
        // }
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = "white";
        // ctx.stroke();
        // ctx.restore();
    };

    /*var drawScore = function(){//now that we are aware of who the player is by selfId (Player.list[selfId]) now we can draw the score of specific client that is controling the player
    	if(lastScore === Player.list[selfId].score)//we check if player last score is equal to corrent score, note that this is done to make our profile better so we draw less and also draw it on another canvas so it takes less price for running
    		return;
    	//note that drawing text on canvas is very expensive
    	//this is happening if we dont return
    	lastScore = Player.list[selfId].score;//we set the player lastScore to player currrentScore
    	ctxMap.clearRect(0,0,WIDTH,HEIGHT);//for now we are clearing the ctxMap here but eventually the ui is gonna be alot better maybe inside another function so we call it there
    	ctxMap.fillStyle = 'white';//we set the color to white
    	ctxMap.fillText(Player.list[selfId].score,0,30);//we draw the player score at position 0,30, this is done on ctxMap, all ui should be shown here
    };
    var lastScore = null;//we keep track of player last score, for optimizing our profile*/



    var drawCircleConsole = function(player) { //draw console
        if (player.destroyed === true)//if players hip is destroyed
            return;
        //what side are we
        //var group;
        /*if(Player.list[selfId].party == 1)
        {
        partyCoderShower.style.fontWeight="bold";
        partyCoderShower.style.color="#99c0ff";
        group = "YOU ARE EARTH PROTECTOR!<br/>Destroy Trappist-1 before destrooy yours";
        partyCoderShower.innerHTML = group;
        }
        else
        {
        partyCoderShower.style.fontWeight="bold";
        partyCoderShower.style.color="#ff9999";
        group = "YOU ARE A TRAPPIST PROTECTOR!<br/>Destroy the earth before they destroy yours";
        partyCoderShower.innerHTML = group;
        }*/
        //ctxMap.clearRect(0,0,ctxMap.width,ctxMap.height);
        x = WIDTH / 2;
        y = HEIGHT / 2;
        var globalAlpha = 0.7;
        //getting ready
        ctxUi.save();
        //small circle line, i removed it for now
        //drawArc(ctxUi, x, y, 49, 0, 2 * Math.PI, '', globalAlpha, '#c4c4c4', 2);


        //upside
        drawBazierCurve(ctxUi, x - 85, y - 130, x - 10, y - 187, x + 85, y - 130, '#000000', 1,globalAlpha);

        //rightside
        drawBazierCurve(ctxUi, x + 130, y + 90, x + 200, y, x + 130, y - 90, '#000000', 1,globalAlpha);

        //leftside
        drawBazierCurve(ctxUi, x - 128, y + 90, x - 190, y, x - 128, y - 90, '#000000', 1,globalAlpha);

        //downside
        drawBazierCurve(ctxUi, x - 90, y + 130, x, y + 190, x + 90, y + 130, '#000000', 1,globalAlpha);

        //hp
        var hpWidth = player.hp / player.hpMax; //this will go to hp class
        var firstAngle = 0.685 * Math.PI;
        var secondAngle = 0.37 * Math.PI;
        var hpRadius = 145;
        drawArc(ctxUi, x, y, hpRadius, -firstAngle, (secondAngle * hpWidth) - firstAngle, '', globalAlpha, 'red', 5)


        // //nitro left box
        // ctx.beginPath();
        // ctx.strokeStyle = 'white';
        // ctx.lineWidth = 3;
        // ctx.fillStyle = '#fff200';//we set the color of inside the rect to red
        // var nitroWidth = 120 * player.nitroMax / 100; //Logic for the hp bar, x * y/z, x:size(30 pixel wide), y:current out of max hp, z:max hp, this is linear calculation
        // if(nitroWidth < 0)//we check that hpWidth wont go under 0
        // 	nitroWidth = 0;
        // ctx.fillRect(x-118.5,y + 45,5,-nitroWidth);//we draw the hp bar
        // ctx.strokeRect(x-120,y + 45,8,-120);//we draw the stroke of hp bar
        // drawText(x-115,y+ 65,'Nitro',20,"white",4); 
        // ctx.fill();
        // ctx.closePath();


        // //nitro down
        // var newNitroWidth =  player.nitroMax / 100;
        // ctx.lineWidth = 10;
        // var firstAngle = 1.685*Math.PI;
        // var secondAngle = 0.37*Math.PI;
        // var hpRadius = 145;
        // ctx.beginPath();
        // ctx.strokeStyle = 'blue';
        // ctx.arc(x,y,hpRadius,-firstAngle,(secondAngle*newNitroWidth)-firstAngle);
        // // drawText(x-115,y+ 65,'Nitro',20,"white",4); 
        // ctx.stroke();
        // ctx.closePath();



        //nitro left curve
        var nitroWidth = player.nitroMax / player.nitroCapacity;
        ctxUi.lineWidth = 5;
        var firstAngle = 1.185 * Math.PI;
        var secondAngle = 0.37 * Math.PI;
        var nitroRadius = 145;
        drawArc(ctxUi, x, y, nitroRadius, -firstAngle, (secondAngle * nitroWidth) - firstAngle, '', globalAlpha, 'blue', 5);

        //fuel right curve
        var nitroWidth1 = player.fuel / player.fuelMax;
        ctxUi.lineWidth = 5;
        var firstAngle1 = 0.37 * Math.PI;
        var secondAngle1 = 0.185 * Math.PI;
        var nitroRadius1 = 145;
        drawArc(ctxUi, x, y, nitroRadius1, -(firstAngle1 * nitroWidth1) + secondAngle1, secondAngle1, '', globalAlpha, 'green', 5);

        // (secondAngle1 * nitroWidth1) - firstAngle1
        // (firstAngle1 * nitroWidth1) + secondAngle1


        //name
        //drawText(WIDTH/2,50,name,40,"white",10); 
        drawText(ctxUi, x-10, y - 110, player.username, 25, "#000000", 7, 'sans-serif',globalAlpha);


        //gun
        var gun = choosenGunText;
        drawText(ctxUi, x, y + 80, "Gun:", 20, "#000000", 5, 'sans-serif',globalAlpha);
        drawText(ctxUi, x, y + 115, gun, 30, "#000000", 7, 'sans-serif',globalAlpha);


        //life, actually we draw it at the top right corner of the screen
        //drawText(WIDTH/2,50,name,40,"white",10); 
        drawText(ctxUi, 5, 25, 'Life: ' + player.life, 25, "#000000", 0, 'sans-serif',globalAlpha);

        // //score
        // var maxScore = "/100";
        // if (player.score < 100)
        //     maxScore = "/100";
        // if (player.score > 100 && player.score < 600)
        //     maxScore = "/600";
        // if (player.score >= 600 && player.score < 2000)
        //     maxScore = "/2000";
        // if (player.score >= 2000 && player.score < 5000)
        //     maxScore = "/5000";
        // if (player.score >= 5000)
        //     maxScore = "";

        //we call drawText function
        // drawText(ctxUi, x - 25, y - 90, "Score:", 20, "white", 0, 'sans-serif');
        // drawText(ctxUi, x, y - 50, player.upgradeXp + "/" + player.upgradeXpLim, 40, "white", 9, 'sans-serif');
        //ctxUi.globalAlpha = 1;//we set global alpha
        ctxUi.lineWidth = 1; //we set line width
        drawText(ctxUi, x, y - 80, "Score:", 20, "#000000", 4, 'sans-serif',globalAlpha);
        drawText(ctxUi, x, y - 60, player.score, 20, "#000000", 5, 'sans-serif',globalAlpha); //we draw the score




        ////this is upgrade ui around the circle console, we no longer use it becouse i believe it make the screen messy
        // ctxUi.lineWidth = 3;
        // ctxUi.strokeStyle = '#c4c4c4';
        // //right down
        // ctxUi.beginPath();
        // ctxUi.moveTo(x + 130,y + 90);
        // ctxUi.lineTo(x + 190,y + 170);
        // ctxUi.stroke();
        // //right one to down
        // ctxUi.beginPath();
        // ctxUi.moveTo(x + 160,y + 30);
        // ctxUi.lineTo(x + 280,y + 60);
        // ctxUi.stroke();
        // //right one to top
        // ctxUi.beginPath();
        // ctxUi.moveTo(x + 160,y - 30);
        // ctxUi.lineTo(x + 280,y - 60);
        // ctxUi.stroke();
        // //right top
        // ctxUi.beginPath();
        // ctxUi.moveTo(x + 130,y - 90);
        // ctxUi.lineTo(x + 190,y - 170);
        // ctxUi.stroke();
        // //left down
        // ctxUi.beginPath();
        // ctxUi.moveTo(x - 130,y + 90);
        // ctxUi.lineTo(x - 190,y + 170);
        // ctxUi.stroke();
        // //left one to down
        // ctxUi.beginPath();
        // ctxUi.moveTo(x - 157,y + 30);
        // ctxUi.lineTo(x - 280,y + 60);
        // ctxUi.stroke();
        // //left one to top
        // ctxUi.beginPath();
        // ctxUi.moveTo(x - 157,y - 30);
        // ctxUi.lineTo(x - 280,y - 60);
        // ctxUi.stroke();
        // //left top
        // ctxUi.beginPath();
        // ctxUi.moveTo(x - 130,y - 90);
        // ctxUi.lineTo(x - 190,y - 170);
        // ctxUi.stroke();
        // //right buttom
        // drawText(ctxUi, x + 160, y + 100, "Snipe", 20, "white", -1, 'sans-serif');
        // //right middle
        // drawText(ctxUi, x + 180, y + 10, "Homming", 20, "white", -1, 'sans-serif');
        // //right top
        // drawText(ctxUi, x + 150, y - 90, "machine gun", 20, "white", -1, 'sans-serif');
        // //left buttom
        // drawText(ctxUi, x - 220, y + 100, "Wave", 20, "white", -1, 'sans-serif');
        // //left middle
        // drawText(ctxUi, x - 240, y + 10, "Mine", 20, "white", -1, 'sans-serif');
        // //left top
        // drawText(ctxUi, x - 230, y - 80, "Spread", 20, "white", -1, 'sans-serif');




        ctxUi.restore();
        gpsDraw(player.color);
    }

    gpsDraw = function(color) { //GPS map show, in fact its something like a radar
        ctxMap.width = 200;//pixel width of gps
        ctxMap.height = 200;//pixel height of gps
        var gpsWidth = MAP_RADIUS / ctxMap.width;//we set the visual width og gps
        var gpsHeight = MAP_RADIUS / ctxMap.height;//we set the visual height og gps
        var xInGps = Player.list[selfId].x / gpsWidth;//the position of player in gps
        var yInGps = Player.list[selfId].y / gpsHeight;//the position of player in gps
        var gpsView = worldView * 2;//the distance player can see in the gps

        //draw gps itself
        ctxMap.save();
        drawArc(ctxMap, 100, HEIGHT - 100, 100, 0, 2 * Math.PI, '#000000', 0.2, 'black', 2);


        //draw text
        //ctxMap.globalAlpha = 0.5;
        //ctxMap.fillStyle = 'white';
        var globalAlpha = 0.5;
        
        //draw selfId player, i mean the controller
        drawText(ctxMap, xInGps, HEIGHT - 200 + yInGps - 10, 'You', 15, '#000000', 5, 'Arial',globalAlpha);
        drawArc(ctxMap, xInGps, HEIGHT - 200 + yInGps, 4, 0, 2 * Math.PI, color, globalAlpha, 'black', 2);

        for (var i in Player.list) {//for each player
            var opponent = Player.list[i];
            if (opponent.id != selfId) {
                if (getObjectDistance(opponent, Player.list[selfId]) < gpsView) { //we wont draw the objects that are too far away, 750 is just about the size of snipe display
                    var xInGpsOpponent = opponent.x / gpsWidth;
                    var yInGpsOpponent = opponent.y / gpsHeight;
                    if (opponent.party !== Player.list[selfId].party) {

                        //draw Opponent
                        drawArc(ctxMap, xInGpsOpponent, HEIGHT - 200 + yInGpsOpponent, 3, 0, 2 * Math.PI, opponent.color, globalAlpha, 'black', 1);


                    }
                }
                if (opponent.party === Player.list[selfId].party) {//if player is friendly
                    var xInGpsOpponent = opponent.x / gpsWidth;
                    var yInGpsOpponent = opponent.y / gpsHeight;

                    //draw Friend
                    drawText(ctxMap, xInGpsOpponent, HEIGHT - 200 + yInGpsOpponent - 10, 'Ally', 15, 'black', 3, 'Arial',globalAlpha);
                    drawArc(ctxMap, xInGpsOpponent, HEIGHT - 200 + yInGpsOpponent, 4, 0, 2 * Math.PI, opponent.color, globalAlpha, 'black', 1);
                }
            }
        }


        for (var i in Fuel.list) {//for each fuel
            var fuel = Fuel.list[i];
            if (getObjectDistance(fuel, Player.list[selfId]) < gpsView) {
                    var xInGpsFuek = fuel.x / gpsWidth;
                    var yInGpsFuel = fuel.y / gpsHeight;
                    //draw Fuel
                    drawArc(ctxMap, xInGpsFuek, HEIGHT - 200 + yInGpsFuel, 1, 0, 2 * Math.PI, 'black', 0.5, 'black', 1);
                }
        }

        for (var i in Station.list) {//for each station
            var station = Station.list[i];
            if (getObjectDistance(station, Player.list[selfId]) < gpsView) {
                    var xInGpsStation = station.x / gpsWidth;
                    var yInGpsStation = station.y / gpsHeight;
                    //draw Fuel
                    drawArc(ctxMap, xInGpsStation, HEIGHT - 200 + yInGpsStation, 2, 0, 2 * Math.PI, 'white', 0.5, 'black', 1);
            }
        }
        
        ctxMap.restore();
    }


	var leaderBoard = [];
	LeaderBoardsShow = function(){//Leader boards shpw
			topTenShowDiv.innerHTML = '';//top 10 for protectors
			for(var i in Player.list)
			{
				//var res = ["<div style='width:200px;height:25px;background-color:#bcfffb;border-radius:10px;border:4px solid #3afff3;opacity:0.5'>" + Player.list[i].username,Player.list[i].score+"</div>"].join("-")
                var b = new Array ("<div>" + Player.list[i].username,Player.list[i].score )// style='width:100%;height:15px;background-color:#bcfffb;border-radius:10px;border:2px solid #3afff3;opacity:0.5'
                //b.join("-");
                if(leaderBoard.length < 10)
                leaderBoard.push(b);
				//leaderBoard.push('<br\>'+Player.list[i].score+':'+Player.list[i].name);
			}
			// leaderBoard.sort(function(a, b) {
			// 	return a[1] - b[1];
			// });
			 leaderBoard.sort(function(a, b) {
                 if (a[1] < b[1]) return -1;
                 if (a[1] > b[1]) return 1;
                 return 0;
             });
            leaderBoard.reverse();
            //'some string'.replace(/,/g, ":");;
			topTenShowDiv.innerHTML = leaderBoard.join("</div>");
			leaderBoard = [];
	}
			
    document.onkeydown = function(event) { //whenever the player pushes a key on keyboard, event will gives us the info about which button is in action
        if(event.keyCode === 27){
            shopShower();
        }
        // socket.emit('keyPress', {
        //     inputId: '',
        //     state: true
        // }); //we send the inputId which is the mean of button on keyboard and the state of it to server 
        /*//we no longer set the speed by keyboard 
        if(event.keyCode === 68) //d
        socket.emit('keyPress',{inputId:'right',state:true});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 83) //s
        socket.emit('keyPress',{inputId:'down',state:true});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:true});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 87) //w
        socket.emit('keyPress',{inputId:'up',state:true});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        */
        if (event.keyCode === 13) //check enter
        {
            if (chatForm.style.display === "none") //set chatForm to visible if invisible
            {
                chatForm.style.display = "block"; //shows it
                //chatText.style.opacity = 1; //transparency
                chatInput.focus(); //means the cursor will go on it like someone clicked it
            } else {
                chatForm.style.display = "none"; //set chatForm to invisible if visible
            }
        }
    }
    document.onkeyup = function(event) { //whenever the player releases a key on keyboard, event will gives us the info about which button is in action
        /*//we no longer set the speed by keyboard 
        if(event.keyCode === 68) //d
        socket.emit('keyPress',{inputId:'right',state:false});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 83) //s
        socket.emit('keyPress',{inputId:'down',state:false});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:false});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        else if(event.keyCode === 87) //w
        socket.emit('keyPress',{inputId:'up',state:false});//we send the inputId which is the mean of button on keyboard and the state of it to server 
        */
    }


    var lastseconds = 0; // this is for messuring time between clicks
    document.onmousedown = function(event) { //whenever the player pushes a key on mouse, event will gives us info about which button is in action
        if (event.button === 0) //left click
            socket.emit('keyPress', {
            inputId: 'attack',
            state: true
        }); //we send the inputId which is the mean of button on mouse and the state of it to server 
        if (event.button === 2) { //right click
            var nowAseconds = new Date().getTime() / 1000; //nowAsoconds is for messuring the time between two clicks we set the nowAseconds to date now and make it milisecnds, this is on left mouseup
            if (nowAseconds - lastseconds < 0.1) { //if double click. if the time on last mouse up minus the time of this mouse down was less than 0.5 neans twice in half a second
                socket.emit('keyPress', {
                    inputId: 'startMove',
                    state: true,
                    type: 'nitro'
                }); //we send start move true
            } else {
                socket.emit('keyPress', {
                    inputId: 'startMove',
                    state: true,
                    type: 'normal'
                }); //we send start move true
            }
            lastseconds = 0; //we set the lastsecods to 0 for resetting the messsuring cycle
        }
    }
    document.onmouseup = function(event) { //whenever the player releases a key on mouse, event will gives us info about which button is in action
        if (event.button === 0) //left click
            socket.emit('keyPress', {
            inputId: 'attack',
            state: false
        }); //we send the inputId which is the mean of button on mouse and the state of it to server 
        if (event.button === 2) { //right click
            socket.emit('keyPress', {
                inputId: 'startMove',
                state: false
            }); //we send start move false
            lastseconds = new Date().getTime() / 1000; //we set the lastsecods to date now and make it milisecnds, this is on left mouseup
        }
    }
    var mouseMoveCount = 0; //we limit the mouse move function call which is 60fps to 30 fps by adding mouseMoveCount and add 1 to it
    document.onmousemove = function(event) { //whenever mouse moves, this function will be called and will gives us access to info we need by event
        mouseMoveCount++; //we limit the mouse move function call which is 60fps to 30 fps by adding mouseMoveCount and add 1 to it
        if (mouseMoveCount >= 3) //once per 3 frame we emit, otherwise nothing
        {
            var x = event.clientX - canvas.getBoundingClientRect().left; //we find x of the mouse reletieve to the middle of the screen, WIDTH/2 represents the middle, getBoungingClientRect Left and Right and Top and Down will gives us the distance between element(canvas) and the top down left right of the browser
            var y = event.clientY - canvas.getBoundingClientRect().top; //we find x of the mouse reletieve to the middle of the screen, HEIGHT/2 represents the middle, getBoungingClientRect Top and Right and Top and Down will gives us the distance between element(canvas) and the top down left right of the browser
            socket.emit('keyPress', {
                inputId: 'mouseMove',
                mx: x,
                my: y,
                w: CANVAS_WIDTH,
                h: CANVAS_HEIGHT
            }); //we send the state which is angle and the imputId which is mouseAngle to the server
            mouseMoveCount = 0; //we reset the mouseMoveCount
        }
    }


    document.oncontextmenu = function(event) { //on right click
        event.preventDefault(); //right click wont show the context menu anymore
    }

    function snipeScrollScreen(gun){
            if (gun === 'Starter Snipe' || gun === 'Double Snipe') { //if the gun is snipe so we change the size of canvas view and make player view more distance
                WIDTH = 1600;
                HEIGHT = 900;
                CANVAS_WIDTH = 1600;
                CANVAS_HEIGHT = 900;
                worldView = 950;
                resizeCanvas();
            }
            else if(gun === 'Pro Snipe'){
                WIDTH = 1920;
                HEIGHT = 1080;
                CANVAS_WIDTH = 1600;
                CANVAS_HEIGHT = 900;
                worldView = 950;
                resizeCanvas();
            }
            else { //otherwise
                if (WIDTH !== 1280 && HEIGHT !== 720) { //if the canvas is unnormal we set the canvas view size back to its normal
                    WIDTH = 1280;
                    HEIGHT = 720;
                    CANVAS_WIDTH = 1280;
                    CANVAS_HEIGHT = 720;
                    worldView = 800;
                    resizeCanvas(true);
                }
            }
    }

    //this hole scroll section bellow will change the gun acccording to scroll
    var previousScrollDirection = window.scrollY; //this will find us the direction of scroll
    var scrollNumber = 0; //the number between 0 and guns list
    document.onwheel = function(e) { //on scroll wheel function
        if (selfId) { //we test if player exhists
            if (e.deltaY < 0) { //if scroll up
                scrollNumber += 1; //we increase the scroll number by 1
                testScrollNumLimit(); //we test if it is inside the range of lengh of our gun names
                choosenGunText = playerControllerGunList[scrollNumber]; //we change the choosenGunText for the UI here
            }
            if (e.deltaY > 0) { //if scroll down
                scrollNumber -= 1; //we decrease the scroll number by 1
                testScrollNumLimit(); //we test if it is inside the range of lengh of our gun names
                choosenGunText = playerControllerGunList[scrollNumber]; //we change the choosenGunText for the UI here
            }
            socket.emit('scrollGun', {
                gun: choosenGunText
            }); //this should get out of here and be called less
            Player.list[selfId].gun = choosenGunText; //we set the choosen gun of player owner
            snipeScrollScreen(choosenGunText);//check if its snipe
        }
    }
    var testScrollNumLimit = function() { //this will test if it is inside the range of lengh of our gun names
        if (scrollNumber >= playerControllerGunList.length) //if the number is higher than the playerControllerGunList length, it is a variable with all possible guns
            scrollNumber = 0; //we bring scrollNumber back to minimum
        if (scrollNumber < 0) //if the number is lower than the min playerControllerGunList length, it is a variable with all possible guns
            scrollNumber = playerControllerGunList.length - 1; //we set scrollNumber to the highest minus 1
    }

    // window.onbeforeunload = function() {//this will notice players when leaving
    // 	return "Leave ufowar.space?";
    // };
