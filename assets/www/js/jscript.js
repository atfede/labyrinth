$(document).ready(init);

function init() {
//    draw(view);

    preloadScenery();

    //prevent scroll
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    });

    $('#up_arrow').fastClick(function (e) {
        if (fighting === false) {
            move(38);
        }
    });
    $('#left_arrow').fastClick(function (e) {
        if (fighting === false) {
            move(37);
        }
    });
    $('#right_arrow').fastClick(function (e) {
        if (fighting === false) {
            move(39);
        }
    });
    $('#down_arrow').fastClick(function (e) {
        if (fighting === false) {
            move(40);
        }
    });

    $('#button1').fastClick(button1Pressed);
    $('#button2').fastClick(button2Pressed);

    $('#btnFight').fastClick(displayFightingMenu);
    $('#btnRun').fastClick(run);

    $("#btnAttack").fastClick(attack);
    $("#btnBlock").fastClick(block);
    $("#btnCast").fastClick(cast);


//    Player.prototype = new Character("Knight", 10, "Fefiss", "sword", 0);
//    Player.prototype.constructor = Player;
    player = new Player("Knight", 10, "Fefiss", "sword", 0);
    enemy = new Enemy("", 10, "", "");

//$('#button1').on("click", function () {
////        alert('b1 click');
//        button1Pressed();
//    });
//    $('#button2').on('touchstart', alert('b2 touchstart!'));
//    $('#button2').on("click", function () {
////        alert('b2 click');
//        button2Pressed();
//    });

//http://docs.phonegap.com/en/1.0.0/phonegap_media_media.md.html#Media
//    var src = "/android_asset/www/sounds/ironbound.mp3";
//    var media = new Media(src);
//    media.play();

//    var snd = new Media(getPhoneGapPath() + 'sounds/ironbound.mp3');
//    snd.play();

    //gira la vista (el canvas)
//    setInterval(rotateView, 100);

//    var canvas = document.getElementById("canvasarea");
//    canvas.addEventListener("touchstart", tStart, false);
//    canvas.addEventListener("touchmove", tWhile, false);
//    canvas.addEventListener("touchend", tFin, false);

//    drawByHand();
//    drawByHandAndroid();

//    drawMeteorites();

//    playAudio('heavybr.mp3');
}

//function getPhoneGapPath() {
//    var path = window.location.pathname;
//    path = path.substr(path, path.length - 10);
//    return 'file://' + path;
//}
//;

function mediaSuccess() {
    alert('media Success');
}
function mediaError() {
    alert('media Error');
}
function mediaStatus() {
    alert('media Status');
}

//Prevents backspace except in the case of textareas and text inputs to prevent user navigation.
$(document).keydown(function (e) {
    var preventKeyPress;
    if (e.keyCode === 8) {
        var d = e.srcElement || e.target;
        switch (d.tagName.toUpperCase()) {
            case 'TEXTAREA':
                preventKeyPress = d.readOnly || d.disabled;
                break;
            case 'INPUT':
                preventKeyPress = d.readOnly || d.disabled ||
                        (d.attributes["type"] && $.inArray(d.attributes["type"].value.toLowerCase(), ["radio", "checkbox", "submit", "button"]) >= 0);
                break;
            case 'DIV':
                preventKeyPress = d.readOnly || d.disabled || !(d.attributes["contentEditable"] && d.attributes["contentEditable"].value === "true"); // == ?
                break;
            default:
                preventKeyPress = true;
                break;
        }
    }
    else
        preventKeyPress = false;

    if (preventKeyPress)
        e.preventDefault();
});

var lab = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1], //[1, 0, 1, !3, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1], // 1 0 0 1 0 no sabe!
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]];

//function printLab() {
//    for (var i = 0; i < lab.length; i++) {
//        for (var j = 0, max = lab[i].length; j < max; j++) {
//            if (j % 17 === 0)
//                $("#matriz").append("<br>");
//            if (lab[i][j] !== 1) { //cambiar a red
//                $("#matriz").append("<span style='color: black;'>" + lab[i][j] + "</span>" + "&nbsp;&nbsp;&nbsp;");
//            }
//            else {
//                $("#matriz").append(lab[i][j] + "&nbsp;&nbsp;&nbsp;");
//            }
//        }
//    }
//}

var fighting = false;
document.onkeydown = checkKey;
function checkKey(e) {
    if (!fighting) {
        //alert(e.keyCode;
        e = e || window.event;
        if (e.keyCode === 37) { //izq
            move(37); //antes les pasaba solo move(e)
        }
        else if (e.keyCode === 38) { //arr
            move(38);
        }
        else if (e.keyCode === 39) { // der
            move(39);
        }
        else if (e.keyCode === 40) { // aba
            move(40);
        }
    }
}

var contX = 1; //columnas
var contY = 1; //filas
var view = {
    left: lab[contY][contX + 1],
    leftUp: lab[contY + 1][contX + 1],
    front: lab[contY + 1][contX],
    rightUp: lab[contY + 1][contX - 1],
    right: lab[contY][contX - 1]
//    back: lab[contY - 1][contX]
};

var gUp = true;
var gDown = false;
var gLeft = false;
var gRight = false;

var leftY = contY;
var leftupY = contY + 1;
var frontY = contY + 1;
var rightY = contY;
var rightupY = contY + 1;

var leftX = contX + 1;
var leftupX = contX + 1;
var frontX = contX;
var rightX = contX - 1;
var rightupX = contX - 1;

var player;
var enemy;

function move(e) {

    // IZQUIERDA
//       if (e.keyCode === 37) {
    if (e === 37) {

        if (gUp) {
            gUp = false;
            gLeft = true;

            view.left = lab[contY - 1][contX];
            view.leftUp = lab[contY - 1][contX + 1];
            view.front = lab[contY][contX + 1];
            view.rightUp = lab[contY + 1][contX + 1];
            view.right = lab[contY + 1][contX];
//            view.back = lab[contY][contX - 1];

//            draw(view);

            leftY = contY - 1;
            leftX = contX;

            leftupY = contY - 1;
            leftupX = contX + 1;

            frontY = contY;
            frontX = contX + 1;

            rightupY = contY + 1;
            rightupX = contX + 1;

            rightY = contY + 1;
            rightX = contX;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
        else if (gLeft) {
            //voy hacia la izquierda 2
            gLeft = false;
            gDown = true;

            //aca down
            view.left = lab[contY][contX - 1];
            view.leftUp = lab[contY - 1][contX - 1];
            view.front = lab[contY - 1][contX];
            view.rightUp = lab[contY - 1][contX + 1];
            view.right = lab[contY][contX + 1];
//            view.back = lab[contY + 1][contX];

//            draw(view);

            leftY = contY;
            leftX = contX - 1;

            leftupY = contY - 1;
            leftupX = contX - 1;

            frontY = contY - 1;
            frontX = contX;

            rightupY = contY - 1;
            rightupX = contX + 1;

            rightY = contY;
            rightX = contX + 1;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);

        }
        else if (gDown) {
            //voy hacia derecha 3
            gDown = false;
            gRight = true;

            view.left = lab[contY + 1][contX];
            view.leftUp = lab[contY + 1][contX - 1];
            view.front = lab[contY][contX - 1];
            view.rightUp = lab[contY - 1][contX - 1];
            view.right = lab[contY - 1][contX];
//            view.back = lab[contY][contX + 1];

//            draw(view);

            leftY = contY + 1;
            leftX = contX;

            leftupY = contY + 1;
            leftupX = contX - 1;

            frontY = contY;
            frontX = contX - 1;

            rightupY = contY - 1;
            rightupX = contX - 1;

            rightY = contY - 1;
            rightX = contX;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);

        } //xx
        else if (gRight) {
            //voy hacia derecha 3
            gDown = false;
            gRight = false;
            gUp = true;

            view.left = lab[contY][contX + 1];
            view.leftUp = lab[contY + 1][contX + 1];
            view.front = lab[contY + 1][contX];
            view.rightUp = lab[contY + 1][contX - 1];
            view.right = lab[contY][contX - 1];
//            view.back = lab[contY - 1][contX];

//            draw(view);

            leftY = contY;
            leftX = contX + 1;

            leftupY = contY + 1;
            leftupX = contX + 1;

            frontY = contY + 1;
            frontX = contX;

            rightupY = contY + 1;
            rightupX = contX - 1;

            rightY = contY;
            rightX = contX - 1;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
    }


    // DERECHA
    else if (e === 39) {

        if (gUp) {
            gUp = false;
            gRight = true;

            view.left = lab[contY + 1][contX];
            view.leftUp = lab[contY + 1][contX - 1];
            view.front = lab[contY][contX - 1];
            view.rightUp = lab[contY - 1][contX - 1];
            view.right = lab[contY - 1][contX];
//            view.back = lab[contY][contX + 1];

//            draw(view);

            leftY = contY + 1;
            leftX = contX;

            leftupY = contY + 1;
            leftupX = contX - 1;

            frontY = contY;
            frontX = contX - 1;

            rightupY = contY - 1;
            rightupX = contX - 1;

            rightY = contY - 1;
            rightX = contX;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
        else if (gRight) {
            //voy hacia derecha 3
            gRight = false;
            gDown = true;

            view.left = lab[contY][contX - 1];
            view.leftUp = lab[contY - 1][contX - 1];
            view.front = lab[contY - 1][contX];
            view.rightUp = lab[contY - 1][contX + 1];
            view.right = lab[contY][contX + 1];
//            view.back = lab[contY + 1][contX];

//            draw(view);

            leftY = contY;
            leftX = contX - 1;

            leftupY = contY - 1;
            leftupX = contX - 1;

            frontY = contY - 1;
            frontX = contX;

            rightupY = contY - 1;
            rightupX = contX + 1;

            rightY = contY;
            rightX = contX + 1;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
        else if (gDown) {
            //voy hacia derecha 3
            gDown = false;
            gLeft = true;

            view.left = lab[contY - 1][contX];
            view.leftUp = lab[contY - 1][contX + 1];
            view.front = lab[contY][contX + 1];
            view.rightUp = lab[contY + 1][contX + 1];
            view.right = lab[contY + 1][contX];
//            view.back = lab[contY - 1][contX];

//            draw(view);

            leftY = contY - 1;
            leftX = contX;

            leftupY = contY - 1;
            leftupX = contX + 1;

            frontY = contY;
            frontX = contX + 1;

            rightupY = contY + 1;
            rightupX = contX + 1;

            rightY = contY + 1;
            rightX = contX;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
        else if (gLeft) {
            //voy hacia la izquierda 2
            gLeft = false;
            gUp = true;

            //aca down
            view.left = lab[contY][contX + 1];
            view.leftUp = lab[contY + 1][contX + 1];
            view.front = lab[contY + 1][contX];
            view.rightUp = lab[contY + 1][contX - 1];
            view.right = lab[contY][contX - 1];
//            view.back = lab[contY - 1][contX];

//            draw(view);

            leftY = contY;
            leftX = contX + 1;

            leftupY = contY + 1;
            leftupX = contX + 1;

            frontY = contY + 1;
            frontX = contX;

            rightupY = contY + 1;
            rightupX = contX - 1;

            rightY = contY;
            rightX = contX - 1;

            printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
        }
    }


    //ARRIBA
    else if (e === 38) {

        if (gUp) {
            if (lab[contY + 1][contX] !== 1) {
                contY++;
            }
            if (lab[contY][contX] !== 1) {
                view.left = lab[contY][contX + 1];
                view.leftUp = lab[contY + 1][contX + 1];
                view.front = lab[contY + 1][contX];
                view.rightUp = lab[contY + 1][contX - 1];
                view.right = lab[contY][contX - 1];
//                view.back = lab[contY - 1][contX];

//                draw(view);

                leftY = contY;
                leftX = contX + 1;

                leftupY = contY + 1;
                leftupX = contX + 1;

                frontY = contY + 1;
                frontX = contX;

                rightupY = contY + 1;
                rightupX = contX - 1;

                rightY = contY;
                rightX = contX - 1;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        else if (gLeft) {
            if (lab[contY][contX + 1] !== 1) {
                contX++;

                view.left = lab[contY - 1][contX];
                view.leftUp = lab[contY - 1][contX + 1];
                view.front = lab[contY][contX + 1];
                view.rightUp = lab[contY + 1][contX + 1];
                view.right = lab[contY + 1][contX];
//                view.back = lab[contY][contX - 1];

//                draw(view);

                leftY = contY - 1;
                leftX = contX;

                leftupY = contY - 1;
                leftupX = contX + 1;

                frontY = contY;
                frontX = contX + 1;

                rightupY = contY + 1;
                rightupX = contX + 1;

                rightY = contY + 1;
                rightX = contX;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        else if (gRight) {
            if (lab[contY][contX - 1] !== 1) {
                contX--;

                view.left = lab[contY + 1][contX];
                view.leftUp = lab[contY + 1][contX - 1];
                view.front = lab[contY][contX - 1];
                view.rightUp = lab[contY - 1][contX - 1];
                view.right = lab[contY - 1][contX];
//                view.back = lab[contY][contX + 1];

//                draw(view);

                leftY = contY + 1;
                leftX = contX;

                leftupY = contY + 1;
                leftupX = contX - 1;

                frontY = contY;
                frontX = contX - 1;

                rightupY = contY - 1;
                rightupX = contX - 1;

                rightY = contY - 1;
                rightX = contX;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        if (gDown) {
            if (lab[contY - 1][contX] !== 1) {
                contY--;
            }

            if (lab[contY][contX] !== 1) {
                view.left = lab[contY][contX - 1];
                view.leftUp = lab[contY - 1][contX - 1];
                view.front = lab[contY - 1][contX];
                view.rightUp = lab[contY - 1][contX + 1];
                view.right = lab[contY][contX + 1];
//                view.back = lab[contY + 1][contX];

//                draw(view);

                leftY = contY;
                leftX = contX - 1;

                leftupY = contY - 1;
                leftupX = contX - 1;

                frontY = contY - 1;
                frontX = contX;

                rightupY = contY - 1;
                rightupX = contX + 1;

                rightY = contY;
                rightX = contX + 1;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        //hay pelea?
        //randomFight(); nope
    }


    // ABAJO
    if (e === 40) {
        if (gUp) {

            if (lab[contY - 1][contX] !== 1) {
                contY--;
            }
            if (contY >= 1) {
                view.left = lab[contY][contX + 1];
                view.leftUp = lab[contY + 1][contX + 1];
                view.front = lab[contY + 1][contX];
                view.rightUp = lab[contY + 1][contX - 1];
                view.right = lab[contY][contX - 1];

//                draw(view);

                leftY = contY;
                leftX = contX + 1;

                leftupY = contY + 1;
                leftupX = contX + 1;

                frontY = contY + 1;
                frontX = contX;

                rightupY = contY + 1;
                rightupX = contX - 1;

                rightY = contY;
                rightX = contX - 1;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        else if (gLeft) {
            if (lab[contY][contX - 1] !== 1) {
                contX--;

                view.left = lab[contY - 1][contX];
                view.leftUp = lab[contY - 1][contX + 1];
                view.front = lab[contY][contX + 1];
                view.rightUp = lab[contY + 1][contX + 1];
                view.right = lab[contY + 1][contX];
//                view.back = lab[contY - 1][contX];

//                draw(view);

                leftY = contY - 1;
                leftX = contX;

                leftupY = contY - 1;
                leftupX = contX + 1;

                frontY = contY;
                frontX = contX + 1;

                rightupY = contY + 1;
                rightupX = contX + 1;

                rightY = contY + 1;
                rightX = contX;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        //check
        else if (gRight) {
            if (lab[contY][contX + 1] !== 1) {
                contX++;

                view.left = lab[contY + 1][contX];
                view.leftUp = lab[contY + 1][contX - 1];
                view.front = lab[contY][contX - 1];
                view.rightUp = lab[contY - 1][contX - 1];
                view.right = lab[contY - 1][contX];
//                view.back = lab[contY][contX - 1];

//                draw(view);

                leftY = contY + 1;
                leftX = contX;

                leftupY = contY + 1;
                leftupX = contX - 1;

                frontY = contY;
                frontX = contX - 1;

                rightupY = contY - 1;
                rightupX = contX - 1;

                rightY = contY - 1;
                rightX = contX;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
        //check
        else if (gDown) {

            if (lab[contY + 1][contX] !== 1) {
                contY++;

                view.left = lab[contY][contX - 1];
                view.leftUp = lab[contY - 1][contX - 1];
                view.front = lab[contY - 1][contX];
                view.rightUp = lab[contY - 1][contX + 1];
                view.right = lab[contY][contX + 1];
//                view.back = lab[contY + 1][contX];

//                draw(view);

                leftY = contY;
                leftX = contX - 1;

                leftupY = contY - 1;
                leftupX = contX - 1;

                frontY = contY - 1;
                frontX = contX;

                rightupY = contY - 1;
                rightupX = contX + 1;

                rightY = contY;
                rightX = contX + 1;

                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
            }
        }
    }
}

function draw(view) {
//    Object.keys(view); // ['name', 'value']
//    Object.keys(view).forEach(function (key) {
//        $("#view").append(view[key]);
//    });
    $("#view").empty();
    $("#view").append("contY: " + contY + " contX: " + contX + "<p>");

    var cont = 1;
    $("#tLeft").empty();
    $("#tLeftUp").empty();
    $("#tFront").empty();
    $("#tRight").empty();
    $("#tRightUp").empty();

    for (var dir in view) {
        if (dir === "left")
            $("#tLeft").append(view[dir]);
        if (dir === "leftUp")
            $("#tLeftUp").append(view[dir]);
        if (dir === "front")
            $("#tFront").append(view[dir]);
        if (dir === "rightUp")
            $("#tRightUp").append(view[dir]);
        if (dir === "right")
            $("#tRight").append(view[dir]);

        if (cont === 1 || cont === 2)
            $("#view").append("<span style='color: #52CC29;'>" + dir.toUpperCase() + "</span> - " + "<span style='color: red;'>" + view[dir] + "</span><br>");
        if (cont === 3) {
            $("#view").append("<br>" + "<span style='color: #0066CC;'>" + dir.toUpperCase() + "</span> - " + "<span style='color: red;'>" + view[dir] + "</span><br>");
        }
        if (cont === 4 || cont === 5) {
            $("#view").append("<br>" + "<span style='color: #660033;'>" + dir.toUpperCase() + "</span> - " + "<span style='color: red;'>" + view[dir] + "</span>");
        }
        cont++;
    }
    $("#view").append("<p>");
    $("#view").css("float", "left");
    $("#tControl").css("display", "block");
    $("#tControl").css("float", "left");
//    $("#view").css("margin-left", "400px");
    $("#tControl").css("font-size", "80px");
    $("#tControl").css("margin-left", "400px");

}

function printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX) {
    //    IMPRIME LA MATRIZ CON NÚMEROS NARANJAS
//    $("#matriz").empty();
//    for (var i = 0; i < lab.length; i++) {
//        for (var j = 0, max = lab[i].length; j < max; j++) {
//            if (j % 17 === 0) {
//                $("#matriz").append("<br>");
//            }
//            if (i === leftY && j === leftX) {
//                $("#matriz").append("<span style='color: orange;'>" + lab[i][j] + "</span>&nbsp;&nbsp;&nbsp;");
//            }
//            else if (i === leftupY && j === leftupX) {
//                $("#matriz").append("<span style='color: orange;'>" + lab[i][j] + "</span>&nbsp;&nbsp;&nbsp;");
//            }
//            else if (i === rightY && j === rightX) {
//                $("#matriz").append("<span style='color: orange;'>" + lab[i][j] + "</span>&nbsp;&nbsp;&nbsp;");
//            }
//            else if (i === rightupY && j === rightupX) {
//                $("#matriz").append("<span style='color: orange;'>" + lab[i][j] + "</span>&nbsp;&nbsp;&nbsp;");
//            }
//            else if (i === frontY && j === frontX) {
//                $("#matriz").append("<span style='color: orange;'>" + lab[i][j] + "</span>&nbsp;&nbsp;&nbsp;");
//            }
//            else {
//                $("#matriz").append(lab[i][j] + "&nbsp;&nbsp;&nbsp;");
//            }
//        }
//        $("#matriz").css("font-size", "14px"); //fer 14px
//    }
    setCanvas(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
}

var flagCorridor = false;
var flag_CrossPaths = false;

function setCanvas(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX) {

    console.clear();
    console.log('Left:' + lab[leftY][leftX]);
    console.log('LeftUp: ' + lab[leftupY][leftupX]);
    console.log('Front: ' + lab[frontY][frontX]);
    console.log('RightUp: ' + lab[rightupY][rightupX]);
    console.log('Right: ' + lab[rightY][rightX]);

    var canvas = document.getElementById("canvasarea");
    var canvasWidth = canvas.width;
    canvas.width = canvasWidth;

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        if (typeof leftY !== "undefined" && typeof leftupY !== "undefined" && typeof frontY !== "undefined" && typeof frontX !== "undefined" &&
                typeof rightY !== "undefined" && typeof rightupX !== "undefined") {

//            blurFX(canvas);

            if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
                draw_wall_front(ctx);
            }
            else if (!flagCorridor && lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corridor(ctx);
                flagCorridor = true;
            }
            else if (flagCorridor && lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corridor_2(ctx);
//                draw_corridor(ctx);//xx
                flagCorridor = false;
            }
            //hidden
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 3 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corridor_3(ctx);
                flagCorridor = !flagCorridor;
//                 lab[frontY][frontX] = 1;
            }
            //hidden
            else if (lab[leftY][leftX] === 3 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corridor_3(ctx);
                flagCorridor = !flagCorridor;
//                 lab[frontY][frontX] = 1;
            }
            //hidden
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 3 && lab[rightY][rightX] === 1) {
                draw_corridor_3(ctx);
                flagCorridor = !flagCorridor;
//                 lab[frontY][frontX] = 1;
            }
            //hidden
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 3) {
                draw_corridor_3(ctx);
                flagCorridor = !flagCorridor;
//                 lab[frontY][frontX] = 1;
            }
            //hidden
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 3 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
//                draw_corridor_3(ctx);
                draw_wall_front(ctx); //con sprite levanta pared
                flagCorridor = !flagCorridor;
//                 lab[frontY][frontX] = 1;
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_wall_turn_left(ctx);
            }
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corner_to_left(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 1) {
                draw_wall_turn_right(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 0) {
                draw_corner_to_right(ctx);
            }
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_wall_turn_left_with_corridor(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
                draw_wall_turn_right_with_corridor(ctx);
            }
            //hidden
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 3 && lab[rightY][rightX] === 0) {
                draw_wall_front(ctx);
            }
            if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
                draw_corner_to_right(ctx);
            }
//            if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 0) {
////                draw_corner_to_right(ctx);
//            }
            if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_corner_to_left(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1) {
                draw_wall_end(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
//                draw_wall_to_wall_to_left(ctx);
            }
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 0) {
                draw_wall_walk_both_sides(ctx);
            }
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 0) {
                draw_wall_front(ctx);
            }
            else if (lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 1 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
////                draw_wall_front_missing_right(ctx);
                draw_wall_front(ctx);
            }
            else if (lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 0 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 0 && lab[rightY][rightX] === 1) {
                draw_cross_paths(ctx);
            }
            else if (!flag_CrossPaths && lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
                draw_cross_paths_next(ctx);
                flag_CrossPaths = true;
            }
            else if (flag_CrossPaths && lab[leftY][leftX] === 0 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 0 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 0) {
                draw_cross_paths_next_2(ctx);
//                draw_cross_paths_next(ctx); //xx
                flag_CrossPaths = false;
            }
            else if(lab[leftY][leftX] === 1 && lab[leftupY][leftupX] === 1 && lab[frontY][frontX] === 2 && lab[rightupY][rightupX] === 1 && lab[rightY][rightX] === 1){
                draw_exit(ctx);
            }
        }
    }
}

function draw_wall_front(ctx) {

    var img = new Image();
    img.src = 'img/lab/wall_front.png';
    img.width = 800;
    img.height = 480;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
}

var startGame = true;
function draw_corridor(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor.png';
    img.width = 800;
    img.height = 480;
    if (startGame) {
        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        startGame = false;
    }
    else {
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
}

function draw_corridor_2(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor.png';
    img.width = 800;
    img.height = 480;

//    var torch = new Image();
//    torch.src = 'img/misc/animated_torch_1.gif';
//    torch.width = 32;
//    torch.height = 64;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//        ctx.drawImage(torch, 250, 200, torch.width, torch.height);
//        ctx.drawImage(torch, 500, 200, torch.width, torch.height);
//    };
}

//hidden
function draw_corridor_3(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor.png';
    img.width = 800;
    img.height = 480;

//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_wall_turn_left(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_turn_left.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_corner_to_left(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_end_turn_left_2.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_wall_turn_right(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_turn_right.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_corner_to_right(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_end_turn_right_2.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_wall_turn_left_with_corridor(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_with_left_turn.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_wall_turn_right_with_corridor(ctx) {
    var img = new Image();
    img.src = 'img/lab/corridor_with_right_turn.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_wall_end(ctx) {
    var img = new Image();
    img.src = 'img/lab/wall_end.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

//xx
function draw_wall_walk_both_sides(ctx) {
    var img = new Image();
    img.src = 'img/lab/wall_front_no_sides_1.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_cross_paths(ctx) {
    var img = new Image();
    img.src = 'img/lab/cross_paths.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_cross_paths_next(ctx) {
    var img = new Image();
    img.src = 'img/lab/cross_paths_next.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };
}

function draw_cross_paths_next_2(ctx) {
    var img = new Image();
    img.src = 'img/lab/cross_paths_next.png';
    img.width = 800;
    img.height = 480;
//    img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height);
//    };

//    var tree = new Image();
//    tree.src = 'img/misc/scary_tree.png';
//    tree.width = 382;
//    tree.height = 420;
////    img.onload = function () {
//    ctx.drawImage(tree, 0, 0, tree.width, tree.height);
}

function draw_exit(ctx) {
    var img = new Image();
    img.src = 'img/lab/wall_end_exit.png';
    img.width = 800;
    img.height = 480;
    //img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height);
    //};
}

function randomFight() {
    //entre 0 y 100
    var num = Math.floor(Math.random() * 101); //entre 0 y 100 --> *101
    if (num >= 90 && num <= 100) { //95 y 100
        getVersus();
    }
    else {
        return;
    }
}

//draw character
var idSetInt = 0;
function getVersus() {
//    displayEncounter();
    fighting = true;

    var num = Math.floor(Math.random() * 101);
    //enemy 1
    if (num >= 0 && num < 33) {

        enemy = new Enemy("enemy1", 5, "Stone", "fists");

        var ctx = document.getElementById('canvasarea').getContext('2d');
        var img = new Image();
        img.src = 'img/enemy/enemy1.png';
        img.sx = 0;
        img.sy = 0;
        img.swidth = 170;
        img.sheight = 262;
        img.posX = 300; //290
        img.posY = 185; //165
        img.width = 170;
        img.height = 262;
        clearInterval(idSetInt);

        idSetInt = setInterval(function () {
            if (img.sx <= 2046) {
                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
                ctx.drawImage(img, img.sx, img.sy, img.swidth, img.sheight, img.posX, img.posY, img.width, img.height);
                img.sx += 170.9;
//                img.width += 20; //10
//                img.height += 20; //10
//                img.posX -= 5;
//                img.posY += 1;
            }
            if (img.sx >= 2046) {
                img.sx = 0;
            }
        }, 150);
    }
    //magehielo
    else if (num > 33 && num <= 66) {

        enemy = new Enemy("mage", 5, "Sabrina", "ice");

        var ctx = document.getElementById('canvasarea').getContext('2d');
        var img = new Image();
        img.src = 'img/enemy/magahielo3.png';
        img.sx = 0;
        img.sy = 0;
        img.swidth = 228; //223
        img.sheight = 306; //290
        img.posX = 250;
        img.posY = 170;
        img.width = 228; //223
        img.height = 306; //290
        clearInterval(idSetInt);

        idSetInt = setInterval(function () {
            if (img.sx <= 4560) {
                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
                ctx.drawImage(img, img.sx, img.sy, img.swidth, img.sheight, img.posX, img.posY, img.width, img.height);
                img.sx += 228;
//                pow.sx += 96;
//                img.width += 20; //10
//                img.height += 20; //10
//                img.posX -= 5;
//                img.posY += 1;
            }
            if (img.sx >= 4560) {
                img.sx = 0;
            }
        }, 80); //150
    }
    //werewolf
    else if (num > 66 && num <= 100) {

        enemy = new Enemy("werewolf", 8, "Licano", "Claws");

        var ctx = document.getElementById('canvasarea').getContext('2d');
        var img = new Image();
        img.src = 'img/enemy/werewolf2.png';
        img.sx = 0;
        img.sy = 0;
        img.swidth = 260;
        img.sheight = 264;
        img.posX = 260; //290
        img.posY = 200; //165
        img.width = 260;
        img.height = 264;
        clearInterval(idSetInt);

        idSetInt = setInterval(function () {
            if (img.sx <= 1040) {
                printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
                ctx.drawImage(img, img.sx, img.sy, img.swidth, img.sheight, img.posX, img.posY, img.width, img.height);
//                ctx.drawImage(pow, pow.sx, pow.sy, pow.swidth, pow.sheight, pow.posX, pow.posY, pow.width, pow.height);
                img.sx += 260;
//                img.width += 20; //10
//                img.height += 20; //10
//                img.posX -= 5;
//                img.posY += 1;
            }
            if (img.sx >= 1040) {
                img.sx = 0;
            }

        }, 200); //150
    }
//    setTimeout(function(){displayFightMenu();}, 1000);

    $("#text").empty();
    $("#text").fadeIn("fast");

    displayPlayerMenu();
    displayEnemyMenu();
}


function button1Pressed() {
    hidePlayerAttr();
}

function button2Pressed() {
    displayPlayerAttr();
}

function displayPlayerAttr() {
    $("#userMenu").css("visibility", "visible");
    $("#userMenu").fadeIn("fast"); //slow
    $("#name").empty();
    $("#type").empty();
    $("#life").empty();
    $("#xp").empty();
    $("#weapon").empty();
    $("#equip").empty();
    $("#view").empty();

    $("#name").append("Name: " + player.prototype.name);
    $("#type").append("Type: " + player.prototype.type);
    $("#life").append("Life: " + player.prototype.life);
    $("#xp").append("Xp: " + player.xp);
    $("#weapon").append("Weapon: " + player.prototype.weapon);
    $("#equip").append("Equip");
    $("#view").append("View");
}

function hidePlayerAttr() {
    $("#userMenu").css("visibility", "hidden");
//    $("#userMenu").fadeOut("medium");
}

function displayEncounter() {
    $("#encounter").fadeIn("slow");
    $("#encounter").fadeOut("slow");
}

//function playAudio() {
//    var mp3file = new Media("/android_asset/www/sounds/heavybr.mp3",
//            function () {
//                alert("playAudio():Audio Success");
//            },
//            function (err) {
//                alert(err);
//            }
//    );
//    mp3file.play();
//}

//function playAudio(src) {
//    if (device.platform === 'Android') {
//        src = '/android_asset/www/sounds/' + src;
//    }
//    var media = new Media(src, success, error_error);
//    media.play();
//}

//function success() {
//    // ignore
//}
//function error_error(e) {
//    alert('great error');
//    alert(e.message);
//}

function displayPlayerMenu() {
    $("#text").css("visibility", "visible");
    $("#menuFight").css("visibility", "visible");
    $(".btnHolder1").css("visibility", "visible");
}

function displayEnemyMenu() {
    if (fighting) {
        $("#enemyMenu").css("visibility", "visible");
        $("#enemyMenuLeft").css("visibility", "visible");
    }
    $("#eName").empty();
    $("#eType").empty();
    $("#eLife").empty();
    $("#eWeapon").empty();

    $("#eName").append("Name: " + enemy.prototype.name);
    $("#eType").append("Type: " + enemy.prototype.type);
    $("#eLife").append("Life: " + enemy.prototype.life);
    $("#eWeapon").append("Weapon: " + enemy.prototype.weapon);
}

//btnFight
function displayFightingMenu() {
    flagTurn = true;
    displayPlayerAttr();

    $(".btnHolder1").css("visibility", "hidden");
    $("#menuFighting").css("visibility", "visible");
//    $("#menuFighting").empty();
//    $("#menuFighting").append("nombre + ' attacks '+ monster + ' damaged '<br>");
//    $("#menuFighting").append("monster + ' attacks '+ nombre+ ' damaged ' +  points <br>");
//    $("#menuFighting").append("monster + ' takes no damage ' <br>");
//    $("#menuFighting").append("monster + ' attacks '  <br>");
}

function run() {
//    alert('run!');
    contX = 1; //columnas
    contY = 1; //filas
    view = {
        left: lab[contY][contX + 1],
        leftUp: lab[contY + 1][contX + 1],
        front: lab[contY + 1][contX],
        rightUp: lab[contY + 1][contX - 1],
        right: lab[contY][contX - 1]
//    back: lab[contY - 1][contX]
    };

    gUp = true;
    gDown = false;
    gLeft = false;
    gRight = false;

    leftY = contY;
    leftupY = contY + 1;
    frontY = contY + 1;
    rightY = contY;
    rightupY = contY + 1;

    leftX = contX + 1;
    leftupX = contX + 1;
    frontX = contX;
    rightX = contX - 1;
    rightupX = contX - 1;


    $("#enemyMenu").css("visibility", "hidden");
    $("#enemyMenuLeft").css("visibility", "hidden");
    $("#menuFight").css("visibility", "hidden");
    $(".btnHolder1").css("visibility", "hidden");
    printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
    clearInterval(idSetInt);
    fighting = false;

    $("#canvasarea").fadeOut("fast");
    $("#canvasarea").fadeIn("fast");
}

function preloadScenery() {
    var canvas = document.getElementById("canvasarea");
    var canvasWidth = canvas.width;
    canvas.width = canvasWidth;
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        draw_exit(ctx);
        draw_wall_front(ctx);
        draw_corridor(ctx);
        draw_corridor_2(ctx);
        draw_corridor_3(ctx);
        draw_wall_turn_left(ctx);
        draw_corner_to_left(ctx);
        draw_wall_turn_right(ctx);
        draw_corner_to_right(ctx);
        draw_wall_turn_left_with_corridor(ctx);
        draw_wall_turn_right_with_corridor(ctx);
        draw_wall_end(ctx);
        draw_wall_walk_both_sides(ctx);
        draw_cross_paths(ctx);
        draw_cross_paths_next(ctx);

//        var img = new Image();
//        img.src = 'img/enemy/enemy1.png';
////        ctx.drawImage(img, 0, 0);
//
//        var img2 = new Image();
//        img2.src = 'img/enemy/magahielo3.png';
////        ctx.drawImage(img, 0, 0);
//
//        var img3 = new Image();
//        img3.src = 'img/enemy/werewolf2.png';
////        ctx.drawImage(img, 0, 0);
    };
}

function blurFX() {
    var n = 0;
    var id = setInterval(function () {
        $("#canvasarea").css("opacity", " " + n + " ");
        n += 0.1;
        if (n === 0.8) {
            clearInterval(id);
        }
    }, 40);

}

var flagTurn = true;
var playersTurn = false;
var enemysTurn = false;

function attack() {
    var num = Math.floor(Math.random() * 11);
    var damage = 0;

    //player
    if (num < 5 && flagTurn) {
        flagTurn = false;
        playersTurn = true;
        enemysTurn = false;
    }
    //enemy
    else if (num > 5 && flagTurn) {
        flagTurn = false;
        enemysTurn = true;
        playersTurn = false;
    }

    if (playersTurn) {
        $("#text").empty();
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> attacks " + "<span class='enemy'>" + enemy.prototype.name + "</span>");

        playersTurn = false;
        enemysTurn = true;

        damage = player.attack();
        enemy.update(damage);

        blurFX();
        $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> damaged <span class='pts'>" + damage + "</span> pts");

        //si atacó el jugador luego ataca el enemigo automáticamente
        if (enemy.prototype.life > 0) {
            setTimeout(function () {
                attack();
            }, 2000);
        }
        else {
            destroyEnemy();
            return;
        }
    }
    else if (enemysTurn) {
        $("#text").empty();
        $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> attacks " + "<span class='player'>" + player.prototype.name + "</span>");

        enemysTurn = false;
        playersTurn = true;

        damage = enemy.attack();
        player.update(damage);

        if (damage > 0) {
            turnScreenRed();
        }
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> damaged <span class='pts'>" + damage + "</span> pts");
    }
//    turnScreenRed();
    displayPlayerAttr();
    displayEnemyMenu();
}

function block() {
    var num = Math.floor(Math.random() * 11);
    var damage = enemy.attack();

    if (num > 6 && damage > 0) {
        var dmg = (damage / 2) - 0.5;
        player.prototype.life += dmg; //.toFixed(2)
        enemy.update((damage - 1) / 2);

        $("#text").empty();
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> is blocking </span>");
//        $("#text").animate({width: $("#text span").width()}, 3000);
        $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> attacks " + "<span class='player'>" + player.prototype.name + "</span>");
        $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> damaged <span class='pts'>" + damage + "</span> pts");
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> regains <span class='pts'>" + dmg + "</span> pts of health");
    }
    else {
        player.update(damage);
        $("#text").empty();
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> is blocking");
        $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> attacks " + "<span class='player'>" + player.prototype.name + "</span>");
        $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> damaged <span class='pts'>" + damage + "</span> pts");
//        $("#text").animate();
    }
    turnScreenRed();
    displayPlayerAttr();
    displayEnemyMenu();
}

function cast() {
    $("#text").empty();
    $("#text").append("No spells at the moment");
}

function destroyEnemy() {
//    turnScreenRed();
    blurFX();
    clearInterval(idSetInt);
    printLab2(leftY, leftupY, frontY, rightupY, rightY, leftX, leftupX, frontX, rightX, rightupX);
    $("#text").empty();
    $("#text").append("<p>" + "<span class='enemy'>" + enemy.prototype.name + "</span> destroyed!");
    fighting = false;

    $("#userMenu").fadeOut(10000);
    $("#enemyMenu").css("visibility", "hidden");
    $("#enemyMenuLeft").css("visibility", "hidden");
    $("#menuFighting").css("visibility", "hidden");
    $("#menuFight").css("visibility", "hidden");
//    $("#text").css("visibility", "hidden");
    $("#text").fadeOut(5000); //xx
}

function gameOver() {
    $("#text").empty();
    $("#text").append("<p>" + "<span class='player'>" + player.prototype.name + "</span> has died");
//    alert("game over man... game over!");
}

function displayText() {
//    $("#text").css("visibility", "hidden");
    $("#text").css("visibility", "visible");
}

function turnScreenRed() {
    $("#flash").css("visibility", "visible");
    $("#flash").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100); //
}

