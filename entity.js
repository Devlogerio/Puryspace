require('./guns'); //load a file is with requre('path and name of the file without the type in this case without the .js'); ./ means its in the current directory, for going back one directory u use ../


//these two are for section 1 and 3, init and remove loop, this packages are going to be send to clients every single frame
initPack = {
    player: [],
    bullet: [],
    stone: [],
    fuel: [],
    station: [],
}; //this will hold all the data about the initialization, whenerever we create a new player we add it to the initPack
removePack = {
    player: [],
    bullet: [],
    stone: [],
    fuel: [],
    station: [],
}; //this will hold all the data about the remove pack, whenever we remove a player we add it to the remove pack
MAP_RADIUS = 10000; //5000; the radius or width/height of the map
STONE_NUMBER = 300; //200; the number of stones
FUEL_NUMBER = 40; //15; the number of fuels
EPIC_STONE_CIRCLE = 1500;//the radius that epic stines drop in
STATION_NUMBER = 20;//number of stations
//FUEL_STATION_DISTANCE = 2000;//
playerRectSize = 25; //this should be sync to client, this is for inlarging the map according to number of players
sizePerPlayer = 50; //this should be sync to client, this is for inlarging the map according to number of players
randomColor = [//random color list
    // '#f73333',
    // '#e5f442',
    // '#41f4eb',
    // '#f44188',
    // '#f44141',

    // '#3a270d',
    // '#5b3b0e',
    // '#5b300e',
    // '#591c00',
    // '#422213',

    '#669ce2',
    '#d766e2',
    '#e26678',
    '#66e293',
    '#e2d766',
];
randomEpicColor = [//random epic color list
    //  '#bc2f00',
    //  '#bc6d00',
    //  '#bcac00',
    //  '#acbc00',
    //  '#34664c',
     
    //  '#050033',
    //  '#00332b',
    //  '#003300',
    //  '#332f00',
    //  '#330000',

      '#F52549',
      '#2988BC',
      '#ED8C72',
      '#F9BA32',
      '#BA5536',

];
randomMap = [//list of maps
    '1',
];


//now if we do Entity(), we will create an entity with its default values
//we we do Entity({x:100,id:'asdasdasd'}); it will make an Entity with default values but overwrites the things we told it
Entity = function(param) { //this constructor will take the following things aas its model, right now the entity cannot be changed at first its made, we simply call it then we update its variables, but with calling a parameter like param we can have our very first created entity with new variables, its optional but we do it, so we give it a variable called param, so now we can add things like map and...
    var self = {
        x: getRandomRange('x'),
        y: getRandomRange('y'),
        spdX: 0,
        spdY: 0,
        id: "",
        map: "1",
        rectSize: 15,
    }
    if (param) { //so entity has some variables and now with param if we want we can overwrite it
        if (param.x)
            self.x = param.x;
        if (param.y)
            self.y = param.y;
        if (param.map)
            self.map = param.map;
        if (param.id)
            self.id = param.id;
    }

    self.update = function() { //update loop of each entity
        self.updatePosition();
    }
    self.updatePosition = function() {
        self.x += self.spdX;
        self.y += self.spdY;
    }
    self.getDistance = function(pt) { //this is added for being aware of collision, so whenever we call it we can be alerted of distance between any object and the object that uses this Entity, pt means point here, becouse we give it a point to test the distance
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    }
    return self;
}

Entity.getFrameUpdateData = function() { //becouse removePack and initPack are here in this file now in order to not make them global variables but still have access to them from other files so we made this class to return initPack and removePack to whom ever want them.
    //the code bellow was not clean and has been changed and some codes from app file came here
    //return{//this will send initPack and removePack as an object
    //	initPack:initPack,
    //	removePack:removePack,
    //}

    var pack = { //so we put all the data from initPack and removePack to here also we made an updatePack which cotains the updates of players and bullets
        initPack: { //instance of initPack
            player: initPack.player,
            stone: initPack.stone,
            bullet: initPack.bullet,
            fuel: initPack.fuel,
            station: initPack.station,
        }, //we have ',' here becouse we are going to stroe 3 object arrays inside 1 object
        removePack: { //instance of removePack
            player: removePack.player,
            stone: removePack.stone,
            bullet: removePack.bullet,
            fuel: removePack.fuel,
            station: removePack.station,
        },
        updatePack: { //newly made updatePack which contains all the updates
            player: Player.update(), //player.update will make a pack and in that pack it stores every player new id x y hp score map
            stone: Stone.update(), //player.update will make a pack and in that pack it stores every Stone new id x y hp score map
            bullet: Bullet.update(), //bullet.update will make a pack and in that pack it stores every Bullet new id x y
            fuel: Fuel.update(), //Fuel.update will make a pack and in that pack it stores every Fuel new id x y
            station: Station.update(), //Station.update will make a pack and in that pack it stores every Station new id x y
        },
    };
    //here we empty our initPack and updatePack < not the ones inside pack, infact we reset the arrays
    initPack.player = [];
    initPack.bullet = [];
    initPack.stone = [];
    initPack.fuel = [];
    initPack.station = [];
    removePack.player = [];
    removePack.bullet = [];
    removePack.stone = [];
    removePack.fuel = [];
    removePack.station = [];
    return pack; //we return pack to whom ever call for it
}

Player = function(param) { // creating a new player, before param we were giving it id but now we get param and give it to entity for overwirting, this is a constructor, a constructor allways return something
    var self = Entity(param); //creates an Entity, this is called a super constructor, means that entity is super constructor of player
    //adding a bunch of atributes for it(Entity)
    //self.id = id; becouse now param contains an id so we dont need this anymore and entity will set id
    self.number = "" + Math.floor(10 * Math.random());
    self.username = param.username;
    self.oldUserName = self.username;
    self.party = param.party; //if party be empty, null or "" means he or she is doing solo
    self.oldParty = self.party;
    self.color = param.color;
    self.mouseAngle = 0;
    self.maxSpd = 10;
    self.x = 0;
    self.y = 0;
    self.hp = 10;
    self.hpMax = 10;
    self.hpRegen = 0.2;
    self.fuelMax = 1000;
    self.fuel = self.fuelMax;
    self.fuelReduction = 0.4;
    self.fuelHpReduction = 0.01;
    //self.fuelGeneration = 25;
    self.life = 2;
    self.oldLife = self.life;
    self.score = 0;
    self.addPower = 0;
    self.gunList = ['Default'];
    self.gun = self.gunList[0];
    self.damage = 1;
    self.upgraded = false;
    self.staticSpdPercentage = 10;
    self.nitro = false;
    self.nitroCapacity = 100; //miliseconds
    self.nitroMax = self.nitroCapacity; //miliseconds according to nitroCapacity
    self.nitroPower = 15; //this is something like staticSpdPercentage
    self.nitroRegen = 2;
    self.attackSpd = 1; //attack speed is related to attack counter
    self.attackCounter = 0; //attack counter is related to attack speed
    self.killedBy = '';
    self.moveCall = false;
    self.isPushBack = false;
    self.pushResist = 3;//cannot be 0
    self.destroyed = false;
    self.gameOver = false;
    self.isCollide = false;
    self.outOfFuel = false;
    self.positioning = function(){
        self.x = getRandomRange('x');//we get new position
        self.y = getRandomRange('y');//we get new position
    }
    //self.inventory = new Inventory(param.socket, true); //we make a new attribute which contains the inventory logic, now with param we have access to the socket and we send it as a parameter to the inventory, becouse for sincing the player inventory with the actual player we need to give it access to socket
    self.partyCheck = function() { //this will check if player has entered a right party cpde
        if (self.party === null || self.party.includes(' ', 0) || self.party === "") //here we check if player did not choose any party code so we make him or her alone at the creation of player
            self.party = Math.random() + '';
    }
    self.partyCheck(); //we check if party code is right
    self.positionCheck = function(){//check if not dropped on stone to be stocked
        for (var i in Stone.list) { //we loop throw every player in the Player.list
            var s = Stone.list[i]; //we get the player in the loop
            if (s.map === self.map && self.getDistance(s) <= s.radius + self.rectSize / 2 - 5) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
                s.delete(); //we delete the specific stone
            }
        }
        var stList = getCollision(self, 'Player', 'Station', '', 100); //we get tistance from Stone and self -5 to stay out of it
        if(!objIsEmpty(stList)){
            self.positioning();
            self.positionCheck();//check again
        }
        else if(self.getDistance({x:MAP_RADIUS/2,y:MAP_RADIUS/2}) >= MAP_RADIUS/2){
            self.positioning();
            self.positionCheck();//check again
        }
         return;
    }
    self.positionCheck();//check position for first time
    //so now we can use self.inventory.addItem('posion',1);
    //we no longer use keyboard for moving, but if in case, there you go
    //self.pressingRight = false;
    //self.pressingLeft = false;
    //self.pressingUp = false;
    //self.pressingDown = false;
    //self.pressingAttack = false;
    /*//when movement speed depending on mouse distance
    self.spdPercentage = 0.06;
    self.realMouseX = 0;
    self.realMouseY = 0;
    self.mouseX = 0;
    self.mouseY = 0;
    self.inWidth = 0;
    self.inHeight = 0;
    */

    //we are not using super update here becouse we are modifying it with new one called updateSpd
    var super_update = self.update; //first we keep data inside the update in entity becouse when we overwrite it we wont miss it anymore
    self.update = function() { //overwrites the update for updating speed and then doing the regular update(which is now super_update)
        if (self.destroyed === true || self.gameOver === true) //if its destroyed
            return; //no update made, infact we exit the update loop
        self.updateSpd(); //update the speed
        self.checkOutOfBound(); //check if out of 
        //super_update();

        self.attackCounter += self.attackSpd; //this is for preventing from spam shooting bullet, so in each frame we increase the attack counter
        if (self.pressingAttack) { //we create bullets here, this is nut a good place to create a bullet its more convinient to make the shootBullet class seperate from this and call it here as we did, the code in paranteses is what gives us a random chance, which will happen almost once every two times if you call this line of code in a loop like here (Math.random() < 0.1),, if you want to have modded bullets or multiple bullets shot at a time you should do it here like the comment bellow
            //shooting multiple bullets. ex: for(var i = -3; i < 3; i++)
            //shooting multiple bullets. ex: 	self.shootBullet(i * 10 + self.mouseAngle);
            self.shootBullet(self.mouseAngle)
        }
        if(self.fuel > 0){//here we check if player fueled up, biggest use is when player buy a fuelUp or someone fuel this player up
            self.outOfFuel = false;
        }
    }
    self.shootBullet = function(angle) { //we made a class for creating bullet
        // if (Math.random() < 0.1)//for each 2 bullets we shoot
        // 	self.inventory.addItem("potion", 1);//we add a postion to its inventory
        //in old system we create a bullet and we set the x and y
        //var b = Bullet(self.id,angle);// creates a bullet in a random direction
        //b.x = self.x; //this will make the bullet start from player position
        //b.y = self.y; //this will make the bullet start from player position
        //with new system we can do it by its very nature creation with param in entity like bellow, this technique is alot more convinient and better
        //here we set all th properties of each bullet type, reason we putted them here was becouse we want to be able to change the stats by player level
        self.attackCounter++; //this is for preventing from spam shooting bullet, so in each frame we increase the attack counter
        shootBullet(self, angle);
    };
    //var b = Bullet(self.id,angle);// creates a bullet in a random direction
    //b.x = self.x; //this will make the bullet start from player position
    //b.y = self.y; //this will



    self.updateSpd = function() { //updating the speed takes into concidration if your pressing up or left or down and up, and these things will update whenerever we resive an keyPress command in emit.

        //movement by mouse distance
        //this should be in another function, i mean calculating the speed should be someewhere else,

        //speed by mouse distance twoard angle
        //var mx = (self.mouseX)*self.spdPercentage;
        //var my = (self.mouseY)*self.spdPercentage;
        //static speed toward angle
        //var mx = Math.cos(self.mouseAngle/180*Math.PI) * 20;
        //var my = Math.sin(self.mouseAngle/180*Math.PI) * 20;

        //we calculate speed by distance of mouse and player but if higher than a number we just give it an static speed towards the mouseAngle
        //this is where i was calculationg the speed limits but it has problem when display size changes


        //movement speed depending on mouse distance
        /* // didnt work well, when you try to change the speed it will mess with boundings of stop and high speed
        var mx = (self.mouseX)*self.spdPercentage;//here we calculate speed in X direction by mouse angle and we devide it by a percentage to reduce speed
        var my = (self.mouseY)*self.spdPercentage;//here we calculate speed in Y direction by mouse angle and we devide it by a percentage to reduce speed
        var minRwidth = self.inWidth/420;//here we calculate the minimum distance X (small circle in the screen UI) by deviding the screen size of the player so in every display size it will be where it most be
        var minRheight = self.inHeight/250;//here we calculate the minimum distance Y (small circle in the screen UI) by deviding the screen size of the player so in every display size it will be where it most be
        var maxRwidth = self.inWidth/130;//here we calculate the maximum distance X (big circle in the screen UI) by deviding the screen size of the player so in every display size it will be where it most be
        var maxRheight = self.inHeight/75;//here we calculate the maximum distance Y (big circle in the screen UI) by deviding the screen size of the player so in every display size it will be where it most be
        if(mx >= maxRwidth || mx <= -maxRwidth || my >= maxRheight || my <= -maxRheight)//check if distance is more than the maxR, means that if mouse is outside the big circle in ui
        {
        	//if true so we give it our static speed toward the mouseAngle
        	mx = Math.cos(self.mouseAngle/180*Math.PI) * self.spdPercentage * 100;//here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
        	my = Math.sin(self.mouseAngle/180*Math.PI) * self.spdPercentage * 100;//here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
        	//infact we set the maximum speed the player can go after his/her mouse crossed the big circle, i checked the speed and found that if self.spdPercentage multiplies by 100 we will get the exact speed that if mouse position be on the big circle line, was hard but did it
        }
        else if(mx <= minRwidth && mx >= -minRwidth && my <= minRheight && my >= -minRheight)//check if distance is less than the minR, means that if mouse is inside the small circle in ui
        {
        	mx = 0;//we set the speed to 0
        	my = 0;//we set the speed to 0
        }
        //if not any of if else in above works, so the speed will be mx and my means that it will increase by distance of mouse and player
        //we set the final speed X Y speed depends on what we calculated above
        self.spdX = mx;  //update speed depending of distance from mouse and player devided by a small number for make it slower
        self.spdY = my;  //update speed depending of distance from mouse and player devided by a small number for make it slower
        */

        //here we save the last position
        var oldX = self.x;
        var oldY = self.y;

        //we just use an static speed for now with right click
        if (self.moveCall === true && self.isCollide === false && self.outOfFuel === false) { //if player wants to move
            var spdPercentage = 0; //a memory for speed percentage
            if (!self.isPushBack) { //if it is not a push back and it is normal movement
                if (!self.nitro) { //if nitro is off
                    spdPercentage = self.staticSpdPercentage; //we get the normal speed percentage
                    self.nitro = false; //we set the nitro to false in case of it be on
                } else { //if it is not normal movement so it is nitro, infact if nitro is on
                    spdPercentage = self.nitroPower; //we wont use normal speed percentage instead we use nitro speed percentage
                    self.handleNitro(true); //we handle what will happen after nitro is on
                }
                var mx = Math.cos(self.mouseAngle / 180 * Math.PI) * spdPercentage; //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                var my = Math.sin(self.mouseAngle / 180 * Math.PI) * spdPercentage; //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                self.spdX = mx; //update speed depending of distance from mouse and player devided by a small number for make it slower
                self.spdY = my; //update speed depending of distance from mouse and player devided by a small number for make it slower
            }
        } else if (self.moveCall === false && self.isPushBack === false) { //if its not a push back and not moving
            if (self.nitro) //if player has nitro
                self.handleNitro(false); //we stop the nitro
            //here we slowly stop the player from moving
            self.spdX = self.spdX / 1.5; //we reduse spdX
            self.spdY = self.spdY / 1.5; //we reduce spdY
            super_update(); //we update the speed as usual
            if (self.spdX <= 0.1 && self.spdX >= 0.1 && self.spdY <= 0.1 && self.spdY >= -0.1) { //if speed is too slow
                self.spdX = 0; //we reduse spdX
                self.spdY = 0; //we reduce spdY
            }
        }



        var fList = getCollision(self, 'Player', 'Fuel', '', 0); //we get tistance from Fuel and self 0 to stay out of it
        if (!objIsEmpty(fList)) { //if object is not empty
            for (var i in fList) { //we loop throw every player in the Player.list
                var f = fList[i];
                // fList[i].delete();
                // for(var i in Player.list){
                //     if(Player.list[i].party === self.party){
                //         if(Player.list[i])
                //             Player.list[i].fuel = self.fuelMax;
                //     }
                // }
                self.fuel += f.liter;
                self.scoreHandler(f.liter/2);
                if (self.fuel >= self.fuelMax) { // && f.diactivate === false
                    self.fuel = self.fuelMax;
                }
                f.delete();
                //f.radius -= f.radiusReduction;
                // if(f.radius <= 30){
                //     //f.diactivate = true;
                //     f.delete();
                // }
            }
        }

        // for (var i in Stone.list) { //we loop throw every player in the Player.list
        //     var s = Stone.list[i]; //we get the player in the loop
        //     if (s.map === self.map && self.getDistance(s) <= s.radius + self.rectSize / 2 - 5) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
        //         self.isPushBack = true;
        //         self.spdX = s.spdX * 2.5;
        //         self.spdY = s.spdY * 2.5;
        //     }
        // }
        //here we make player move
        if (self.isPushBack === true) { //check if is pushed back, usually this happens by wave bullets colliding the player
            super_update(); //we update the speed normally
            // if (objIsEmpty(sList)) { //if so
            //     self.x = oldX; //we set the x to its last position
            //     self.y = oldY; //we set the y to its last position
            // }
            setTimeout(function() { //after 200 miliseconds
                self.isPushBack = false; //we set the pusback to fasle
            }, 200);
        }
        else{
        // var sList = getCollision(self, 'Player', 'Stone', '', -5); //we get tistance from Stone and self -5 to stay out of it
        // if (!objIsEmpty(sList)) { //if object is not empty
        //     for (var i in sList) { //we loop throw every player in the Player.list
        //         var s = sList[i]; //we get the player in the loop
        //         self.isPushBack = true; //we set the stone pushback to true
        //         self.spdX = s.spdX * 2.5; //we reduse spdX
        //         self.spdY = s.spdY * 2.5; //we reduce spdY
        //     }
        // }


        super_update(); //we use inheritance from entity for moving


        //here we check collision
        var sList2 = getCollision(self, 'Player', 'Stone', '', -5); //after superUpdate we check again if colliding
        if (!objIsEmpty(sList2)) { //if stone list is not empty
            for (var i in sList2) { //we loop throw every player in the Player.list
                var s = sList2[i]; //we get the player in the loop
                self.collisionWithStone(s); //we do the action colliding with stone
                self.x = oldX;//we set players position back to what it was before colliding
                self.y = oldY;//we set players position back to what it was before colliding
                self.spdX = -self.spdX/8;
                self.spdY = -self.spdY/8;
                self.isCollide = true;
                self.hp -= 2;
                setTimeout(function() { //after 200 miliseconds
                    self.isCollide = false; //we set the pusback to fasle
                }, 500);
                // self.x = (oldX + self.spdX/10); //if it is colliding so we set the position of player back to what it was before colliding
                // self.y = (oldY + self.spdY/10); //if it is colliding so we set the position of player back to what it was before colliding
            }
        }
        var stList = getCollision(self, 'Player', 'Station', '', -5); //we get distance from Station and self -5 to stay out of it
        if (!objIsEmpty(stList)) { //if station list is not empty
            self.x = oldX;
            self.y = oldY;
            stList[1].target = self;
        }
        var pList = getCollision(self, 'Player', 'Player', '', -5); //we get distance from Player and self -5 to stay out of it
        if (!objIsEmpty(pList)) { //if Player list is not empty
            for(var i in pList){
                self.x = oldX;//we set players position back to what it was before colliding
                self.y = oldY;//we set players position back to what it was before colliding
                self.spdX = -self.spdX/8;
                self.spdY = -self.spdY/8;
                self.isCollide = true;
                self.hp -= 2;
                setTimeout(function() { //after 200 miliseconds
                    self.isCollide = false; //we set the pusback to fasle
                }, 500);
            }
        }

        self.reduceFuel(); //the reason we put it here was that if we put it inside the set interval it will throw an eror sometimes

        //we no longer use this
        //  var s = getCollision(self,'Player','Stone',5);//we test collision between Player and Stone here
        //  if(s){//if stone exists
        //  }

        /*//movement by keyboard
        if(self.pressingRight)
        	self.spdX = self.maxSpd;
        else if(self.pressingLeft)
        	self.spdX = -self.maxSpd;
        else
        	self.spdX = 0;
		
        if(self.pressingUp)
        	self.spdY = -self.maxSpd;
        else if(self.pressingDown)
        	self.spdY = self.maxSpd;
        else
        	self.spdY = 0;
        */
    }
    }
    self.collisionWithStone = function(s) { //actions when colliding with stone
        //we wont check stone collision using getCollision function, because it makes a dellay
        s.isStop = false; //so th stone starts to move
        s.spdX = self.spdX/self.pushResist; //stone spdX will be equal to our bullet speed div bullet push resist, higher pushresist is slower the stone will be pushes
        s.spdY = self.spdY/self.pushResist; //stone spdY will be equal to our bullet speed div bullet push resist, higher pushresist is slower the stone will be pushes
        //self.hp -= 0.1;
    }

    self.handleNitro = function(inProgress) { //whenever nitro is on we call this
        if (inProgress) { //if nitro is on
            self.nitroMax--; //we reduce the nitro capacity by 1 for each frame
            if (self.nitroMax <= 0) { //if out of nitro
                self.nitro = false; //nitro is off
                self.nitroMax = 0; //nitro capacity stays at 0
            }

            // setTimeout(function(){//after nitroMax time we set the nitro to off
            // 	self.nitro = false;//we set the nitro to off
            // },self.nitroMax);
        } else { //if nitro is off
            self.nitro = false; //turn off the nitro
        }
    }
    setInterval(function() { //loop for nitro and hp every 1 seconds
        if (self.destroyed === true || self.gameOver === true)//if player is destroyed or player is gameover
            return;
        if (!self.nitro) { //if nitro is not in use
            if (self.nitroMax <= self.nitroCapacity - self.nitroRegen) //if nitro is not full
                self.nitroMax += self.nitroRegen; //we add the nitro by its regen num
        }
        if (self.hp <= self.hpMax - self.hpRegen && self.fuel > 0) { //if hp is not full and player is not out of fuel
            self.hp += self.hpRegen; //we add the hp by its regen num
        }
    }, 1000);

    self.checkOutOfBound = function() { //ceck if out of map boundings or not
        //var playerCount = getObjectSize(Player.list) * sizePerPlayer; //this is going to be add to the width and height so map grows and decreases when players are more or less, note that this should be the exact of what is inside the client code
        //note that if you change the size of map so you have to change it in isDead so respawn will be fixed
        if (self.getDistance({
                x: MAP_RADIUS / 2,
                y: MAP_RADIUS / 2
            }) > MAP_RADIUS / 2 + 20 && self.x !== MAP_RADIUS * 2 && self.y !== MAP_RADIUS * 2) { //we check if the position be between the bounds of the map, with the /2 we check the map grow or decrease from 4 sides
            self.hp -= 0.1; // we reduce the hp of player becouse hes or shes out of bound
            self.checkIfDead(); //we check if dead or not
        }
    }

    self.scoreHandler = function(score) { //here we handle the score system
        self.rectSize = Math.round(playerRectSize + self.score / 1200);
        if(score !== 0){
            self.score += Math.round(score); //we add the score by given number
            if(self.fuel <= 0){
                self.fuel += 200;
            }
        }
    }

    self.reduceFuel = function() { //this will reduce the fuel of player on each frame
        if(self.outOfFuel !== true){
            self.fuel -= self.fuelReduction; //reduce fuel by fuelReduction number
            if(self.fuel < 0)
                self.fuel = 0;
        }
        if(self.fuel <= 0 && self.hp > 0){
            self.hp -= self.fuelHpReduction;
        }
        self.checkIfDead(); //we check if player is dead
    }

    self.checkIfDead = function() { //we check if we are dead, for example if we want an Ankh item it would work here
        if (self.hp <= 0 && self.destroyed === false) { //if hp is less than or equal to 0
            self.isDead(); //player is dead
        }
        else if(self.fuel <= 0){//if out of fuel
            self.outOfFuel = true;//we stop the player at all
            self.moveCall = false;//we stop the player at all
        }
    }

    self.isDead = function() { //we kill the player, infact it means we reset hes or her game
        // //note that map size will change according to number of players so self.x and self.y shsould be fixed
        // self.destroyed = true;
        // self.hp = self.hpMax;//we set the hp of player to the max hp
        // self.score = self.score/1.5;
        // self.reSpawn();


        // self.score = self.score/1.5;
        // self.x = 10000;
        // self.y = 10000;
        if(self.killedBy === '' || self.killedBy === null){
            self.killedBy = "something";
        }
        self.life -= 1;//if player died so we dicrease players life
        if (self.life < 0){//if out of life
            self.gameOver = true;//game over is true
        }
        self.destroyed = true;//player is destroyed anyway whether its a game over or not
        SOCKET_LIST[self.id].emit('destroyed', {//we tell the client he or she died
            gameOver: self.gameOver,
            killer: self.killedBy,
        });
    }


    self.reSpawn = function(state) { //on respawn function
        if (self.gameOver === true)//if game over
            return;
        if (state === 'reset') { //if it has to reset the game
            self.hp = self.hpMax; //we set the hp of player to the max hp
            self.nitroMax = self.nitroCapacity; //we set the hp of player to the max hp
            self.fuel = self.fuelMax; //we set the hp of player to the max hp
            self.destroyed = false; //player is no longer destroyed
        }
        self.x = getRandomRange('x'); //we find a random valid x
        self.y = getRandomRange('y'); //we find a random valid y
        //for now the bellow thing doesnt work becouse if two stones on eachother so it wont work
        // var s = getCollision(self,'Player','Stone');//we test collision between Player and Stone here
        // if(s){//if Stone exists
        // 	s.delete();
        // 	console.log('Stone deleted');
        // }
        self.positionCheck();
    }

    self.getInitPack = function() { //this function is written just to make the code more clean, we actually make an object of player for the initPack
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            username: self.username,
            party: self.party,
            color: self.color,
            hp: self.hp,
            hpMax: self.hpMax,
            fuel: self.fuel,
            fuelMax: self.fuelMax,
            nitroCapacity: self.nitroCapacity,
            score: self.score,
            map: self.map,
            mouseAngle: self.mouseAngle,
            gun: self.gun,
            life: self.life,
        };
    }
    self.getUpdatePack = function() { //this function is written just to make the code more clean, we actually make an object of player for the initPack, in fact we dont update the constant atrubutes like hpMax or number, this is going to be very complex and will check if the value have change and if so send it otherwise dont send it also compression is a lot important in the update ***THIS UPDATE REALLY NEEDS TO BE IMPROVED***
        var packUp = {
            id: self.id,
            x: self.x,
            y: self.y,
            hp: self.hp,
            fuel: self.fuel,
            score: self.score,
            map: self.map,
            mouseAngle: self.mouseAngle,
            moveCall: self.moveCall,
            nitro: self.nitro,
            nitroMax: self.nitroMax,
            destroyed: self.destroyed,
            gun: self.gun,
        };
        if (self.username !== self.oldUserName) {
            self.oldUserName = self.username;
            packUp.username = self.username;
        }
        if (self.party !== self.oldParty) {
            self.oldParty = self.party;
            packUp.party = self.party;
        }
        if (self.color !== self.oldColor) {
            self.oldColor = self.color;
            packUp.color = self.color;
        }
        if (self.upgraded === true) {
            packUp.hpMax = self.hpMax
            packUp.nitroCapacity = self.nitroCapacity
            self.upgraded = false;
        }
        if (self.life !== self.oldLife) {
            self.oldLife = self.life;
            packUp.life = self.life;
        }

        return packUp;
    }


    Player.list[self.id] = self; //add the player to Player.list

    initPack.player.push(self.getInitPack()); //whenever we create a new player we also add it to the initPack for sending to clients


    self.reSpawn(); //we spawn player once at his creation
    return self;
}
Player.list = {}; // this is not a global variable

Player.onConnect = function(socket, username, party, color) { // static function, it has a listener for any keyPress package thats gonna update pressing Left Right of Player, we also passed the username here to set it, whenerever this function is called it means that player has entered the right username and password and succesfully conected
    var map = '1'; //each player that connects by default we give it a map forest
    // if (Math.random() < 0.5)//there is a 50% chance, this if will happen 50% of the time
    // 	map = 'field';//that map will be overwritten by field
    var player = Player({//we make the player
        username: username,
        id: socket.id,
        map: map,
        party: party, //here we set the part to friends and foes will be found if null or empty means he or she is doing it solo
        color: color, //we set the color of player
        socket: socket, //we send socket so in player constructor we will have access to it as a param for inventory and ...
    }); //create a new player depending on socket id, infact we call the super constructor of player to set the id for us, eventually we want to set the x and y and the map of player to where he/she left before, we do  it all here by param in entity (*Important*)
    if(player)//if player made
    socket.emit('signInResponse', {//we alert the client about it
        success: true
    }); //we emit to client the success true
    socket.on('keyPress', function(data) { // this will update the atributes of the player and change the state of them by compairing the inputIds

        /*//we no longer set the speed by keyboard 
        if(data.inputId === 'left')
        	 player.pressingLeft = data.state;
         else if(data.inputId === 'right')
        	 player.pressingRight = data.state;
         else if(data.inputId === 'up')
        	 player.pressingUp = data.state;
         else if(data.inputId === 'down')
        	 player.pressingDown = data.state;
        */
        //we check if mouse is clicked and we should perform attack
        if (data.inputId === 'attack') //if attack
            player.pressingAttack = data.state; //we tell player to attack
        //we check if imput is mouseAngle
        else if (data.inputId === 'mouseMove') {
            //we calculate the mouse angle and mouse position here instead of client side to prevent cheaters
            //note that we just set the stat of player here and no movement is calculated here and everything else is in the updateSpd of player
            var mx = data.mx; //we get x of the mouse
            var my = data.my; //we get y of the mouse

            mx -= data.w / 2; //we find x of the mouse reletieve to the middle of the screen, WIDTH/2 represents the middle
            my -= data.h / 2; //we find y of the mouse reletieve to the middle of the screen, HEIGHT/2 represents the middle
            var angle = Math.atan2(my, mx) / Math.PI * 180; //we calculate the angle by the atan2, it has been calculated in PI

            player.mouseAngle = angle; //we set the mouse angle position

            /* when we want movement speed depending on mouse distance then we get these
            player.realMouseX = data.mx;//we set the mouse x position according to display size of canvas
            player.realMouseY = data.my;//we set the mouse y position according to display size of canvas
            player.mouseX = mx;//we set the mouse x position, note that this is the position of mouse inside the game width and height not according to the display canvas
            player.mouseY = my;//we set the mouse y position, note that this is the position of mouse inside the game width and height not according to the display canvas
            player.inWidth = data.w;//we set the player inWidth
            player.inHeight = data.h;//we set the player inHeight
            */
        } else if (data.inputId === 'startMove') { //we listen to startMove to see when to move and when to stop
            if (data.state === true) { //if state is true
                if (data.type === 'nitro') { //if player movement is with nitro
                    player.nitro = true; //we make player move we set the player nitro to on
                }
                player.moveCall = true; //we make player move anyway
            } else { //otherwise
                player.moveCall = false; //we stop the player from moving
            }
        }
    });
    //note that map size have to change according to number of players so self.x and self.y shsould be fixed
    socket.on('scrollGun', function(data) { //we listen to scrollGun package and change the player gun if he wants
        for (var i = 0; i < player.gunList.length; i++) {//we loop throw guns of player
            if (player.gunList[i] === data.gun) {//if the gun is equal to what player wanted
                player.gun = player.gunList[i]; //we set the player gun to what we recieved from him/her
            }
        }
    });

    socket.on('respawn', function(data) { //we listen to respawn package and change the player destroyed if he wants
        if (player.destroyed) { //if player is destroyed otherwise nothing
            player.reSpawn('reset'); //we respawn player by concidering it as reset
        }
    });

    socket.on('buyItem', function(data) { //we listen to buyItem message
        for (var i in player.gunList) {//we loop throw all guns of player
            if (player.gunList[i] === data.gun)//if already have it so nothing
                return;
        }
        if (data.item === '' && player.score >= gunPices[data.gun]) { // && player.gunList[1] !== data.gun // but if dont have it so we check the price and buy it if possible actually we check if we have the money too
            player.score -= gunPices[data.gun];//we buy the item
            player.scoreHandler(0)//we change the size of player occoding to his score
            player.gunList.push(data.gun);//we add the new gun to player gunlist
            player.gun = data.gun;//we set the main gun of player
            socket.emit('itemBought', {//here we send player that the item is bought
                state: true,
                gunList: player.gunList,
            });
        } else if (data.item === 'Life') {//if player asked for buying a Life
            if (player.score >= itemPrices[data.item]) {//if has enough score
                player.life += 1;//we add one life
                player.score -= itemPrices[data.item];//we take the score
                player.scoreHandler(0);//we check the size of player
                socket.emit('itemBought', {//we send that item is bought
                    state: true,
                    item: 'Life',
                });
            }
        } else if (data.item === '2x Fuel') {//if player asked for buying a Life
            if (player.score >= itemPrices[data.item] && player.fuel <= player.fuelMax + 120) {//if has enough score
                player.fuel += 120;//we add one life
                player.score -= itemPrices[data.item];//we take the score
                player.scoreHandler(0)//we check the size of player
                socket.emit('itemBought', {//we send that item is bought
                    state: true,
                    item: '2x Fuel',
                });
            }
        }
    });

    // socket.on('changeMap', function (data) {//we listen to changeMap package and change the player map if he wants
    // 	if (player.map === '1')//we check if player map is field
    // 		player.map = '2';//we set it to forest
    // 	else//otherwise
    // 		player.map = '1';//we set it to field
    // 	//we have access to the player becouse we are inside the player.onConnect, so we are allways modifying the right player
    // });




    socket.on('sendMsgToServer', function(data) { //we listen to the sendMsgToServer and get the package from in and send it to ther players, we only want the player send messages to the server if he is online, so we put it in Player.onConnect so it will be called only if player is connected, we are sending data which is like data: message
        //var playerName = ("" + socket.id).slice(2,7);//herew we get the id of player (by slicing we get a slice of the id) to be ware of who is sending it, now that we have access to the player username we no longer need this
        //if (player.username !== 'Cena489') { //if data dose not contain html element signs But if its Cena489 its ok
            if (data !== "" && data.length <= 30) {//!data.msg.includes('<' || '>', 0) //if data doese not include html element signs and is less than 100 characters
                for (var i in SOCKET_LIST) { //we loop throw every socket in our list
                    //SOCKET_LIST[i].emit('addToChat', player.username + ': ' + data); //we send the package to each of them, the package is the message someone sent and we send it by his id, if you wanted to show the id of player so you uncomment the playerId section and add playerId instead of username
                    SOCKET_LIST[i].emit('addToChat', {id:player.id,msg:data}); //we send the package to each of them, the package is the message someone sent and we send it by his id, if you wanted to show the id of player so you uncomment the playerId section and add playerId instead of username
                }
            }
        //} else { //if he is game master, the message game master sends can contain html elements
        //    for (var i in SOCKET_LIST) { //we loop throw every socket in our list
        //        SOCKET_LIST[i].emit('addToChat', data.msg); //we send any data to all
        //    }
        //}
    });


    //socket.on('sendPmToServer', function(data) { //we listen to the sendMsgToServer and get the package from in and send it to ther players, we only want the player send messages to the server if he is online, so we put it in Player.onConnect so it will be called only if player is connected, we are also sending a data in Pm but in this case it is like data: {username,message}
    //    var recipientSocket = null; //for pm we create recipientSocket variable and by default we set it to null becouse we need to verify there is idead a player with the username mentioned
    //    for (var i in Player.list) //we loop throw all the players
    //        if (Player.list[i].username === data.username) //as soon as we find a player that has a username equal to the username of the4 message
    //            recipientSocket = SOCKET_LIST[i]; // we set the recipient to SOCKET_LIST[i]. note: the i in Player.list[i] is the id and id in Player.list and SOCKET_LIST are the same (id of the player and id of the socket are the same) so you can enterchange the ids we could also do something like SOCKET_LIST[Player.list[i].id]<< becouse the .id here is equal to the [i] and also equal to the socket id and their all the same
    //    if (recipientSocket === null) { //if we have not found anyone with the username provided
    //        socket.emit('addToChat', 'The player ' + data.username + ' is not online.'); //we send a not found message to player, note: socket here mensions the player controller
    //    } else { //and if it was found
    //        recipientSocket.emit('addToChat', 'From ' + player.username + ': ' + data.message); //we send the message to the found player from sender
    //        socket.emit('addToChat', 'To ' + data.username + ': ' + data.message); //we also send it to the sender so he knows the message is sent corrently
    //        //note: player is the one sending the message also socket is the one sending the message and recipientSocket is the one recieving the message
    //    }
    //});




    socket.emit('init', { //we send this init becouse whenever a player connects he/she should recieve all the stat and data from players and bullets to actually see the things that has been created befor him
        selfId: socket.id, //we are doing this becouse the client should be aware of who he is, if we dont send this, the client will not know which player is himself.
        player: Player.getAllInitPack(), //for making it more clean we made seprate class for each one
        bullet: Bullet.getAllInitPack(), //for making it more clean we made seprate class for each one
        stone: Stone.getAllInitPack(), //for making it more clean we made seprate class for each one
        fuel: Fuel.getAllInitPack(), //for making it more clean we made seprate class for each one
        station: Station.getAllInitPack(), //for making it more clean we made seprate class for each one
    });
}

Player.getAllInitPack = function() {
    //we have to send all the stat and data about all existing players and bullets to client so we do as bellow, why we dont use the initPack becouse we set it to epty every frame after we sent it!
    var players = []; //we make an empty array
    for (var i in Player.list) //we loop throw all the players
        players.push(Player.list[i].getInitPack()); //for each player we push player.getInitPack means that we are creating a list of all players and we get their data with getInitPack
    return players;
};




Player.onDisconnect = function(socket) { //static function, when the player thisconnects the following function will run
    delete Player.list[socket.id]; //it will removes the socket(connected player) from the player list
    removePack.player.push(socket.id); //whenever we remove a player we also add it to the removePack to send for clients, in this case we only send the id
}
Player.update = function() { //static function, update all the player
    var pack = [];
    for (var i in Player.list) { //loop throw all the players
        var player = Player.list[i];
        player.update(); //update them
        pack.push(player.getUpdatePack()); // this should be another distinct function, Create a little package that will be returned so we made the class called getUpdatePack

    }
    return pack;
}



Bullet = function(param) { //in orther to create bullet we need to pass angle, In order to have a collision system we need to know who shot the bullet so we have to implement parent
    var self = Entity(param); //creates an Entity
    //adding a bunch of atributes for it(Entity)
    self.id = Math.random(); // assign an id
    //angle doese not exist, its only a parameter to set the spdX and spdY, thats why it doesnt need to be an atribute of the bullet, but its a good thing to store it becouse we could be needing it in the future
    self.angle = param.angle; //if we want to shoot an arrow and want the arrow to be at the right direction we will need angle as a parameter of bullet so we save it
    self.spdX = param.spdX //Math.cos(self.angle / 180 * Math.PI) * 20; //(changing 20 will adjust the speed)speed on x direction depending on angle, Try to change the numbers inside the formula, each element means something, for example if change 180 and see what will happen
    self.spdY = param.spdY //Math.sin(self.angle / 180 * Math.PI) * 20; //(changing 20 will adjust the speed)speed on y direction depending on angle, Try to change the numbers inside the formula, each element means something, for example if change 180 and see what will happen
    self.timer = 0; //tumer start
    self.maxTime = param.maxTime; //tumer start 25 is normal
    self.toRemove = false; //will it remove or not
    self.parent = param.parent;
    self.angle = param.angle;
    self.gun = param.gun;
    self.pushResist = param.pushResist;
    self.damage = param.damage;
    self.party = param.party;
    self.stoneDamage = param.stoneDamage;
    self.rectSize = param.rectSize;
    self.homingSpd = param.homingSpd;
    self.spdPercentage = param.spdPercentage;
    self.isWaved = false;
    self.color = param.color;
    self.kind = param.kind;
    var super_update = self.update; //first we keep data inside the update in entity becouse when we overwrite it we wont miss it anymore
    self.update = function() { //overwrites the update for updating speed and then doing the regular update(which is now super_update)
        if (self.timer++ > self.maxTime) //every frame we increase timer by 1
            self.toRemove = true; //if timer number is too big we set toRemove flag to true
        super_update();



        if (self.gun.includes('Homming', 0)) { // && self.isWaved === false//if the gun is homming and not waved, we check if gun name includes homming
            setTimeout(function() { //after 1 seconds it will follow the enemy otherwise nothing
                var p1List = getCollision(self, 'Bullet', 'Player', 'Homming'); //we test collision between Bullet and Player in which case the Bullet is Homming specially
                if (!objIsEmpty(p1List)) { //if object is not empty
                    for (var i in p1List) { //we loop throw all founded players
                        var p1 = p1List[i]; //we set the specific player to p to make it easier
                        if (p1 && !p1.destroyed && self.isWaved === false) { //if the player who we tested for homming exists
                            self.angle = getAngle(self.x, self.y, p1.x, p1.y); //here we get the angle between two points so the bullet will follow the player
                            self.spdX = Math.cos(self.angle / 180 * Math.PI) * self.homingSpd //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                            self.spdY = Math.sin(self.angle / 180 * Math.PI) * self.homingSpd //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why

                            // mx -= data.w / 2;//we find x of the mouse reletieve to the middle of the screen, WIDTH/2 represents the middle
                            // my -= data.h / 2;//we find y of the mouse reletieve to the middle of the screen, HEIGHT/2 represents the middle
                            // var angle = Math.atan2(my, mx) / Math.PI * 180;//we calculate the angle by the atan2, it has been calculated in PI
                        }
                    }
                }
            }, 500);

        }
        var pList = getCollision(self, 'Bullet', 'Player'); //we test collision between Bullet and Player here
        //here we can handle collision. ex: hp--;
        if (!objIsEmpty(pList)) { //if player object is not empty
            //for(var i in pList){
            var p = pList[1]; //we get the first person bullet collide if we pit i instead of 1 then bullet might collide with multiple players on eachother
            if (p && !p.destroyed) { //we check if victim is exists
                if (self.party !== p.party && self.gun.includes('Fueler',0) === false) { //if player party is not equal to bullet party
                    p.hp -= self.damage; //this will go into a new function, bullet update should not be aware of what will happens to the victom
                    if (self.gun.includes('Wave', 0)) { //if the gun is wave, we check if gun name includes wave
                        p.isPushBack = true; //we push back the player
                        p.spdX = self.spdX / self.pushResist; //we set spdX to this ammount
                        p.spdY = self.spdY / self.pushResist; //we set spdY to this ammount
                    }
                    if (p.hp <= 0) { //if player is dead
                        if (self.kind !== 'Station') {//if shooter is not a station
                            var shooter = Player.list[self.parent]; //we know the sooter is self.parent but its only id of the player so we need the actual object of the shooter
                            if (shooter) { //the shooter could have disconnected, here we test if the shooter is still alive
                                //this will go into a new function, bullet update should not be aware of what will happens to the winner
                                shooter.scoreHandler(Math.round(p.score / 2)); //we add shooter score by half of who has been killed
                                p.killedBy = shooter.username; //we assign the killedBy id
                            }
                            //this will go into a new function, bullet update should not be aware of what will happens to a dead player
                        } else {//if the  bullet is from a station
                            p.killedBy = "AI ship";
                            // for (var i in Player.list) {//we loop trough all players
                            //     var shooter = Player.list[i];//we get the specific player
                            //     if (p) {//if player exists
                            //         shooter.scoreHandler(Math.round(p.score / 3));//we add the score to shooters score
                            //     }
                            // }
                        }
                        p.checkIfDead(); //here the player should check if hes dead and what to do
                    }
                }
                if(p.party === self.party && self.gun.includes('Fueler', 0)){
                    if(p.fuel < p.fuelMax - self.damage)
                        p.fuel += self.damage;
                    var shooter = Player.list[self.parent]; //we know the sooter is self.parent but its only id of the player so we need the actual object of the shooter
                    if (shooter) { //the shooter could have disconnected, here we test if the shooter is still alive
                        if(shooter.fuel < shooter.fuelMax - self.damage){
                            shooter.fuel += self.damage;
                            shooter.score += self.damage/2;
                        }
                    }
                }
                self.toRemove = true; //we set the toRemove state to true so it get remove, even when it is a friend we delete the bullet, if you want friendly fire setting you handle it here
                //}
            }
        }

        var bList = getCollision(self, 'Bullet', 'Bullet'); //we test collision between Bullet and Bullet here
        //for(var i in bList){
        if (!objIsEmpty(bList)) { //we check if object is not empty
            var b = bList[1]; //we make an instance for the first bullet we found
            if (b && b.party !== self.party) { //if parties are not same
                if (self.gun.includes('Wave', 0) && !b.gun.includes('Wave', 0) && !b.gun.includes('Mine', 0)) { //Two waves cant collide and nothing can collide with a mine, we check if gun name includes wave and mine
                    b.spdX = b.spdX / 3; //we reduce the spdX of founded bullet by 1
                    b.spdY = b.spdY / 3; //we reduce the spdY of founded bullet by 1
                    b.isWaved = true; //the other bullet will know that a wave hits it
                } else if (!b.gun.includes('Wave', 0) && !b.gun.includes('Wave', 0)) { //if the other gun is not wave and self gun is not wave, we check if gun name includes wave
                    var distraction = randomNumberRange(-20, 20); //we get a random range for degree
                    b.angle += distraction; //we add the new degree to that bullet angle
                    b.spdX = Math.cos(b.angle / 180 * Math.PI) * b.spdPercentage //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                    b.spdY = Math.sin(b.angle / 180 * Math.PI) * b.spdPercentage //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                }
            }
        }
        //}

        self.checkCollisionWithStone(); //check collision with Stones
        self.checkCollisionWithStation(); //check collision with Statons
        //  var s = getCollision(self,'Bullet','Stone');//we test collision between Bullet and Stone here
        //  	if (s) {//if Stone exists
        // 		s.gotPush(self);//Stone has got push
        // 		self.toRemove = true;//we set the toRemove state to true so it get remove, even when it is a friend we delete the bullet, if you want friendly fire setting you handle it here
        // 	}

    }
    self.checkCollisionWithStone = function() { //here we check collision with stones
        //we wont check stone collision using getCollision function, because it makes a dellay
        var sList = getCollision(self, 'Bullet', 'Stone'); //we test collision between Bullet and Bullet here
        if (!objIsEmpty(sList)) { //if object is not empty
            //for (var i in sList) { //we loop throw every player in the Player.list
            var s = sList[1]; //we get the player in the loop
            //if (self.map === s.map && self.getDistance(s) < s.radius) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
            s.isStop = false; //so th stone starts to move
            s.spdX = self.spdX / self.pushResist; //stone spdX will be equal to our bullet speed div bullet push resist, higher pushresist is slower the stone will be pushes
            s.spdY = self.spdY / self.pushResist; //stone spdY will be equal to our bullet speed div bullet push resist, higher pushresist is slower the stone will be pushes
            s.hp -= self.stoneDamage; //reduce the hp of stone by the damage of our bullet
            s.radius -= s.potential * self.stoneDamage; //reduce the radius of stone by its potential multiplied by the damage so allways get to 15 radius
            if (s.radius < 15 || s.hp <= 0) { //we check if radius is less than 25
                    var shooter = Player.list[self.parent]; //we get the shooter
                    if (shooter) { //if he exhists
                        shooter.scoreHandler(s.score); //we add his scroe by stone score
                    }
                s.delete(); //we delete the stone
            }
            self.toRemove = true; //we set the toRemove state to true so it get remove, even when it is a friend we delete the bullet, if you want friendly fire setting you handle it here			 	}
            //}
            //}
        }
    }
    self.checkCollisionWithStation = function() { //here we check collision with Stations
        //we wont check stone collision using getCollision function, because it makes a dellay (this problem is fixed)
        var stList = getCollision(self, 'Bullet', 'Station'); //we test collision between Bullet and Station here
        if (!objIsEmpty(stList) && !self.gun.includes('Wave', 0) && self.kind !== 'Station') { //if object is not empty and its not wave and its not from station
            var shooter = Player.list[self.parent]; //we get the shooter
            if (shooter && self.gun.includes('Fueler',0) === false) { //if he exhists
            //for (var i in sList) { //we loop throw every player in the Player.list
            var st = stList[1]; //we get the player in the loop
            st.target = shooter;
            //if (self.party !== st.party) {
                st.hp -= self.damage; //reduce the hp of Station by the damage of our bullet
                //st.radius -= 1; //reduce the radius of stone by its potential multiplied by the damage so allways get to 15 radius
                if (st.radius < 15 || st.hp <= 0) { //we check if radius is less than 25
                            shooter.scoreHandler(st.score); //we add his scroe by station score
                            st.delete();
                            // st.party = shooter.party;
                            // st.color = shooter.color;
                            //st.reset();
                }
                //}
                //}
            //}
            }
            self.toRemove = true; //we set the toRemove state to true so it get remove, even when it is a friend we delete the bullet, if you want friendly fire setting you handle it here			 	}
        }
    }
    self.getInitPack = function() { //this function is written just to make the code more clean, we actually make an object of player for the initPack
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            map: self.map,
            angle: self.angle,
            gun: self.gun,
            color: self.color,
        }; //when we create a bullet
    }
    self.getUpdatePack = function() { //this function is written just to make the code more clean, we actually make an object of player for the initPack, in fact we dont update the constant atrubutes like hpMax or number, this is going to be very complex and will check if the value have change and if so send it otherwise dont send it also compression is a lot important in the update ***THIS UPDATE REALLY NEEDS TO BE IMPROVED***
        var packUp = {
            id: self.id, //to be aware of which bullet most be updated
            x: self.x,
            y: self.y,
            angle: self.angle,
            //we dont have a number atribute becouse bullets are all same but each player has a number, add "number:1-2-3," if you want to have diffrent kind of bullets
        };
        // if(self.gun === 'Homming'){
        // 	packUp.angle = self.angle;
        // }
        return packUp;
    }


    Bullet.list[self.id] = self; //add the bullet to Bullet.list
    initPack.bullet.push(self.getInitPack()); //whenever we create a new bullet we also add it to the initPack for sending to clients

    return self;
}
Bullet.list = {};

Bullet.update = function() { //static function, update all the player
    //if(Math.random() < 0.1){ // if math.random was betweeen 0 and 0.1, right now bullets are created in the bullet update and it will be called every frame, instead of being random we change it so it will be attach to players, and they will be created in the player update loop
    //	Bullet(Math.random()*360);// creates a bullet in a random direction
    //}

    var pack = [];
    for (var i in Bullet.list) { //loop throw all the bullets
        var bullet = Bullet.list[i];//we get the bullet
        bullet.update(); //update them
        if (bullet.toRemove) { //if the bullet should remove
            delete Bullet.list[i]; //the bullet removes
            removePack.bullet.push(bullet.id); //whenever we remove a bullet we also add it to the removePack to send for clients, in this case we only send the id
        } else { //if the bullet should not remove so we send its info via the pack
            pack.push(bullet.getUpdatePack()); // this should be another distinct function, Create a little package that will be returned
        }
    }
    return pack;
}


Bullet.getAllInitPack = function() {
    var bullets = []; //we make an empty array
    for (var i in Bullet.list) //we loop throw all the bullets
        bullets.push(Bullet.list[i].getInitPack()); //for each bullet we push bullet.getInitPack means that we are creating a list of all bullets and we get their data with getInitPack
    return bullets;
};


Bullet.getAllInitPack = function() {
    //we have to send all the stat and data about all existing players and bullets to client so we do as bellow, why we dont use the initPack becouse we set it to epty every frame after we sent it!
    var bullets = []; //we make an empty array
    for (var i in Bullet.list) //we loop throw all the players
        bullets.push(Bullet.list[i].getInitPack()); //for each player we push player.getInitPack means that we are creating a list of all players and we get their data with getInitPack
    return bullets;
};




var Stone = function(id, x, y, radius, hp, score, map, color) { //constructor of stones
        var self = Entity();
        self.id = id;
        self.x = x;
        self.y = y;
        self.map = map;
        self.isStop = true;
        self.color = color;
        self.hp = hp; //for now hp and radius is same so hp in parameters will be unused be wise for optimizing it
        self.radius = radius;
        self.isOut = false;
        self.score = score;
        self.potential = radius / hp;
        self.pushBack = 10;
        self.spdX = 0 //(randomNumberRange(-15, 15))* 0.1; //these will use randomNumberRange function to make random numbers
        self.spdY = 0 //(randomNumberRange(-15, 15))* 0.1; //these will use randomNumberRange function to make random numbers
        self.creationPositionCheck = function() { //this will check if it is creating on a player so it will get remove
            var pList = getCollision(self, 'Stone', 'Player'); //we test collision between Stone and Player here
            if (!objIsEmpty(pList)) { //if object is not empty
                self.delete();
            }
            if (self.getDistance({x:MAP_RADIUS/2,y:MAP_RADIUS/2}) > MAP_RADIUS - 50) { //if stone is out of map, we do this by getting its distance with the middle of the map
                self.x = randomNumberRange(0,MAP_RADIUS);//we get a random location
                self.y = randomNumberRange(0,MAP_RADIUS);//we get a random location
                self.creationPositionCheck();//we check collision again
            }
            else{
                return;
            }
        }
        self.creationPositionCheck();//we check the position for first time on creation
        var super_update = self.update;
        self.update = function() { //this will overwirte update function, by putting inside this empty we overwrite the entity update function to nothing
            self.updateSpd(); //we update the speed
        }

        self.updateSpd = function() { //this will make everything move, we no longer move the stones
            //var playerCount = getObjectSize(Player.list) * sizePerPlayer; //this is going to be add to the width and height so map grows and decreases when players are more or less, note that this should be the exact of what is inside the client code
            if (self.isStop === false) { //if the stone is allowed to move in fact if a bullet is pushing it
                //if (self.x < 0 || self.x > MAP_RADIUS || self.y < 0 || self.y > MAP_RADIUS) {//we check if the position be between the bounds of the map, with the /2 we check the map grow or decrease from 4 sides
                // if (self.getDistance({
                //         x: MAP_RADIUS / 2,
                //         y: MAP_RADIUS / 2
                //     }) > MAP_RADIUS / 2 + 10) { //if distance from center of map is bigger than the MAP_RADIUS
                //     self.isOut = true; //so it will be handled there
                //     self.delete(); //we delete it
                //} else { //if the stone is inside the map boundings
                    super_update(); //normal entity update speed
                    self.spdX -= self.spdX / 8; //we minus the x speed by div8 of its speed so it will get slower each time
                    self.spdY -= self.spdY / 8; //we minus the y speed by div8 of its speed so it will get slower each time		for(var i in Player.list){
                    if (self.spdX <= 0.1 && self.spdX >= -0.1 && self.spdY <= 0.1 && self.spdY >= -0.1) {
                        self.isStop = true; //stone must stop
                        self.spdX = 0; //we do this becouse otherwise spdX would stay a really really small number and keep decreasing!
                        self.spdY = 0; //we do this becouse otherwise spdY would stay a really really small number and keep decreasing!
                    }
                    // for(var i in Player.list){//no need to handle collision with players here
                    // 	var p = Player.list[i];
                    // 	if(p){
                    // 		if(self.getDistance(p) < self.radius){
                    // 		}
                    // 	}
                    // }
                //}
            } else { //if the stone is not allowed to move
                self.spdX = 0; //we do this becouse otherwise spdX would stay a really really small number and keep decreasing!
                self.spdY = 0; //we do this becouse otherwise spdY would stay a really really small number and keep decreasing!
            }


        }


        self.delete = function() { //this will delete the existing stone
                
            var radius = Math.floor(randomNumberRange(25, 75));
            var hp = Math.round(radius)/5;
            var score = radius * 2;
            var x = getRandomRange('x');
            var y = getRandomRange('y');
            var color = randomColor[Math.floor(Math.random() * randomColor.length)];
            if(x >= MAP_RADIUS/2 - EPIC_STONE_CIRCLE && x <= MAP_RADIUS/2 + EPIC_STONE_CIRCLE && y >= MAP_RADIUS/2 - EPIC_STONE_CIRCLE && y <= MAP_RADIUS/2 + EPIC_STONE_CIRCLE){
                color = randomEpicColor[Math.floor(Math.random() * randomEpicColor.length)];
                score = radius * 4;
                var hp = Math.round(radius)/2;
            }
            Stone(Math.random(), x, y, radius, hp, score, '1', color); //we generate new stone with some random values between limited numbers we give it by useing randomNumberRange function
            
            delete Stone.list[self.id];
            removePack.stone.push(self.id);
        }

        self.getInitPack = function() { //this will be send to every player when they connect(only once)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                map: self.map,
                radius: self.radius,
                hp: self.hp,
                score: self.score,
                color: self.color,
            };
        }
        self.getUpdatePack = function() { //this will be send to every player when they connect(every second)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                hp: self.hp,
                radius: self.radius,
                isOut: self.isOut,
            }
        }
        Stone.list[id] = self; //push created self into the list

        initPack.stone.push(self.getInitPack());
        return self;
    } //end of update

Stone.list = {}; //list of all stones
Stone.getAllInitPack = function() { //this will get all info about stones and put them into a list
    var stones = [];
    for (var i in Stone.list)
        stones.push(Stone.list[i].getInitPack());
    return stones;
}
Stone.update = function() { //this will called every second
    var pack = [];
    for (var i in Stone.list) {
        var stone = Stone.list[i];
        stone.update();
        pack.push(stone.getUpdatePack());
    }
    return pack;
}




var Fuel = function(id, x, y, map) { //constructor of Fuels
        var self = Entity();
        self.id = id;
        self.x = x;
        self.y = y;
        self.map = map;
        //self.timeOut = 50;
        //self.diactivate = false;
        // self.radiusMax = 50;
        self.radius = 20;
        self.literX = randomNumberRange(2, 5);
        self.liter = 60 * self.literX;
        // self.radiusReduction = 0.5;
        self.creationPositionCheck = function() { //this will check if it is creating on a player so it will get remove
            if (self.getDistance({x:MAP_RADIUS/2,y:MAP_RADIUS/2}) > MAP_RADIUS/2 - 20) { //if object is not empty
                self.x = randomNumberRange(0,MAP_RADIUS);
                self.y = randomNumberRange(0,MAP_RADIUS);
                self.creationPositionCheck();
            }
            else{
                return;
            }
        }
        self.creationPositionCheck();


        var super_update = self.update;
        self.update = function() { //this will overwirte update function, by putting inside this empty we overwrite the entity update function to nothing
            //  super_update();
            //  if (self.getDistance({
            //      x: MAP_RADIUS / 2,
            //      y: MAP_RADIUS / 2
            //  }) > MAP_RADIUS / 2 + 10) { //if distance from center of map is bigger than the MAP_RADIUS
            //  self.spdX = -self.spdX;
            //  self.spdY = -self.spdY;
            //  }


            //   self.timeOut--;
            //   if(self.timeOut <= 0)
            //       self.delete();




            // var pList = getCollision(self, 'Fuel', 'Player'); //we test collision between Stone and Player here
            // if(objIsEmpty(pList)){//we check if object is not empty
            //     if(self.radius <= self.radiusMax - self.radiusReduction)
            //         self.radius += self.radiusReduction;
            // }
            // if(self.diactivate === true)
            //     self.radius += self.radiusReduction;
            // if(self.radius >= self.radiusMax)
            //     self.diactivate = false;
        }


        // setInterval(function(){
        //     self.delete();
        // },3000)

        self.delete = function() { //this will delete the existing fuel 
            // if(self.x <= MAP_RADIUS/2 - 2000 && self.x >= MAP_RADIUS/2 - 2500 && self.y <= MAP_RADIUS/2 - 2000 && self.y >= MAP_RADIUS/2 - 2500)//Top left
            //     Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - 2000 , MAP_RADIUS/2 - 2500), randomNumberRange(MAP_RADIUS/2 - 2000 , MAP_RADIUS/2 - 2500), '1', 20);
            // if(self.x >= MAP_RADIUS/2 + 2000 && self.x <= MAP_RADIUS/2 + 2500 && self.y >= MAP_RADIUS/2 + 2000 && self.y <= MAP_RADIUS/2 + 2500)//Buttom right
            //     Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + 2000 , MAP_RADIUS/2 + 2500), randomNumberRange(MAP_RADIUS/2 + 2000 , MAP_RADIUS/2 + 2500), '1', 20);
            // if(self.x >= MAP_RADIUS/2 + 2000 && self.x <= MAP_RADIUS/2 + 2500 && self.y <= MAP_RADIUS/2 - 2000 && self.y >= MAP_RADIUS/2 - 2500)//Top right
            //     Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + 2000 , MAP_RADIUS/2 + 2500), randomNumberRange(MAP_RADIUS/2 - 2000 , MAP_RADIUS/2 - 2500), '1', 20);
            // if(self.x <= MAP_RADIUS/2 - 2000 && self.x >= MAP_RADIUS/2 - 2500 && self.y >= MAP_RADIUS/2 + 2000 && self.y <= MAP_RADIUS/2 + 2500)//Bottom left
            //     Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - 2000 , MAP_RADIUS/2 - 2500), randomNumberRange(MAP_RADIUS/2 + 2000 , MAP_RADIUS/2 + 2500), '1', 20);
            // delete Fuel.list[self.id];
            // removePack.fuel.push(self.id);

            //  if(self.x <= MAP_RADIUS/2 - FUEL_STATION_DISTANCE && self.x >= MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500) && self.y <= MAP_RADIUS/2 - FUEL_STATION_DISTANCE && self.y >= MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500))
            //      Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), '1');
            //  if(self.x >= MAP_RADIUS/2 + FUEL_STATION_DISTANCE && self.x <= MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500) && self.y >= MAP_RADIUS/2 + FUEL_STATION_DISTANCE && self.y <= MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500))
            //      Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), '1');
            //  if(self.x >= MAP_RADIUS/2 + FUEL_STATION_DISTANCE && self.x <= MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500) && self.y <= MAP_RADIUS/2 - FUEL_STATION_DISTANCE && self.y >= MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500))
            //      Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), '1');
            //  if(self.x <= MAP_RADIUS/2 - FUEL_STATION_DISTANCE && self.x >= MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500) && self.y >= MAP_RADIUS/2 + FUEL_STATION_DISTANCE && self.y <= MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500))
            //      Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), '1');
             Fuel(Math.random(), randomNumberRange(0, MAP_RADIUS), randomNumberRange(0, MAP_RADIUS), '1');
             delete Fuel.list[self.id];
             removePack.fuel.push(self.id);
        }

        self.getInitPack = function() { //this will be send to every player when they connect(only once)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                map: self.map,
                radius: self.radius,
                literX: self.literX,
            };
        }
        self.getUpdatePack = function() { //this will be send to every player when they connect(every second)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                // radius: self.radius,
            }
        }
        Fuel.list[id] = self; //push created self into the list


        initPack.fuel.push(self.getInitPack());
        return self;
    } //end of update

Fuel.list = {}; //list of all stones
Fuel.getAllInitPack = function() { //this will get all info about stones and put them into a list
    var fuels = [];
    for (var i in Fuel.list)
        fuels.push(Fuel.list[i].getInitPack());
    return fuels;
}
Fuel.update = function() { //this will called every second
    var pack = [];
    for (var i in Fuel.list) {
        var fuel = Fuel.list[i];
        fuel.update();
        pack.push(fuel.getUpdatePack());
    }
    return pack;
}




var Station = function(id, x, y, map, angle,gun) { //constructor of Stations
        var self = Entity();
        self.id = id;
        self.staticSpdX = randomNumberRange(-5,5);
        self.staticSpdY = randomNumberRange(-5,5);
        self.x = x;
        self.y = y;
        self.staticX = self.x;
        self.staticY = self.y;
        self.map = map;
        self.target = {};
        self.angle = angle;
        self.gun = gun;
        self.scopeView = 600;
        if(self.gun.includes('Snipe',0))
        self.scopeView = 800;
        //self.timeOut = 50;
        //self.diactivate = false;
        // self.radiusMax = 50;
        self.radiusStart = randomNumberRange(20,45);
        self.radius = self.radiusStart;
        self.hpMax = self.radiusStart;
        self.hp = self.hpMax;
        self.kind = 'Station';
        self.lastColor = '#ffffff';
        self.color = '#ffffff';
        self.damage = 1;
        self.score = self.radiusStart * 15;
        self.lastParty = Math.random();
        self.party = self.lastParty;
        self.attackCounter = 20;
        self.creationPositionCheck = function() { //this will check if it is inside map or not
            if (self.getDistance({x:MAP_RADIUS/2,y:MAP_RADIUS/2}) > MAP_RADIUS/2 - 20) { //if object is not empty
                self.x = randomNumberRange(0,MAP_RADIUS);
                self.y = randomNumberRange(0,MAP_RADIUS);
                self.creationPositionCheck();
            }
            else{
                return;
            }
        }
        self.creationPositionCheck();


        var super_update = self.update;
        self.update = function() { //this will overwirte update function, by putting inside this empty we overwrite the entity update function to nothing
            //  super_update();
            //  if (self.getDistance({
            //      x: MAP_RADIUS / 2,
            //      y: MAP_RADIUS / 2
            //  }) > MAP_RADIUS / 2 + 10) { //if distance from center of map is bigger than the MAP_RADIUS
            //  self.spdX = -self.spdX;
            //  self.spdY = -self.spdY;
            //  }


            //   self.timeOut--;
            //   if(self.timeOut <= 0)
            //       self.delete();
            //if(self.parent !== 'Empty Parent')
            // var pList = getCollision(self, 'Station', 'Player'); //we test collision between Bullet and Player here
            // if (!objIsEmpty(pList)) {
            //     self.target = pList[1];
            //     for(var i in pList){
            //         if(self.getDistance(self.target) > self.getDistance(pList[i])){
            //             self.target = pList[i];
            //         }
            //     }
            //     self.attackCounter++;
            // }
            //}


  
             if(self.target.x){//if target exists and it has x atribute
                 if(self.getDistance(self.target) <= self.scopeView && self.target.destroyed === false){//if the target is in reach and target is not destroyed
                    //if(self.target)
                    //var p = Player.list[i];
                      self.angle = getAngle(self.x, self.y, self.target.x, self.target.y); //here we get the angle between two points so the station will follow the player
                      self.spdX = Math.cos(self.angle / 180 * Math.PI) * self.target.staticSpdPercentage/1.5 //here we give the x a static speed toward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                      self.spdY = Math.sin(self.angle / 180 * Math.PI) * self.target.staticSpdPercentage/1.5 //here we give the y a static speed toward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                      shootBullet(self, self.angle);//shoot bullet toward the angle we calculated
                      self.attackCounter++;//this is for rating and the number of bullets
                      var oldX = self.x;//we store the last position in case of collisions
                      var oldY = self.y;//we store the last position in case of collisions
                   
                      if(self.getDistance(self.target) > 200){//p.rectSize + self.radius + 5){//if distance with the target was more than 200
                          super_update();//keeps moving
                      }
                      for(var i in Station.list){//we calculate collision with other stations
                          if(Station.list[i].id !== self.id && self.getDistance(Station.list[i]) < self.radius*2 + 5){
                              self.x = oldX;
                              self.y = oldY;
                          }
                      }
                      
                      var sList = getCollision(self, 'Station', 'Stone'); //test collision with stones
                      if (!objIsEmpty(sList)) {//if anyone found
                            for(var i in sList){
                                self.x = oldX;
                                self.y = oldY;
                            }
                          }
                 }
                 else{//otherwise
                    self.target = {};//we empty the target object
                 }
              }
              else{

                 if (self.getDistance({x:MAP_RADIUS/2,y:MAP_RADIUS/2}) > MAP_RADIUS/2 - 20) { //if we collide with edge of the map
                     self.staticSpdX = -self.staticSpdX;
                     self.staticSpdY = -self.staticSpdY;
                 }

                  self.spdX = self.staticSpdX; //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                  self.spdY = self.staticSpdY; //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                  self.angle = getAngle(self.x, self.y, self.x + self.spdX, self.y + self.spdY); //here we get the angle between two points so the bullet will follow the player
                 
                 // if(self.x >= MAP_RADIUS || self.x <= 0)
                 // self.staticSpdX = -self.staticSpdX;
                 // if(self.y >= MAP_RADIUS || self.y <= 0)
                 // self.staticSpdY = -self.staticSpdY;
                 // self.spdX = self.staticSpdX; //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                 // self.spdY = self.staticSpdY; //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                 // self.angle = getAngle(self.x, self.y, self.x + self.spdX, self.y + self.spdY); //here we get the angle between two points so the bullet will follow the player
                   
                 super_update();//we update the speed of station normaly
              }
            //  for(var i in Player.list){
            //      if(Player.list[i].party === self.party){
            //          var p = Player.list[i];
            //           self.angle = getAngle(self.x, self.y, p.x, p.y); //here we get the angle between two points so the bullet will follow the player
            //           self.spdX = Math.cos(self.angle / 180 * Math.PI) * p.staticSpdPercentage/2 //here we give the x a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
            //           self.spdY = Math.sin(self.angle / 180 * Math.PI) * p.staticSpdPercentage/2 //here we give the y a static speed tward the angle and we reduce it by percentrage, note that the percentage here should multiply by 100 becouse the percentage is too small i dont know why
                   
            //           var oldX = self.x;
            //           var oldY = self.y;
                   
            //           if(self.getDistance(p) > 200){//p.rectSize + self.radius + 5){
            //               super_update();
            //           }
            //           for(var i in Station.list){
            //               if(Station.list[i].id !== self.id && self.getDistance(Station.list[i]) < self.radius*2 + 5){
            //                   self.x = oldX;
            //                   self.y = oldY;
            //               }
            //           }


            //  }



            // var pList = getCollision(self, 'Fuel', 'Player'); //we test collision between Stone and Player here
            // if(objIsEmpty(pList)){//we check if object is not empty
            //     if(self.radius <= self.radiusMax - self.radiusReduction)
            //         self.radius += self.radiusReduction;
            // }
            // if(self.diactivate === true)
            //     self.radius += self.radiusReduction;
            // if(self.radius >= self.radiusMax)
            //     self.diactivate = false;
        }


        // setInterval(function(){
        //     self.delete();
        // },3000)

        self.reset = function() {
            self.hp = self.hpMax;
        }


        self.delete = function() { //this will delete the existing fuel
            Station(Math.random(), randomNumberRange(0, MAP_RADIUS), randomNumberRange(0, MAP_RADIUS), '1', 20, randomGunList[Math.floor(Math.random() * randomGunList.length)]); //bottom right / bottom right
            delete Station.list[self.id];
            removePack.station.push(self.id);
        }

        self.getInitPack = function() { //this will be send to every player when they connect(only once)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                map: self.map,
                hp: self.hp,
                hpMax: self.hpMax,
                radius: self.radius,
                color: self.color,
            };
        }
        self.getUpdatePack = function() { //this will be send to every player when they connect(every second)
            var packUp = {
                id: self.id,
                hp: self.hp,
                x: self.x,
                y: self.y,
                angle: self.angle,
            }
            // if (self.party !== self.lastParty) {
            //     self.lastParty = self.party;
            //     packUp.party = self.party;
            // }
            // if (self.color !== self.lastColor) {
            //     self.lastColor = self.color;
            //     packUp.color = self.color;
            // }

            return packUp
        }
        Station.list[id] = self; //push created self into the list


        initPack.station.push(self.getInitPack());
        return self;
    } //end of update

Station.list = {}; //list of all stones
Station.getAllInitPack = function() { //this will get all info about stones and put them into a list
    var stations = [];
    for (var i in Station.list)
        stations.push(Station.list[i].getInitPack());
    return stations;
}
Station.update = function() { //this will called every second
    var pack = [];
    for (var i in Station.list) {
        var station = Station.list[i];
        station.update();
        pack.push(station.getUpdatePack());
    }
    return pack;
}

var firstStationCall = function() { //this function will instantly fill the map with alot of stones after server starts, reason its at the end becouse we have to keep the order of code run order from top to down, we can use a function firstStoneCall(){} but its just it yet
    // Station(Math.random(), MAP_RADIUS / 2 + 600, 200, '1', 20); //top
    // Station(Math.random(), MAP_RADIUS / 2 - 600, 200, '1', 20); //top
    // Station(Math.random(), MAP_RADIUS / 2 + 600, MAP_RADIUS - 200, '1', 20);//down
    // Station(Math.random(), MAP_RADIUS / 2 - 600, MAP_RADIUS - 200, '1', 20);//down
    // Station(Math.random(), 200, MAP_RADIUS / 2 + 600, '1', 20);//left
    // Station(Math.random(), 200, MAP_RADIUS / 2 - 600, '1', 20);//left
    // Station(Math.random(), MAP_RADIUS - 200, MAP_RADIUS / 2 + 600, '1', 20);//right
    // Station(Math.random(), MAP_RADIUS - 200, MAP_RADIUS / 2 - 600, '1', 20);//right
    // Station(Math.random(), MAP_RADIUS / 2, MAP_RADIUS / 2 - 600, '1', 20);//middle
    // Station(Math.random(), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top left / top left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top left / top right
    // Station(Math.random(), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top left / bottom left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top left / bottom right

    // Station(Math.random(), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top right / top left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top right / top right
    // Station(Math.random(), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top right / bottom left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //top right / bottom right

    // Station(Math.random(), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom left / top left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom left / top right
    // Station(Math.random(), MAP_RADIUS / 2 - 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom left / bottom left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 - (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom left / bottom right

    // Station(Math.random(), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom right / top left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom right / top right
    // Station(Math.random(), MAP_RADIUS / 2 - 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom right / bottom left
    // Station(Math.random(), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), MAP_RADIUS / 2 + 250 + (FUEL_STATION_DISTANCE + 250), '1', 20,'Starter Snipe'); //bottom right / bottom right
    for(i = 0 ; i < STATION_NUMBER ; i++){
        Station(Math.random(), randomNumberRange(0, MAP_RADIUS), randomNumberRange(0, MAP_RADIUS), '1', 20, randomGunList[Math.floor(Math.random() * randomGunList.length)]); //bottom right / bottom right
    }
    
}
firstStationCall(); //we generate all the stones






var firstStoneCall = function() { //this function will instantly fill the map with alot of stations after server starts, reason its at the end becouse we have to keep the order of code run order from top to down, we can use a function firstStationCAll(){} but its just it yet
    for (i = 0; i < STONE_NUMBER; i++) {
        var radius = Math.floor(randomNumberRange(25, 75));
        var hp = Math.round(radius)/5;
        var score = radius * 3;
        var x = getRandomRange('x');
        var y = getRandomRange('y');
        var color = randomColor[Math.floor(Math.random() * randomColor.length)];
        if(x >= MAP_RADIUS/2 - EPIC_STONE_CIRCLE && x <= MAP_RADIUS/2 + EPIC_STONE_CIRCLE && y >= MAP_RADIUS/2 - EPIC_STONE_CIRCLE && y <= MAP_RADIUS/2 + EPIC_STONE_CIRCLE){
            color = randomEpicColor[Math.floor(Math.random() * randomEpicColor.length)];
            score = radius * 6;
            hp = Math.round(radius)/2;
        }
        Stone(Math.random(), x, y, radius, hp, score, randomMap[Math.floor(Math.random() * randomMap.length)], color);
    }
}
firstStoneCall(); //we generate all the stations


var firstFuelCall = function() { //this function will instantly fill the map with alot of fuels after server starts, reason its at the end becouse we have to keep the order of code run order from top to down, we can use a function firstFuelCall(){} but its just it yet
    for (i = 0; i < FUEL_NUMBER; i++) {
        // Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), '1');
        // Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), '1');
        // Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), '1');
        // Fuel(Math.random(), randomNumberRange(MAP_RADIUS/2 - FUEL_STATION_DISTANCE , MAP_RADIUS/2 - (FUEL_STATION_DISTANCE + 500)), randomNumberRange(MAP_RADIUS/2 + FUEL_STATION_DISTANCE , MAP_RADIUS/2 + (FUEL_STATION_DISTANCE + 500)), '1');
        Fuel(Math.random(), randomNumberRange(0 , MAP_RADIUS), randomNumberRange(0 , MAP_RADIUS), '1');
    }
}
firstFuelCall(); //we generate all the stones








/////////////////////////////////////////////////Classes/////////////////////////////////////////////////////// 
function randomNumberRange(min, max) //creates random number from - to + yhis specific function allows us to even use negative numbers and posetive numbers as range
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRange(xOrY) {//finds an x and y inside the map, we should definetly use this so then we wont need to do the  creationPosition check
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * MAP_RADIUS / 2.5 * MAP_RADIUS / 2.5;
    if (xOrY === 'x')
        return MAP_RADIUS / 2 + Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    if (xOrY === 'y')
        return MAP_RADIUS / 2 + Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
}

function getObjectSize(obj) { //we get the size of an object, something like lebgth
    var size = 0,
        key;
    for (key in obj) {
        size++;
    }
    return size;
};

function getAngle(x1, y1, x2, y2) {//this will find the angle between two points
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
};

function objIsEmpty(Object) {//this will tell us if object is empty or not
    for (var key in Object) {
        if (Object.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

function getCollision(self, whoIs, withWhat, specials, add) { //this function will get distance between all the possibilities like stone with player, player with stone, bullet with bullet, bullet with stone, bullet with player, special is fir special distance getting like Homming missile
    var resList = {}; //the list for resaults as object
    var counter = 1; //this is for making it ordered other wise we should use list[] instead of Obj{} for resList
    var additional = 0; //the thing that can be added in case of diffrentials
    if (add) { //if player called the function
        additional = add; //we set special by 5
    }
    if (withWhat === 'Player') { //if testing distance with Player
        if (whoIs === 'Bullet') { //if Bullet called this function
            for (var i in Player.list) { //we loop throw every player in the Player.list
                var p = Player.list[i]; //we get the player in the loop
                var dis = self.getDistance(p); //the distance between self and player
                if (p && self.map === p.map && dis < p.rectSize + additional && self.parent !== p.id) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
                    resList[counter] = p;
                    counter++;
                }
            }

            if (specials === 'Homming') { //if Homming is specially called for checkinf distance
                for (var i in Player.list) { //we loop throw every player in the Player.list
                    var p = Player.list[i]; //we get the player in the loop
                    var dis = self.getDistance(p); //the distance between self and player
                    if (p && self.map === p.map && dis < 200 + additional && self.parent !== p.id && self.party !== p.party) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
                        resList[counter] = p;
                        counter++;
                    }
                }
            }
        }
        if (whoIs === 'Stone') { //if Stone called this function
            for (var i in Player.list) { //we loop throw every player
                var p = Player.list[i];
                if (p && self.getDistance(p) < self.radius + p.rectSize + additional) { // we get the distance
                    resList[counter] = p;
                    counter++;
                }
            }
        }
        if (whoIs === 'Fuel') { //if Fuel called this function
            for (var i in Player.list) { //we loop throw every player
                var p = Player.list[i];
                if (p && self.getDistance(p) < self.radius + p.rectSize + additional) { // we get the distance
                    resList[counter] = p;
                    counter++;
                }
            }
        }
        if (whoIs === 'Station') { //if station called this function
            for (var i in Player.list) { //we loop throw every player
                var p = Player.list[i];
                if (p && self.party !== p.party && p.destroyed === false && self.getDistance(p) < self.scopeView + self.radius) { // we get the distance
                    resList[counter] = p;
                    counter++;
                }
            }
        }
        if (whoIs === 'Player') { //if station called this function
            for (var i in Player.list) { //we loop throw every player
                var p = Player.list[i];
                if (p && self.party !== p.party && p.destroyed === false && self.getDistance(p) < self.rectSize/1.5 + p.rectSize/1.5) { // we get the distance
                    resList[counter] = p;
                    counter++;
                }
            }
        }
    }

    if (whoIs === 'Player' && withWhat === 'Stone') { //if we are looking for collision with Stone and the caller is player
        for (var i in Stone.list) { //we loop throw every stone
            var s = Stone.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.rectSize / 2 + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Player' && withWhat === 'Station') { //if we are looking for collision with station and the caller is player
        for (var i in Station.list) { //we loop throw every stone
            var s = Station.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.rectSize / 2 + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'ّFuel' && withWhat === 'Stone') { //if we are looking for collision with Stone, and the caller is fuel
        for (var i in Stone.list) { //we loop throw every stone
            var s = Stone.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'ّFuel' && withWhat === 'Station') { //if we are looking for collision with station, and the caller is fuel
        for (var i in Station.list) { //we loop throw every stone
            var s = Station.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Player' && withWhat === 'Fuel') { //if we are looking for collision with Fuel, and the caller is player
        for (var i in Fuel.list) { //we loop throw every stone
            var f = Fuel.list[i]; //we get the instance of it
            if (f && f.map === self.map && self.getDistance(f) <= f.radius + self.rectSize / 2 + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = f;
                counter++;
            }
        }
    }
    if (whoIs === 'Bullet' && withWhat === 'Stone') { //if we are looking for collision with Stone, and the caller is bullet
        for (var i in Stone.list) { //we loop throw every stone
            var s = Stone.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Bullet' && withWhat === 'Bullet') { //if we are looking for collision with Bullet, and the caller is bullet
        for (var i in Bullet.list) { //we loop throw every player in the Player.list
            var b = Bullet.list[i]; //we get the player in the loop
            if (b && self.map === b.map && self.getDistance(b) < b.rectSize + additional && self.parent !== b.parent) { //we calculate distance between the bullet itself and each player player in the loop that we got above and see if its less than a number or the player is not the bullets parent, we also check if self and player we are going to colide with are in the same map
                resList[counter] = b;
                counter++;
            }
        }
    }
    if (whoIs === 'Stone' && withWhat === 'Stone') { //if we are looking for collision with Stone, and the caller is stone
        for (var i in Stone.list) { //we loop throw every stone
            var s = Stone.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Stone' && withWhat === 'Station') { //if we are looking for collision with station, and the caller is stone
        for (var i in Station.list) { //we loop throw every stone
            var s = Station.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Bullet' && withWhat === 'Station') { //if we are looking for collision with station, and the caller is bullet
        for (var i in Station.list) { //we loop throw every stone
            var s = Station.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    if (whoIs === 'Station' && withWhat === 'Stone') { //if we are looking for collision with stone and the caller is station
        for (var i in Stone.list) { //we loop throw every stone
            var s = Stone.list[i]; //we get the instance of it
            if (s && s.map === self.map && self.getDistance(s) <= s.radius + self.radius / 2 + additional) { //we get the distance between stone and the player i added -5 becouse of making it easier to dodge and not sticking just to surface of stone, additional here is for example is for player that adds 5 to it
                resList[counter] = s;
                counter++;
            }
        }
    }
    return resList; //we return the list of objects we found colliding
}


///////////////////////////////////////////////////////////////////////////////////////////////////////