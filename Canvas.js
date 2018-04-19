$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", setMousePosition, false);
    var x = canvas.width / 2;
    var y = canvas.height - 100;
    var dx = 5;
    var dy = -5;
    var mouseX;
    var mouseY;
    var blockWidth = ((canvas.width - 20) / 20)
    var blockHeight = 10;
    var blocksThere = false;
    var BlockX = [];
    var BlockY = [];
    var counter = 0;
    var isCalculated = false;
    var Blocks = 0;
    var rows = 3;
    var cols = 19;
    var lifes = 3;

    function setMousePosition(e) { //erhält die aktuelle Mausposition
        mouseX = e.x - 450;
        mouseY = e.y;
        //alert(mouseX);
        //alert(mouseY);
    }
    function drawBlocks() {
        counter = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                ctx.beginPath();
                ctx.rect(BlockX[counter], BlockY[counter], blockWidth - 1, blockHeight - 1);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                counter++;
            }
        }
    }
    function calculateBlocksPosition() {
        counter = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                BlockX[counter] = (j * blockWidth + 35);
                BlockY[counter] = (i * blockHeight + 35);
                counter++
            }
        }
    }
    function setBlocks() {
        Blocks = BlockX.length;
    }
    function drawPadle() { //zeichnet den Schläger basierend auf der aktuellen Mausposition
        ctx.beginPath();
        ctx.rect(mouseX - 50, 530, 100, 10);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBall() { //zeichnet den SpielBall
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function Render() { //cleart das Canvas und zeichnet die elemente an einer neuen Position, einmal pro Frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += dx;
        y += dy;
        drawBall();
        drawPadle();
        drawBlocks();
        checkCollisionWalls();
        checkCollisionPadle();
        checkCollisionBlocks();
        if (isCalculated == false) {
            calculateBlocksPosition();
            isCalculated = true;
        }
        setBlocks();
        checkWin();
    }


    function checkCollisionWalls() { //überprüft auf Kollisionen mit Wänden
        var GameFieldHeight = canvas.height;
        var GameFieldWidth = canvas.width;
        if (x > GameFieldWidth) {
            dx = -(dx);
        }
        if (x < 0) {
            dx = -(dx);
        }
        if (y < 0) {
            dy = -(dy);
        }
        if (y > GameFieldHeight) {
            x = canvas.width / 2;
            y = canvas.height - 100;
            dx = -(dx);
            dy = -(dy);
            if (lifes <= 1) {
                alert("YOU LOSE!")
                calculateBlocksPosition();
                lifes = 3;
            } else {
                lifes--;
            }
        }
    }
    function checkCollisionPadle() { //überprüft auf Schlägerkontakt
        if (y >= 525 && y <= 530) {
            if (x >= mouseX && x <= mouseX + 50 && dy > 0) {
                dy = -(dy);
                dx += 0.05;
                dy += 0.05;
                console.log(dx)
                console.log(dy);

            }
            if (x >= mouseX - 50 && x <= mouseX && dy > 0) {
                dy = -(dy);
                dx *= 1.01;
                dy *= 1.01;

            }
        }
    }
    function checkCollisionBlocks() {
        for (var c = 0; c < Blocks; c++) {
            if ((x >= BlockX[c]) && (x <= BlockX[c] + 49) && (y <= BlockY[c] + 10) && (y >= BlockY[c] - 10)) {
                BlockX.splice(c, 1);
                BlockY.splice(c, 1);
                dy = -(dy);
            }
        }

    }
    function checkWin() {
        if (Blocks <= 0) {
            alert("YOU WIN!")
            calculateBlocksPosition();
        }
    }

    setInterval(Render, 10);
});