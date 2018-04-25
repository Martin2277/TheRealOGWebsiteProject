$(document).ready(function () {
    //---------------Variablen---------------------//
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = 'SpaceInvader.png';
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

    //------------PlayerInputs--------------------//
    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowLeft") {
            dx += -5;
        }
        if (event.key == "ArrowRight") {
            dx += 5;
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
    }

    //-----------------------------------------//

    function calculateInvadersPosition() {
        if (delayCounter % 500 == 0) {
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

    function drawInvaders() {
        counter = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                ctx.drawImage(img, InvadersX[counter], InvadersY[counter], InvaderWidth, InvaderHeight);
                counter++;
            }
        }
    }
    function drawPlayer() {
        ctx.beginPath();
        ctx.rect(dx, canvas.height - 30, 100, 10);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 2);
    //-------------------------------------// 
});