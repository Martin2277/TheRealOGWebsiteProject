$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", setMousePosition, false);
    var Blocks = [];
    var blockWidth = ((canvas.width - 20) / 20)
    var blockHeight = (canvas.height / 100) * 2;
    var rows = 5;
    var cols = 19;
    var difficulty = 3;

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
            this.xspeed = 1;
            this.yspeed = 1;
            this.ghostmode = false;
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
            if ((this.x + this.r) >= padle.x && (this.x - this.r) <= (padle.x + 100) && this.y == canvas.height - 30) {
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
                this.x = canvas.width / 2;
                this.y = 300;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 360);
            ctx.fillStyle = "green";
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
    }
    let ball = new Ball((canvas.width / 2), (canvas.height - 300), 5, 3);

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
    function main() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBlocks();
        drawPadle();
        for (var x = 0; x < difficulty; x++) {
            ball.move();
            ball.draw();
            ball.checkCollisionBlock();
            ball.checkCollisionBall();
            ball.checkCollisionWalls();
        }
    }
    setInterval(main, 1);


    function setMousePosition(e) {
        padle.setPadlePos(e.x - 565);
    }

    function calcBlocks() {
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
            ctx.strokeStyle = "#ff5e5e";
            ctx.stroke();
            if (element.hp == 3) {
                ctx.fillStyle = "rgb(0, 0, 0)";
            }
            if (element.hp == 2) {
                ctx.fillStyle = "rgb(112, 112, 112)";
            }
            if (element.hp == 1) {
                ctx.fillStyle = "rgb(242, 242, 242)";
            }
            ctx.fill();
        });
    }
    function drawPadle() {
        ctx.beginPath();
        ctx.rect(padle.x, padle.y, 100, 15);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
    }
});