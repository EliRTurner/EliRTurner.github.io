function makerect(){
    this.x = 50;
    this.y = 50;
    this.height = 50;
    this.width = 50,
    this.speed = 1;
    this.aPressed = false;
    this.wPressed = false;
    this.sPressed = false;
    this.dPressed = false;

    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;

    this.getsides = function(){
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
    }
}

function makecoin(){
    
    this.x = 200;
    this.y = 200;
    this.height = 20;
    this.width = 20;

    this.top = null;
    this.bottom = null;
    this.left = null;
     this.right = null;
    
    this.getsides = function(){
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
    }
}

function makerobot(){
    this.x = 100;
    this.y = 100;
    this.height = 25;
    this.width = 25,
    this.speed = 0.3;

    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;

    this.getsides = function(){
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
    }
}

var points = 0;

var rect = new makerect;
var coin = new makecoin;
var bot = new makerobot;
var speedCost = 1;
var coinWorth = 1;

var canvas = document.getElementById("myCanvas");
document.getElementById("increaseSpeedButton").innerText = "Increase Speed " + speedCost;
var ctx = canvas.getContext("2d");



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect();
    rect.getsides();
    drawCoin();
    coin.getsides();
    drawBot();
    bot.getsides();
    isColliding();
    botCollide();
    update();

}

function drawRect(){

    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawBot(){
    ctx.beginPath();
    ctx.rect(bot.x, bot.y, bot.width, bot.height);
    ctx.fillStyle = "#3574f2";
    ctx.fill();
    ctx.closePath();
}

function update(){
    
    if(rect.dPressed === true){
        rect.x += rect.speed;
        if(rect.x > 450){
            rect.x = 450;
        }
    }

    if(rect.aPressed === true){
        rect.x -= rect.speed;
        if(rect.x < 0){
            rect.x = 0;
        }
    }

    if(rect.sPressed === true){
        rect.y += rect.speed;
        if(rect.y > 450){
            rect.y = 450;
        }
    }

    if(rect.wPressed === true){
        rect.y -= rect.speed;
        if(rect.y < 0){
            rect.y = 0;
        } 
    }
    
    if(bot.x < coin.x){
        bot.x += bot.speed;
    }

    if(bot.x > coin.x){
        bot.x -= bot.speed;
    }

    if(bot.y < coin.y){
        bot.y += bot.speed;
    }

    if(bot.y > coin.y){
        bot.y -= bot.speed;
    }


}

function isColliding(){
    var collide;
   
    if(rect.top > coin.bottom || rect.right < coin.left || rect.bottom < coin.top || rect.left > coin.right){
        collide = false;
    }
    else{
        collide = true;
    }

    if(collide === true){
        points = points + coinWorth;
        document.getElementById("points").innerHTML = points;
        newCoin();
        if(points >= 10){
            document.getElementById("increaseCoinWorthButton").style = "display:block;"
        }
    }

    
}

function botCollide(){
    var collide;
    
    if(bot.top > coin.bottom || bot.right < coin.left || bot.bottom < coin.top || bot.left > coin.right){
        collide = false;
    }
    else{
        collide = true;
    }

    if(collide === true){
        points = points + coinWorth;
        document.getElementById("points").innerHTML = points; 
        newCoin();
    }
}

function drawCoin(){

    ctx.beginPath();
    ctx.rect(coin.x, coin.y, coin.width, coin.height);
    ctx.fillStyle = "#eaff05";
    ctx.fill();
    ctx.closePath();

    
}

function newCoin(){
    coin.x = Math.floor(Math.random() * 475);
    coin.y = Math.floor(Math.random() * 475);
}

 document.body.addEventListener("keydown", function (e) {
    
    if(e.key === "d"){
        rect.dPressed = true;
    }
    
    if(e.key === "s"){
        rect.sPressed = true;
    }

    if(e.key === "a"){
        rect.aPressed = true;
    }

    if(e.key === "w"){
        rect.wPressed = true;
    }


});

document.body.addEventListener("keyup", function (e) {
    if(e.key === "d"){
        rect.dPressed = false;
    }

    if(e.key === "a"){
        rect.aPressed = false;
    }

    if(e.key === "s"){
        rect.sPressed = false;
    }

    if(e.key === "w"){
        rect.wPressed = false;
    }

});



function increaseSpeed(){
    if(points >= speedCost){
        rect.speed += 0.4;
        points -= speedCost;
        document.getElementById("points").innerHTML = points;
        speedCost = speedCost * 2; 
        document.getElementById("increaseSpeedButton").innerText = "Increase Speed " + speedCost;

    } 
}


var coinWorthCost = 10; 
function increaseCoinWorth(){
    if(points >= coinWorthCost){
        coinWorth = coinWorth + 1;
        points -= coinWorthCost;
        document.getElementById("points").innerHTML = points;
        coinWorthCost = coinWorthCost * 2;
        document.getElementById("increaseCoinWorthButton").innerText = "Increase Coin Worth " + coinWorthCost;
        console.log(coinWorth);
    }
}

setInterval(draw, 10);