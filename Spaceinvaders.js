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
    var delay = 0;
    var test = 3;
    var delay1 = 0.01;
    var delay2 = -0.01;
    var delayCounter = 0;
    var del1;
    var del2;
    var change = 0;
    var fireDy = canvas.height - 60;
    var shotsX = [];
    var shotsY = [];
    var shotsCounter = 0;
    var fireCounter = 0;

    //------------PlayerInputs--------------------//
    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowLeft") {
            dx += -10;
        }
        if (event.key == "ArrowRight") {
            dx += 10;
        }
        if (event.key == "z") {
            shotsX[shotsCounter] = dx + 50;
            shotsY[shotsCounter] = fireDy;
            shotsCounter++;
        }
    }
    )
    //-------------------------------------------//


    //----------------OnRender------------------//
    function Render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        calculateInvadersPosition();
        drawInvaders();
        drawPlayer();
        fire();
    }

    //-----------------------------------------//

    function calculateInvadersPosition() {
        if (delayCounter % 250 == 0) {
            if (change % 2 == 0) {
                del1 = 10;
                del2 = -10;
            } else {
                del1 = -10;
                del2 = 10;
            }
            change++;
        } else {
            del2 = 0;
            del1 = 0;
        }
        delay2 += del1;
        delay1 += del2;

        delayCounter++;

        counter = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {

                if (i == 0 || i == 2) delay = delay2;
                if (i == 1) delay = delay1;
                InvadersX[counter] = (j * InvaderWidth + 60 + delay);
                InvadersY[counter] = (i * InvaderHeight);
                counter++
            }
        }
    }
    function fire() {
        var move = -0.5;
        fireCounter = 0;
        shotsX.forEach(element => {
            ctx.beginPath();
            ctx.moveTo(shotsX[fireCounter], shotsY[fireCounter]);
            ctx.lineTo(shotsX[fireCounter], shotsY[fireCounter] - 5);
            ctx.stroke();
            shotsY[fireCounter] += move;
            fireCounter++;
        });
    }

    function drawInvaders() {
        counter = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                ctx.drawImage(invader, InvadersX[counter], InvadersY[counter], InvaderWidth, InvaderHeight);
                counter++;
            }
        }
    }
    function drawPlayer() {
        ctx.drawImage(shooter, dx, canvas.height - 30, 100, 50);
    }
    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 5);
    //-------------------------------------// 
});