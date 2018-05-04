var schussNR = 0;
var gegnerNR = 0;
var firespeed = 2000;
var firerate = 400;
var fireable = true;
var life = 5;
var tickrate = 20;
var upgrade = 0;
var points = 0;

var mouseY;
var mouseX;

$(document).ready(function () {



    $("#Gamewindow").bind('mousemove', function (e) {
        console.log("Test");
        mouseY = e.pageY;
        mouseX = e.pageX;
        if (e.pageX < 585 && e.pageX > 15) {
            $('#ship').css({
                left: e.pageX - 35,
            });
        }
        if ((e.pageY - 30) < 800) {
            $('#ship').css({
                top: e.pageY - 30
            });
        }
    });

    function updateStats() {
        $("#Points").text(points)
        $("#Life").text(life)
        $("#Firerate").text(firerate)
        $("#Bullet-speed").text(firespeed)
        $("#UpgradeLv").text(upgrade)
    }

    function shooting(imgsrc, velocity) {
        var schussTemp = schussNR + "_bullet";
        schussNR++


        $("#Gamewindow").append("<img id='" + schussTemp + "' class='bullet' src='" + imgsrc + "' style='position: absolute; left: " + (mouseX - 5) + "px; top: " + (mouseY - 30) + "px;'>");
        $("#" + schussTemp + "").animate({ top: "0px" }, velocity)
        setTimeout(function () {
            $("#" + schussTemp + "").remove();
        }, velocity)

    }

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '83') {
            fireableCheck();
        } else if (e.keyCode == '82') {
            enemySpawn(10, 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmSJ9wb99aJGPfDDRsiUmPAguZlXWAKqokieHT0hFgL7d0YC-cNA", 6000)

        } else if (e.keyCode == '85') {
            UpgradeShip();
        }
    }

    function UpgradeShip() {
        if (upgrade < 19) {
            firerate -= 20;
            firespeed -= 100;
            life++
            upgrade++
            updateStats();

        }

    }

    function fireableCheck() {

        if (fireable == true) {

            fireable = false
            shooting("https://i.imgur.com/zoyvC6Y.png", firespeed)
            setTimeout(function () {
                fireable = true;
            }, firerate);
        }
    };


    function enemySpawn(amount, time, imgsrc, speed) {
        for (var i = 0; i < amount; i++) {
            setTimeout(function () {
                var Random = Math.floor(Math.random() * Math.floor(540) + 30)

                var gegnerTemp = gegnerNR
                gegnerNR++


                $("#Gamewindow").append("<img class='enemy' id='" + gegnerTemp + "' src='" + imgsrc + "' style='position: absolute; left: " + Random + "px; top: 0px;'>");
                $("#" + gegnerTemp + "").animate({ top: "750px" }, speed)
                try {
                    setTimeout(function () {

                        $("#" + gegnerTemp + "").remove();

                        updateStats()

                    }, speed)
                } catch (err) {

                }
            }, (time * i))
        }

    }


    function enemyColision() {
        try {
            var collisions = $("#ship").collision(".enemy", { obstacleData: "odata", colliderData: "cdata", as: "<div/>" });
            var o = $(collisions).data("odata");
            var cwith = $(o).get(0).id
            console.log("Collison with " + cwith);
            life--
            updateStats()
            $("#" + cwith).remove();
        } catch (err) {

        }
    }

    function enemyHit() {
        try {
            var collisions2 = $(".bullet").collision(".enemy", { obstacleData: "odata", colliderData: "cdata", as: "<div/>" });
            var o = $(collisions2).data("odata");
            var cwith = $(o).get(0).id

            var a = $(collisions2).data("cdata");
            var awith = $(a).get(0).id


            $("#" + cwith).remove();
            $("#" + awith).remove();
            points += 100;
            if (is_int(points / 1000)) {
                UpgradeShip();
            }
        } catch (err) {

        }

        /* var collisions2 = $(".bullet").collision(".enemy");
         collisions2.remove(); */

    }

    function is_int(value) {
        if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    $(document).ready(function () {
        updateStats()
        setInterval(function () {
            enemyColision()
            enemyHit()
        }, tickrate)

    });
});
