$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", setMousePosition, false);
    var x = canvas.width / 2;
    var y = canvas.height - 100;
    var dx = 2;
    var dy = -2;
    var mouseX;
    var mouseY;

    function setMousePosition(e) {
        mouseX = e.x;
        mouseY = e.y;
        //alert(mouseX);
        //alert(mouseY);
    }

    function drawPadle() {

        ctx.beginPath();
        ctx.rect(mouseX - 50, 530, 100, 10);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += dx;
        y += dy;
        drawBall();
        checkCollisionWalls();
        checkCollisionPadle();
        drawPadle();
    }

    function checkCollisionWalls() {
        var GameFieldHeight = canvas.height;
        var GameFieldWidth = canvas.width;
        if (x >= GameFieldWidth) {
            dx = -2;
        }
        if (x <= 0) {
            dx = 2;
        }
        if (y <= 0) {
            dy = 2;
        }
        if (y >= GameFieldHeight) {
            alert("You Lose!");
        }
    }
    function checkCollisionPadle() {
        if (y >= 525) {
            if (x >= mouseX - 50 && x <= mouseX + 50 && dy > 0) {
                dy = -2;
            }
        }
    }

    setInterval(draw, 10);
});