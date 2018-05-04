$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var dy = canvas.height / 2;
    var cy = canvas.height / 2;
    var ballX = canvas.width / 2;
    var ballY = canvas.height / 2;
    var speedY = 2;
    var speedX = -2;
    var botY = ballY;
    var botY2;
    var Ball = new Image();
    Ball.src = 'Doge.png'

    //------------PlayerInputs--------------------//
    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowUp") {
            if (dy > 0) {
                dy += -100;
            }
        }
        if (event.key == "ArrowDown") {
            if (dy < 500) {
                dy += 100;
            }
        }
    }
    )
    //-------------------------------------------//
    function Render() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers();
        drawBall();
        Ballmove();
        botMove();
    }

    function botBrain() {
        var tempY = ballY;
        var tempSpeedY = speedY;
        for (var x = ballX; x < (canvas.width - 30) / Math.abs(speedY); x++) {
            tempY += tempSpeedY;
            if (tempY <= 0 || tempY >= canvas.height) tempSpeedY = -tempSpeedY;
        }
        botY2 = tempY;
    }
    function botMove() {
        if (botY != botY2 && ballX >= 500) {
            console.log(ballY);
            if (botY < botY2) {
                botY += 5;
            }
            if (botY > botY2) {
                botY -= 5;
            }
        }
    }
    function drawPlayers() {
        ctx.beginPath();
        ctx.rect(10, dy, 10, 100);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width - 20, botY - 50, 10, 100);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    function drawBall() {
        ctx.drawImage(Ball, ballX, ballY, 20, 20);
    }
    function Ballmove() {
        ballX += speedX;
        ballY += speedY;
        if (ballY >= canvas.height - 20 || ballY <= 0) speedY = - speedY;
        if (ballX <= 20 && ballX >= 10 && ballY <= dy + 100 && ballY >= dy) {
            speedX = -speedX;
            botBrain();
        }
        if (ballX >= canvas.width - 40 && ballX <= canvas.width - 20 && ballY <= botY + 50 && ballY >= botY - 50) (speedX = -speedX)
    }
    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 0);
});