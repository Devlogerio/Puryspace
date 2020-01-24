/////////////////////////////////////////////////Observed Classes//////////////////////////////////////////////////////////////
function shadeColor1(color, percent) { // this function will lighten or darken any color by percentage we give it
    var num = parseInt(color.slice(1), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function randomNumberRange(min, max) //creates random number from - to + yhis specific function allows us to even use negative numbers and posetive numbers as range, in this case it returns rounded number
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumberRangeFloat(min, max) //creates random number from - to + yhis specific function allows us to even use negative numbers and posetive numbers as range, in this case it returns float number
{
    return Math.random() * (max - min) + min;
}

function getObjectDistance(obj1, obj2) { //this is added for being aware of collision, so whenever we call it we can be alerted of distance between any object and the object that uses this Entity, pt means point here, becouse we give it a point to test the distance
    return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
}

function drawText(givenCanvas, x, y, text, size, color, mistake, font, globalAlpha) { //we draw a text
    var textToWrite = text + "";
    var lengh = textToWrite.length;
    givenCanvas.fillStyle = color;
    givenCanvas.globalAlpha = globalAlpha;
    givenCanvas.font = size + "px " + font;
    givenCanvas.fillText(textToWrite, x - lengh * mistake, y);
}

function getObjectSize(obj) { //we ge the size of an object infact length of an object
    var size = 0,
        key;
    for (key in obj) {
        size++;
    }
    return size;
};

//this function will draw a polygon and it has all the personalized parameters
function drawPolygon(givenCanvas, sideCount, size, centerX, centerY, strokeWidth, strokeColor, fillColor, rotationDegrees) {
    var radians = rotationDegrees * Math.PI / 180;
    givenCanvas.save();
    givenCanvas.translate(centerX, centerY);
    givenCanvas.rotate(radians);
    givenCanvas.beginPath();
    givenCanvas.moveTo(size * Math.cos(0), size * Math.sin(0));
    for (var i = 1; i <= sideCount; i += 1) {
        givenCanvas.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
    }
    givenCanvas.fillStyle = fillColor;
    givenCanvas.strokeStyle = strokeColor;
    givenCanvas.lineWidth = strokeWidth;
    givenCanvas.stroke();
    givenCanvas.fill();
    givenCanvas.restore();
}
//draw triangle function
function drawTriangle(givenCanvas, x, y, angle, lx, ly, mx, my, rx, ry, lineWidth, lineColor, color) {
    // the triangle
    givenCanvas.save(); //save settings of canvas 2d
    givenCanvas.translate(x, y); //x and y of the position that we want to rotate the canvas from	
    givenCanvas.rotate(angle); //rotating by PI
    givenCanvas.beginPath();
    givenCanvas.moveTo(lx, ly); //left x and y
    givenCanvas.lineTo(mx, my); //midle x and y
    givenCanvas.lineTo(rx, ry); //right x and y
    givenCanvas.closePath();
    // the outline
    givenCanvas.lineWidth = lineWidth;
    givenCanvas.strokeStyle = lineColor;
    givenCanvas.stroke();
    // the fill color
    givenCanvas.fillStyle = color;
    givenCanvas.fill();
    givenCanvas.restore();
}
//draw rect
function drawRect(givenCanvas, x, y, width, height, color, globalAlpha) {
    givenCanvas.globalAlpha = globalAlpha; //set the blury effect
    givenCanvas.fillStyle = color; //we set the color of inside the rect to red
    givenCanvas.fillRect(x, y, width, height); //we draw the hp bar
}


//draw stroke rect means it is epty from inside
function drawStrokeRect(givenCanvas, x, y, width, height, color, globalAlpha, lineWidth) {
    givenCanvas.globalAlpha = globalAlpha; //set the blury effect
    givenCanvas.strokeStyle = color; //we set the color of inside the rect to red
    givenCanvas.lineWidth = lineWidth;
    givenCanvas.strokeRect(x, y, width, height); //we draw the stroke of hp bar
}


//draw circle
function drawArc(givenCanvas, x, y, r, startAngle, endAngle, color, globalAlpha, strokeStyle, lineWidth) {
    givenCanvas.fillStyle = color;
    givenCanvas.lineWidth = lineWidth;
    givenCanvas.strokeStyle = strokeStyle;
    givenCanvas.globalAlpha = globalAlpha;
    givenCanvas.beginPath();
    givenCanvas.arc(x, y, r, startAngle, endAngle, false); //becouse it inside the translated canvas so x and y is according to that
    //ctx.strokeStyle = 'red';
    givenCanvas.stroke();
    if (color !== '')
        givenCanvas.fill();
    givenCanvas.closePath(); //ends
}
//clears any canvas
function clearCanvas(givenCanvas, x, y, width, height) {
    givenCanvas.clearRect(0, 0, WIDTH, HEIGHT);
}
//draw bazier curve or better i sat a curved line
function drawBazierCurve(givenCanvas, fx, fy, sx, sy, tx, ty, strokeColor, lineWidth, globalAlpha) {
    givenCanvas.globalAlpha = globalAlpha;
    givenCanvas.beginPath(); //starts
    givenCanvas.lineWidth = lineWidth;
    givenCanvas.strokeStyle = strokeColor;
    givenCanvas.beginPath();
    givenCanvas.bezierCurveTo(fx, fy, sx, sy, tx, ty);
    givenCanvas.stroke();
    givenCanvas.closePath(); //ends
}
//draw star with as much as spikes we want
function drawStar(givenCanvas, cx, cy, spikes, outerRadius, outerRadiusColor, innerRadius, innerRadiusColor, globalAlpha) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
    givenCanvas.save();
    givenCanvas.beginPath();
    givenCanvas.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        givenCanvas.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        givenCanvas.lineTo(x, y)
        rot += step
    }
    givenCanvas.lineTo(cx, cy - outerRadius);
    givenCanvas.closePath();
    givenCanvas.lineWidth = 5;
    givenCanvas.globalAlpha = globalAlpha;
    givenCanvas.strokeStyle = outerRadiusColor;
    givenCanvas.stroke();
    givenCanvas.fillStyle = innerRadiusColor;
    givenCanvas.fill();
    givenCanvas.restore();
}

var TO_RADIANS = Math.PI / 180; //radianse maker
function drawRotatedImage(image, x, y, angle) { //it will draw a rotated image at the angle it gets

    // save the current co-ordinate system 
    // before we screw with it
    ctx.save();

    // move to the middle of where we want to draw our image
    ctx.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    ctx.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    ctx.restore();
}


//it will draw rounded rect means a rect with rounded corners
function drawRoundedRect(givenCanvas, x, y, width, height, radius) {
    givenCanvas.beginPath();
    givenCanvas.moveTo(x, y + radius);
    givenCanvas.lineTo(x, y + height - radius);
    givenCanvas.arcTo(x, y + height, x + radius, y + height, radius);
    givenCanvas.lineTo(x + width - radius, y + height);
    givenCanvas.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    givenCanvas.lineTo(x + width, y + radius);
    givenCanvas.arcTo(x + width, y, x + width - radius, y, radius);
    givenCanvas.lineTo(x + radius, y);
    givenCanvas.arcTo(x, y, x, y + radius, radius);
    givenCanvas.stroke();
}



//this will draw a spaceship (really ugly one founded from internet)
function drawSpaceship(givenCanvas, x, y, angle, width, height, color) {
    givenCanvas.save();
    givenCanvas.beginPath();
    givenCanvas.translate(x, y);
    givenCanvas.rotate(angle);
    // givenCanvas.rect(width * -0.5, height * -0.5, width, height);
    // givenCanvas.fillStyle = color;
    // givenCanvas.fill();
    // givenCanvas.closePath();

    // Draw the flame if engine is on
    // if(spaceship.engineOn)
    // {
    givenCanvas.beginPath();
    givenCanvas.moveTo(width * -0.5, height * 0.5);
    givenCanvas.lineTo(width * 0.5, height * 0.5);
    givenCanvas.lineTo(0, height * 0.5 + Math.random() * 10);
    givenCanvas.lineTo(width * -0.5, height * 0.5);
    givenCanvas.closePath();
    givenCanvas.fillStyle = "orange";
    givenCanvas.fill();
    // }
    givenCanvas.restore();
}



//this will check if color is light enough
function isColorValid(hex) {
    var color = hexToRgb(hex);
    var R = color.r;
    var G = color.g;
    var B = color.b;
    var brightness = (0.2126 * R + 0.7152 * G + 0.0722 * B);
    // if (brightness <= 100 && brightness > 50) {
    //     return 'Dark';
    // } else if (brightness <= 50) {
    //     return 'Too dark';
    // } else {
    //     return 'Ok';
    // }
    if (brightness >= 200) {
        return 'Light';
    } else {
        return 'Ok';
    }
}



//this will convert hex color to rgb color
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}













//draw triangle function
function drawShipTriangle(givenCanvas, x, y, angle, xLarge, lineWidth, lineColor, color, gun) {


    givenCanvas.save(); //save settings of canvas 2d

    givenCanvas.translate(x, y); //x and y of the position that we want to rotate the canvas from	
    givenCanvas.rotate(angle); //rotating by PI
    
        // the triangle
        givenCanvas.beginPath();
        givenCanvas.moveTo(-10 - xLarge, -10 - xLarge); //left x and y
        givenCanvas.lineTo( 15 + xLarge, 0); //midle x and y
        givenCanvas.lineTo( -10 - xLarge,  10 + xLarge); //right x and y
        givenCanvas.lineTo( -5- xLarge/1.5,0); //right x and y
        givenCanvas.closePath();
        // the outline
        givenCanvas.lineWidth = lineWidth;
        givenCanvas.strokeStyle = lineColor;
        givenCanvas.stroke();
        // the fill color
        givenCanvas.fillStyle = color;
        givenCanvas.fill();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////