$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", setMousePosition, false);
    var x = canvas.width / 2;
    var y = canvas.height - 100;
    var dx = 0;
    var dy = 0;
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
    var lifes = 300;
    var won = false;
    //-----------------set Level-----------------//
    $('#lvl1').click(function () {
        rows = 5;
        calculateBlocksPosition();
    });
    $('#start').click(function () {
        dx = 5;
        dy = -5;
    });
    $('#lvl2').click(function () {
        rows = 10;
        calculateBlocksPosition();
    });
    $('#lvl3').click(function () {
        rows = 15;
        calculateBlocksPosition();
    });
    //------------------------------------------//

    //--------------GetMousePosition------------//
    function setMousePosition(e) {
        mouseX = e.x - 260;
        mouseY = e.y;
    }
    //-----------------------------------------//

    //---befüllt das array basierend auf lvl---//
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
    //-----------------------------------------//

    //-----------Anzahl der Blöcke-------------//
    function setBlocks() {
        Blocks = BlockX.length;
    }
    //-----------------------------------------//

    //Zeichnung aller Elemente mit neuen Werten//
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
    //----------------------------------------//

    //--------wird alle 10ms augerufen--------//
    function Render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //löscht den canvasinhalt
        x += dx; //ändert die Position des Balles
        y += dy;
        drawBall();
        drawPadle();
        drawBlocks();
        checkCollisionWalls();
        checkCollisionPadle();
        checkCollisionBlocks();
        if (isCalculated == false) { //ruft nur einmal die calculation der Blöcke auf
            calculateBlocksPosition();
            isCalculated = true;
        }
        setBlocks();
        checkWin(); //überprüft den aktuellen Spielstand
    }

    //--------überprüft auf Collision--------//
    function checkCollisionWalls() {
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
    function checkCollisionPadle() {
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
    //-------------------------------------//

    //-------Überprüft ob gewonnen---------//
    function checkWin() {
        if (Blocks <= 0 && won == false) {
            alert("YOU WIN!")
            won = true;
            dx = 0;
            dy = 0;
            x = canvas.width / 2;
            y = canvas.height - 100;
        }
    }
    //-------------------------------------//

    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 10);
    //-------------------------------------//
});