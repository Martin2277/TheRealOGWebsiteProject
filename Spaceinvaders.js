$(document).ready(function () {
    //---------------Variablen---------------------//
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var invader = new Image();
    var shooter = new Image();
    invader.src = 'SpaceInvader.png';
    shooter.src = 'shooter.png';
    var InvaderWidth = (canvas.width - 20) / 20;
    var InvaderHeight = 50;
    var InvadersX = [];
    var InvadersY = [];
    var counter;
    var rows = 3;
    var cols = 18;
    var dx = canvas.width / 2;
    var test = 3;
    var delayCounter = 0;
    var del1;
    var del2;
    var change = 0;
    var fireDy = canvas.height - 60;
    var shotX;
    var shotY;
    var fireCounter = 0;
    var hit = false;
    var isShot = false;
    var random;
    var bombX = 0;
    var bombY = 0;
    //------------PlayerInputs--------------------//
    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowLeft") {
            dx += -10;
        }
        if (event.key == "ArrowRight") {
            dx += 10;
        }
        if (event.key == "z" && isShot == false) {
            shotX = dx + 50;
            shotY = fireDy;
            isShot = true;
        }
    }
    )
    //-------------------------------------------//
    //--------------Setup-----------------------//
    counter = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {

            InvadersX[counter] = (j * InvaderWidth + 60);
            InvadersY[counter] = (i * InvaderHeight);
            counter++
        }
    }

    //-----------------------------------------//



    //----------------OnRender------------------//
    function Render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        InvadersDance();
        drawInvaders();
        drawPlayer();
        DropBomb();
        if (isShot == true) fire();
        if (isShot == true) checkHit();
        delayCounter++;
    }

    //-----------------------------------------//

    function InvadersDance() {
        if (delayCounter % 200 == 0) {
            for (var x = 0; x < InvadersX.length; x++) {
                random = Math.floor(Math.random() * 20) - 10;
                InvadersY[x] += 5;
                InvadersX[x] += random;
            }
        }
    }
    function DropBomb() {
        random = Math.floor(Math.random() * InvadersX.length);
        var move = +0.5;

        ctx.beginPath();
        ctx.moveTo(300, bombY);
        ctx.lineTo(300, bombY + 5);
        ctx.stroke();
        bombY += move;
    }
    function fire() {
        var move = -5;
        ctx.beginPath();
        ctx.moveTo(shotX, shotY);
        ctx.lineTo(shotX, shotY - 5);
        ctx.stroke();
        shotY += move;
    }
    function checkHit() {
        if (shotY <= canvas.height && shotY >= 0 && shotY % 5 == 0) {
            for (var b = 0; b < InvadersX.length; b++) {
                if (shotX < InvadersX[b] + 35 && shotX > InvadersX[b] + 5 && shotY == InvadersY[b]) {
                    InvadersX.splice(b, 1);
                    InvadersY.splice(b, 1);
                    isShot = false;
                }
                if (shotY <= 0) {
                    isShot = false;
                }
            }
        }
    }

    function drawInvaders() {
        counter = 0;
        for (var i = 0; i < InvadersX.length; i++) {
            ctx.drawImage(invader, InvadersX[counter], InvadersY[counter], InvaderWidth, InvaderHeight);
            counter++;
        }
    }
    function drawPlayer() {
        ctx.drawImage(shooter, dx, canvas.height - 30, 100, 50);
    }
    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 5);
    //-------------------------------------// 
});