$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var Blocks = [];
    var blockWidth = ((canvas.width - 20) / 20)
    var blockHeight = (canvas.height / 100) * 2;
    var rows = 5;
    var cols = 19;
    var difficulty = 2;
    var gamestarted = false;
    //-------------------------input--------------------------//
    canvas.addEventListener("mousemove", setMousePosition, false);
    document.addEventListener('keydown', (event) => {
        if (event.key == "r" && ball.hp == 0) {
            ball.x = Math.floor(Math.random() * 300) + 300;;
            ball.y = 300;
            ball.xspeed = 0;
            ball.yspeed = 0;
            ball.hp = 3;
            gamestarted = false;
            for (var hp = 0; hp < 3; hp++) {
                hpId = "hp" + hp;
                $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
            }

        }
        if (event.key == "s" && !gamestarted) {
            ball.xspeed = 1;
            ball.yspeed = 1;
            gamestarted = true;
        }
    }
    )
    //--------------------------buttons-----------------------//
    $('#lvl1').click(function () {
        for (var hp = 0; hp < ball.hp; hp++) {
            this.removeHP = "#hp" + hp;
            $(this.removeHP).remove();
        }
        for (var hp = 0; hp < 3; hp++) {
            hpId = "hp" + hp;
            $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
        }
        ball.hp = 3;
        rows = 5;
        difficulty = 2;
        ball.x = Math.floor(Math.random() * 300) + 300;
        ball.y = 300;
        ball.xspeed = 0;
        ball.yspeed = 0;
        gamestarted = false;
        Blocks = [];
        calcBlocks();
    });
    $('#lvl2').click(function () {
        for (var hp = 0; hp < ball.hp; hp++) {
            this.removeHP = "#hp" + hp;
            $(this.removeHP).remove();
        }
        for (var hp = 0; hp < 3; hp++) {
            hpId = "hp" + hp;
            $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
        }
        ball.hp = 3;
        rows = 10;
        difficulty = 2;
        ball.x = Math.floor(Math.random() * 300) + 300;
        ball.y = 300;
        ball.xspeed = 0;
        ball.yspeed = 0;
        gamestarted = false;
        Blocks = [];
        calcBlocks();
    });
    $('#lvl3').click(function () {
        for (var hp = 0; hp < ball.hp; hp++) {
            this.removeHP = "#hp" + hp;
            $(this.removeHP).remove();
        }
        for (var hp = 0; hp < 3; hp++) {
            hpId = "hp" + hp;
            $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
        }
        ball.hp = 3;
        rows = 15;
        difficulty = 3;
        ball.x = Math.floor(Math.random() * 300) + 300;
        ball.y = 300;
        ball.xspeed = 0;
        ball.yspeed = 0;
        gamestarted = false;
        Blocks = [];
        calcBlocks();
    });
    //------------------GameObjectKlassen--------------//
    class Block {
        constructor(x, y, w, h, hp) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.hp = hp;
        }
    }

    class Ball {
        constructor(x, y, r, hp) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.hp = hp;
            this.xspeed = 0;
            this.yspeed = 0;
        }
        move() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        checkCollisionBlock() {
            for (var x = 0; x < Blocks.length; x++) {
                if (this.x <= (Blocks[x].x + Blocks[x].w) && this.x >= Blocks[x].x && this.y <= (Blocks[x].y + Blocks[x].h) && this.y >= Blocks[x].y) {
                    if (this.y == Blocks[x].y + Blocks[x].h || this.y == Blocks[x].y) {
                        this.yspeed = -this.yspeed;
                        Blocks[x].hp--;
                    } else {
                        this.xspeed = -this.xspeed;
                        Blocks[x].hp--;
                    }
                }
            }
            this.checkBlocksHp();
        }
        checkCollisionBall() {
            if ((this.x + this.r) >= padle.x && (this.x - this.r) <= (padle.x + 100) && this.y + Math.floor(this.r / 2) == canvas.height - 30) {
                this.yspeed = -this.yspeed;
            }
        }
        checkCollisionWalls() {
            if (this.x < 0) {
                this.xspeed = -this.xspeed;
            }
            if (this.x > canvas.width) {
                this.xspeed = -this.xspeed;
            }
            if (this.y < 0) {
                this.yspeed = -this.yspeed;
            }
            if (this.y == canvas.height) {
                this.hp--;
                this.x = Math.floor(Math.random() * 300) + 300;
                this.y = 300;
                this.xspeed = 0;
                this.yspeed = 0;
                gamestarted = false;
                this.removeHP = "#hp" + this.hp;
                $(this.removeHP).remove();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 360);
            ctx.fillStyle = "rgb(30, 215, 96)";
            ctx.fill();
            ctx.closePath();
        }
        checkBlocksHp() {
            for (var x = 0; x < Blocks.length; x++) {
                if (Blocks[x].hp <= 0) {
                    Blocks.splice(x, 1);
                }
            }
        }
        checkAlive() {
            if (this.hp <= 0) {
                this.xspeed = 0;
                this.yspeed = 0;
                ctx.font = "30px arcade";
                ctx.fillStyle = "black";
                ctx.fillText("Game Over! Press 'r' to restart", (canvas.width / 2) - 450, (canvas.height / 2));
            }
        }
    }
    let ball = new Ball(Math.floor(Math.random() * 300) + 300, (canvas.height - 300), 5, 3);

    class Padle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        setPadlePos(Newx) {
            this.x = Newx;
        }
    }
    let padle = new Padle(canvas.width / 2, canvas.height - 30);
    //--------------------------------------------------------------//
    calcBlocks();
    for (var hp = 0; hp < 3; hp++) {
        hpId = "hp" + hp;
        $('#rightBar').append('<img id=' + hpId + ' class="hp" src="HP.png"></img>');
    }
    function main() {
        console.log(gamestarted);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        greeting();
        drawBlocks();
        drawPadle();
        for (var x = 0; x < difficulty; x++) {
            ball.move();
            ball.draw();
            ball.checkCollisionBlock();
            ball.checkCollisionBall();
            ball.checkCollisionWalls();
            ball.checkAlive();
        }
    }
    setInterval(main, 1);


    function setMousePosition(e) {
        padle.setPadlePos(e.x - 565);
    }
    function greeting() {
        if (gamestarted == false && ball.hp >= 1) {
            ctx.font = "30px arcade";
            ctx.fillStyle = "black";
            ctx.fillText("Press 's' to start", (canvas.width / 2) - 250, (canvas.height / 2));
        }
    }

    function calcBlocks() {
        Blocks = [];
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                let block = new Block((j * blockWidth + 35), (i * blockHeight + 35), blockWidth, blockHeight, 3);
                Blocks.push(block);
            }
        }
    }
    function drawBlocks() {
        Blocks.forEach(element => {
            ctx.beginPath();
            ctx.rect(element.x, element.y, element.w, element.h)
            ctx.strokeStyle = "rgb(30, 215, 96)";
            ctx.lineWidth = 4;
            ctx.stroke();
            if (element.hp == 3) {
                ctx.fillStyle = "rgb(24, 178, 79)";
            }
            if (element.hp == 2) {
                ctx.fillStyle = "rgb(25, 196, 86)";
            }
            if (element.hp == 1) {
                ctx.fillStyle = "rgb(27, 232, 100)";
            }
            ctx.fill();
        });
    }
    function drawPadle() {
        ctx.beginPath();
        ctx.rect(padle.x, padle.y, 100, 15);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
    }
});