$(document).ready(function () {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var dx = 0;
    var dy = 0;
    var ballX = 500;
    var ballY = 500;
    var up, down, left, right;

    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowUp") {
            dx = 0;
            dy = -1;
            up = true;
            down = false;
            left = false;
            right = false;
        }
        if (event.key == "ArrowDown") {
            dx = 0;
            dy = 1;
            up = false;
            down = true;
            left = false;
            right = false;
        }
        if (event.key == "ArrowLeft") {
            dx = -1;
            dy = 0;
            up = false;
            down = false;
            left = true;
            right = false;
        }
        if (event.key == "ArrowRight") {
            dx = 1;
            dy = 0;
            up = false;
            down = false;
            left = false;
            right = true;
        }
    });


    function Render() {
        // DrawBackground();
        ctx.clearRect(0, 0, c.width, c.height);
        DrawBall();
        DrawGamefield();
    }
    function DrawBackground() {
        ctx.beginPath();
        ctx.rect(0, 0, c.width, c.height);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    function DrawBall() {
        if(up){
            if(ballX >= 200 && ballX <= 800){
                if (ballY <= 50 + 18) {
                    dy = 0;
                }
            }
        }
        if(down){
            if(ballX >= 200 && ballX <= 800){
                if(ballY >= 500 - 18){
                    dy = 0;
                }
            }
        }
        ballX = ballX + dx;
        ballY = ballY + dy;
        ctx.beginPath();
        ctx.arc(ballX, ballY, 12, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
    function DrawGamefield() {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.moveTo(200, 50);
        ctx.lineTo(800, 50);
        ctx.lineTo(800, 200);
        ctx.lineTo(700, 200);
        ctx.lineTo(700, 250);
        ctx.lineTo(800, 250);
        ctx.moveTo(800, 300);
        ctx.lineTo(700, 300);
        ctx.lineTo(700, 350);
        ctx.lineTo(800, 350);
        ctx.lineTo(800, 500);
        ctx.lineTo(200, 500);
        ctx.lineTo(200, 350);
        ctx.lineTo(300, 350);
        ctx.lineTo(300, 300);
        ctx.lineTo(200, 300);
        ctx.moveTo(200, 250);
        ctx.lineTo(300, 250);
        ctx.lineTo(300, 200);
        ctx.lineTo(200, 200);
        ctx.lineTo(200, 45);
        ctx.stroke();
    }

    setInterval(Render, 5);

});