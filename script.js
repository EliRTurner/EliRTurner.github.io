var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var mouseX;
var mouseY;
var mouseXRounded;
var mouseYRounded;
var tileSize = 50;
var map = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

function player(){
    this.x = 50;
    this.y = 50;
    this.height = tileSize;
    this.width = tileSize;

    this.speed = 1;

    this.sprite = document.getElementById("playerSprite");

    this.aPressed = false;
    this.wPressed = false;
    this.sPressed = false;
    this.dPressed = false;

    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;

    this.getSides = function(){
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
    }
}

var player = new player;

function wall (){
    this.name = "wall";
    this.x;
    this.y;
    this.wallType;


    this.sprite = document.getElementById("wall");

    this.getSprite = function(){

        // if(map[this.y][this.x-1].name !== "wall"){
        //     this.wallType = "Vertical";
        //     this.sprite = document.getElementById("wallVertical");
        // }
        if(map[this.y-1][this.x].name !== "wall" && map[this.y][this.x-1].name !== "wall"){
            this.wallType = "topLeftCorner"
            this.sprite = document.getElementById("wallTopLeft");
        }
        if(map[this.y][this.x -1].name !== "wall" && map[this.y + 1][this.x].name !== "wall"){
            this.wallType = "bottomLeftCorner"
            this.sprite = document.getElementById("wallBottomLeft");
        }
        if(map[this.y-1][this.x].name !== "wall" && map[this.y][this.x+1].name !== "wall"){
            this.sprite = document.getElementById("wallTopRight");
            this.wallType = "topRightCorner";
        }
        if(map[this.y+1][this.x].name !== "wall" && map[this.y][this.x+1].name !== "wall"){
            this.sprite = document.getElementById("wallBottomRight")
            this.wallType = "bottomRightCorner";
        }
        if(map[this.y+1][this.x].name !== "wall" && map[this.y-1][this.x].name !== "wall"){
            this.sprite = document.getElementById("wallHorizontal")
            this.wallType = "Horizontal";
        }
        if(map[this.y][this.x+1].name !== "wall" && map[this.y][this.x-1].name !== "wall"){
            this.sprite = document.getElementById("wallVertical")
            this.wallType = "Vertical";
        }
        if(map[this.y+1][this.x].name !== "wall" && map[this.y-1][this.x].name !== "wall" && map[this.y][this.x+1].name !== "wall" && map[this.y][this.x-1].name !=="wall"){
            this.sprite = document.getElementById("wall");
            this.wallType = "wall"; 
        }
        // else{
        //     this.sprite = document.getElementById("wall");
        //     this.wallType = "wall"; 
        // }
        
    }
}



function drawPlayer(){  
   ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height)
}

document.body.addEventListener("keydown", function (e) {
    
    if(e.key === "d"){
        player.dPressed = true;
    }
    
    if(e.key === "s"){
        player.sPressed = true;
    }

    if(e.key === "a"){
        player.aPressed = true;
    }

    if(e.key === "w"){
        player.wPressed = true;
    }
});

document.body.addEventListener("keyup", function (e) {
    if(e.key === "d"){
        player.dPressed = false;
    }

    if(e.key === "a"){
        player.aPressed = false;
    }

    if(e.key === "s"){
        player.sPressed = false;
    }

    if(e.key === "w"){
        player.wPressed = false;
    }

});

function collisionBox(x, y, column, row){
    this.y = y;
    this.x = x;

    this.column = column;
    this.row = row

    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;

    this.getsides = function(){
        this.bottom = this.y + tileSize;
        this.left = this.x;
        this.right = this.x + tileSize;
        this.top = this.y;
    }

    this.getsides();
}

function move(){
    
    if(player.dPressed === true){
        // player.x += player.speed;
        
        if(collisionBoxes[0].top > player.bottom || collisionBoxes[0].right < player.left || collisionBoxes[0].bottom < player.top || collisionBoxes[0].left > player.right){
            player.x += player.speed;
        }
        else if(player.right >= collisionBoxes[0].left && player.right < collisionBoxes[0].left + 10){
            player.x -= 1;
        }
       

        if(player.x > 650){
            player.x = 650;
        }
    }

    if(player.aPressed === true){
        // player.x -= player.speed;

        if(collisionBoxes[0].top > player.bottom || collisionBoxes[0].right < player.left || collisionBoxes[0].bottom < player.top || collisionBoxes[0].left > player.right){
            player.x -= player.speed;
        }
        else if(player.left <= collisionBoxes[0].right && player.left > collisionBoxes[0].right - 10){
            player.x += 1;
        }

        if(player.x < 0){
            player.x = 0;
        }
    }

    if(player.sPressed === true){
        // player.y += player.speed;

        if(collisionBoxes[0].top > player.bottom || collisionBoxes[0].right < player.left || collisionBoxes[0].bottom < player.top || collisionBoxes[0].left > player.right){
            player.y += player.speed;
        }
        else if(player.bottom >= collisionBoxes[0].top && player.bottom < collisionBoxes[0].top + 10){
            player.y -= 1;
        }
        
        if(player.y > 650){
            player.y = 650;
        }
    }

    if(player.wPressed === true){
        // player.y -= player.speed;

        if(collisionBoxes[0].top > player.bottom || collisionBoxes[0].right < player.left || collisionBoxes[0].bottom < player.top || collisionBoxes[0].left > player.right){
            player.y -= player.speed;
        }
        else if(player.top <= collisionBoxes[0].bottom && player.top > collisionBoxes[0].bottom - 10){
            player.y += 1;
        }
        if(player.y < 0){
            player.y = 0;
        } 
    }
}

function grass(){
    this.name = "grass";
    this.collision = false;
    this.sprite = document.getElementById("grassSprite");
}

function tree(){
    this.name = "tree";
    this.collision = true;
    this.sprite = document.getElementById("treeSprite");
}

function path(){
    this.collision = false;
    this.sprite = document.getElementById("pathSprite");
}

var mouseX;
var mouseY;
var columns = 20;
var rows = 20;




//sets up the inital map
function setupMap(){
    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){
            map[col][row] = new grass;
        }
    }

    map[4][4] = new tree;

    for(i= 0; i< rows; i++){
        map[5][i] = new path;
    }
}


var collisionBoxes = [];


//iterates through each object in the map array and draws a tile corresponding to its sprite
function drawMap(){

    var x = 0;
    var y = 0;


    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){
            if(map[row][col].name !== "tree"){
              
            ctx.drawImage(map[col][row].sprite, x, y, tileSize, tileSize);

            }
            
            x += tileSize;
        }
        x = 0;
        y += tileSize;
    }   
}

var grassTemplate = new grass;
function drawBackgroundLayer(){
    var x = 0;
    var y = 0;

    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){

            ctx.drawImage(grassTemplate.sprite, x, y, tileSize, tileSize)
            
            x += tileSize;
        }
        x = 0;
        y += tileSize;
    }   
}

//draws objects that should be infront of the characters, such as trees
function drawFrontLayer(){

    var x = 0;
    var y = 0;

    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){

            if(map[col][row].name === "tree"){
                ctx.drawImage(map[col][row].sprite, x, y - tileSize, tileSize, tileSize * 2)
            }
            if(map[col][row].name === "wall"){
                ctx.drawImage(map[col][row].sprite, x, y, tileSize, tileSize)
            }
            x += tileSize;
        }
        x = 0;
        y += tileSize;
    }   
}

//if the tile has an object with collision, it will form a collision box around that tile and add it to an array for use when detecting collision;
function setCollision(){
    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){
            if(map[col][row].collision === true){
                collisionBoxes.push(new collisionBox(col * tileSize, row * tileSize, col, row));
            }
        }
    }   
}

canvas.addEventListener("mousemove", getMouseLocation);
canvas.addEventListener("mousedown", click);
canvas.addEventListener("mouseup", mouseUp);


//does what it says on the tin
function getMouseLocation(){
   mouseX = event.offsetX;
   mouseY = event.offsetY;
}


var startPosition = [];
var endPosition = [];
//adds an object to the map
function click(){
    console.log(mouseXRounded)
    map[mouseYRounded / tileSize][mouseXRounded / tileSize] = new wall;
    map[mouseYRounded / tileSize][mouseXRounded / tileSize].x = mouseXRounded / tileSize;
    map[mouseYRounded / tileSize][mouseXRounded / tileSize].y = mouseYRounded / tileSize;

    map[mouseYRounded / tileSize][mouseXRounded / tileSize].getSprite();

    
    startPosition = [mouseYRounded, mouseXRounded];
    console.log(startPosition)
    getWallSprites();

    setCollision();
}

function mouseUp(){
    endPosition = [mouseYRounded, mouseXRounded];
    console.log(endPosition);


}

function getWallSprites(){
    for(var col = 0; col < columns; col++){
        for(var row = 0; row < rows; row++){
            if(map[col][row].name === "wall"){
                map[col][row].getSprite();
            }
        }
    }   
}

//draws the cursor on the tile the mouse is currently hovered over. Worked out by taking the mouse's coordinates and rounding them down to the nearest multiple of tileSize
function drawCursor(){

    mouseXRounded = Math.floor(mouseX / tileSize) * tileSize;
    mouseYRounded = Math.floor(mouseY / tileSize) * tileSize;

    
    ctx.globalAlpha = 0.5;
    ctx.drawImage(document.getElementById("wall"), mouseXRounded, mouseYRounded, tileSize, tileSize);
    ctx.globalAlpha = 1;

    console.log(mouseXRounded)
}


//sets the initial map and collision boxes
setupMap();
setCollision();


function gameLoop(){
    drawBackgroundLayer();
    drawMap();
    drawPlayer();
    drawFrontLayer();
    player.getSides();
    move();
    drawCursor(); 
}



setInterval(gameLoop, 1);