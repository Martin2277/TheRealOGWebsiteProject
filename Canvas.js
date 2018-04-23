$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", setMousePosition, false);
    var x = Math.random() * canvas.width + 1;
    var y = canvas.height - 100;
    var dx = 0;
    var dy = 0;
    var mouseX;
    var mouseY;
    var blockWidth = ((canvas.width - 20) / 20)
    var blockHeight = (canvas.height / 100) * 2;
    var blocksThere = false;
    var BlockX = [];
    var BlockY = [];
    var counter = 0;
    var isCalculated = false;
    var Blocks = 0;
    var rows = 5;
    var cols = 19;
    var lifes = 3;
    var won = false;
    var hpId;
    var removeHP;
    var color = "#6f1048";
    //-----------------set Level-----------------//
    $('#start').click(function () {
        $(this).prop("disabled", true);
        for (var hp = 0; hp < 3; hp++) {
            hpId = "hp" + hp;
            $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
        }
        BlockX = [];
        calculateBlocksPosition();
        lifes = 3;
        dx = 2.5;
        dy = -2.5;
    });
    $('#lvl1').click(function () {
        rows = 5;
        BlockX = [];
        calculateBlocksPosition();
    });
    $('#lvl2').click(function () {
        BlockX = [];
        rows = 10;
        calculateBlocksPosition();
    });
    $('#lvl3').click(function () {
        BlockX = [];
        rows = 15;
        calculateBlocksPosition();
    });
    //------------------------------------------//

    //--------------GetMousePosition------------//
    function setMousePosition(e) {
        mouseX = e.x - 565;
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
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
                counter++;
            }
        }
    }
    function drawPadle() {
        ctx.beginPath();
        ctx.rect(mouseX - 50, 530, 100, 10);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = color;
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
                lifes--;
                removeHP = "#hp" + lifes;
                $(removeHP).remove();
                $('#start').prop("disabled", false);
                alert("YOU LOSE!")
                dx = 0;
                dy = 0;
            } else {
                lifes--;
                removeHP = "#hp" + lifes;
                $(removeHP).remove();
            }
        }
    }
    function checkCollisionPadle() {
        if (y >= 525 && y <= 530) {
            console.log(dy);
            if (x >= mouseX && x <= mouseX + 50 && dy > 0) {
                dy = -(dy) * 1.002;
            }
            if (x >= mouseX - 50 && x <= mouseX && dy > 0) {
                dy = -(dy) * 1.002;
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
            $('#start').prop("disabled", false);
            won = true;
            dx = 0;
            dy = 0;
            x = canvas.width / 2;
            y = canvas.height - 100;
        }
    }
    //-------------------------------------//

    //-----ruft "Render" alle 10ms auf-----//
    setInterval(Render, 5);
    //-------------------------------------//
});