alert(`MANI: \n ok baby complete each mission to proceed to the next mission \n by finishing the last mission you can get your gift back from the hackers :) \n \n save the valentine baby ❤`)

document.addEventListener('dblclick', function (el) {
    el.preventDefault();
});

let currentLevel = 1;
const levels = ["typingChallenge", "loveMaze", "LovePower", "breakTheIce"];
const canvas = document.getElementById("gameCanvas");
const gameCtx = canvas.getContext("2d");

function unlockNextLevel() {
    if (currentLevel <= levels.length) {
        document.getElementById(levels[currentLevel - 1]).removeAttribute('disabled');
        alert(`Great job! Next level unlocked: ${levels[currentLevel - 1].replace(/([A-Z])/g, ' $1')}`);
        currentLevel++;
    }
}

function startGame(type) {
    gameCtx.clearRect(0, 0, canvas.width, canvas.height);
    if (type === 1) loveCatcher();
    else if (type === 3) typingChallenge();
    else if (type === 4) loveMaze();
    else if (type === 7) clickerGame();
    else if (type === 10) breakTheIce();
}

function loveCatcher() {
    alert(`MANI: \n You have to catch the hearts that come from above with the basket \n \n you need to catch 10 of them`)
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let plate = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 120,
        height: 20,
        color: "#2aaffa"
    };

    let cookies = [];
    let cookieCount = 0;
    let gameTime = 0;
    let gameRunning = true;
    let score = 0;
    let mouseX = canvas.width / 2;

    document.addEventListener("touchmove", (e) => {
        let touch = e.touches[0]; // اولین لمس را دریافت کن
        mouseX = touch.clientX - canvas.offsetLeft;
    });

    setInterval(addCookie, 1000); // Increased cookie drop frequency for added challenge
    setInterval(updateTime, 1000);

    canvas.addEventListener("click", (event) => {
        if (event.button === 0) {
            explodeCookies(
                event.clientX - canvas.offsetLeft,
                event.clientY - canvas.offsetTop,
                false
            );
        }
    });

    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        explodeCookies(
            event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop,
            true
        );
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = plate.color;
        ctx.fillRect(
            plate.x - plate.width / 2,
            plate.y - plate.height / 2,
            plate.width,
            plate.height
        );

        cookies.forEach((cookie, index) => {
            ctx.beginPath();
            ctx.arc(cookie.x, cookie.y, cookie.size, 0, Math.PI * 2);
            ctx.fillStyle = cookie.color;
            ctx.fill();

            const chocolateSize = 5;
            [
                [-1, -1],
                [1, 1],
                [-1, 1],
                [1, -1]
            ].forEach((offset) => {
                ctx.beginPath();
                ctx.arc(
                    cookie.x + (offset[0] * cookie.size) / 2,
                    cookie.y + (offset[1] * cookie.size) / 2,
                    chocolateSize,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            cookie.y += cookie.speed;

            if (
                cookie.y + cookie.size > plate.y - plate.height / 2 &&
                cookie.x >= plate.x - plate.width / 2 &&
                cookie.x <= plate.x + plate.width / 2
            ) {
                cookies.splice(index, 1);
                cookieCount++;
                score++
            } else if (cookie.y + cookie.size > canvas.height) {
                cookies.splice(index, 1);
                alert("gameover try again!")
                restartGame()
            }

            if (score > 10) {
                alert('You Won The First Game Baby :)')
                score = 0;
                gameOver();
                canvas.remove();
                unlockNextLevel();
            }
        });

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Cookies: " + cookieCount, 10, 20);
        ctx.fillText("Time: " + formatTime(gameTime), 10, 40);

        if (gameRunning) {
            requestAnimationFrame(draw);
        }
    }

    function addCookie() {
        let isGolden = (cookieCount + cookies.length + 1) % 100 === 0;
        let isPurple = (cookieCount + cookies.length + 1) % 1000 === 0;
        let newCookie = {
            x: Math.random() * canvas.width,
            y: -30,
            size: 15,
            speed: Math.random() * 6 + 1, // Increased cookie falling speed
            color: isPurple ? "purple" : isGolden ? "gold" : "red"
        };
        cookies.push(newCookie);
    }

    function explodeCookies(x, y, countScore) {
        cookies = cookies.filter((cookie) => {
            let dx = x - cookie.x;
            let dy = y - cookie.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < cookie.size) {
                if (countScore) {
                    cookieCount++;
                }
                return false;
            }
            return true;
        });
    }

    function gameOver() {
        gameRunning = false;
    }

    function restartGame() {
        cookieCount = 0;
        gameTime = 0;
        cookies = [];
        score = 0;
        gameRunning = true;
        draw();
    }

    function updatePlayer() {
        plate.x = mouseX;
        plate.x = Math.max(
            plate.width / 2,
            Math.min(plate.x, canvas.width - plate.width / 2)
        );
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    function updateTime() {
        if (gameRunning) {
            gameTime++;
        }
    }

    draw();
    setInterval(updatePlayer, 1000 / 60);
}


function typingChallenge() {
    let words = ["مانانی", "فندق", "Five feets apart", "20"];
    console.log(words);

    let input = prompt("لقب مانی چیه؟: ");
    if (input === words[0]) {
        alert("Correct!");
        let input = prompt("لقب هستی چیه؟: ");
        if (input === words[1]) {
            alert('Correct!');
            let input = prompt("اولین فیلمی که باهم دیدیم: ");
            if (input === words[2]) {
                alert("Correct!");
                let input = prompt(`ما توی چند روز عاشق هم شدیم؟`);
                if (input === words[3]) {
                    alert(`MANI: \n niceeeee job babyyyyy you anwser them all :))))) ❤`)
                    unlockNextLevel();
                }
            }
        }
    }
}

let nextGamePlatfrom = document.getElementById('page')
function loveMaze() {
    alert('solve this maze with the 4 controls you have baby \n \n hope you got the easy one:))')
    makeMaze();
    nextGamePlatfrom.style.display = 'block'
}

function Coordinate(X, Y) {
    this.x = X;
    this.y = Y;
}

function rand(max) {
    return (Math.floor(Math.random() * max));
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function Maze(Width, Height) {
    var mazeMap;
    var width = Width;
    var height = Height;
    var startCoord, endCoord;
    var dirs = ["n", "s", "e", "w"];
    var modDir = {
        n: {
            y: -1,
            x: 0,
            o: "s"
        },
        s: {
            y: 1,
            x: 0,
            o: "n"
        },
        e: {
            y: 0,
            x: 1,
            o: "w"
        },
        w: {
            y: 0,
            x: -1,
            o: "e"
        }
    };

    this.map = function () {
        return mazeMap;
    };
    this.startCoord = function () {
        return startCoord;
    };
    this.endCoord = function () {
        return endCoord;
    };

    function genMap() {
        mazeMap = new Array(height);
        for (y = 0; y < height; y++) {
            mazeMap[y] = new Array(width);
            for (x = 0; x < width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }

    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = new Coordinate(0, 0); //this.endCoord;
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (index = 0; index < dirs.length; index++) {
                var direction = dirs[index];
                var nx = pos.x + modDir[direction].x;
                var ny = pos.y + modDir[direction].y;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    //Check if the tile is already visited
                    if (!mazeMap[nx][ny].visited) {
                        //Carve through walls from this tile to next
                        mazeMap[pos.x][pos.y][direction] = true;
                        mazeMap[nx][ny][modDir[direction].o] = true;

                        //Set Currentcell as next cells Prior visited
                        mazeMap[nx][ny].priorPos = pos;
                        //Update Cell position to newly visited location
                        pos = new Coordinate(nx, ny);

                        cellsVisited++;
                        //Recursively call this method on the next tile
                        move = true;
                        break;
                    }
                }
            }

            if (!move) {
                //If it failed to find a direction and didnt get back to the EndPoint, move the current position back to the prior cell and Recall the method.
                pos = mazeMap[pos.x][pos.y].priorPos;
            }
            if (numCells == cellsVisited) {
                isComp = true;
            }
        }
    }

    function defineStartEnd() {
        switch (rand(4)) {
            case 0:
                startCoord = new Coordinate(0, 0);
                endCoord = new Coordinate(height - 1, width - 1);
                break;
            case 1:
                startCoord = new Coordinate(0, width - 1);
                endCoord = new Coordinate(height - 1, 0);
                break;
            case 2:
                startCoord = new Coordinate(height - 1, 0);
                endCoord = new Coordinate(0, width - 1);
                break;
            case 3:
                startCoord = new Coordinate(height - 1, width - 1);
                endCoord = new Coordinate(0, 0);
                break;
        }
    }

    genMap();
    defineStartEnd();
    defineMaze();
}
function DrawMaze(Maze, ctx, cellsize) {
    var map = Maze.map();
    var cellSize = cellsize;

    this.redrawMaze = function (cellsize) {
        cellSize = cellsize;
        drawMap();
        drawEnd(Maze.endCoord());
    };


    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;
        ctx.lineWidth = cellSize / 50;

        if (cell.n === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);

            ctx.lineTo(x + cellSize, y);
            ctx.stroke();
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();
        }
    }

    function drawMap() {
        for (x = 0; x < map.length; x++) {
            for (y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEnd(coord) {
        var gridSize = 5;
        var offset = 7;

        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function clear() {
        var canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    clear();
    drawMap();
    drawEnd(Maze.endCoord());
}
function Player(maze, c, _cellsize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
        drawSprite = drawSpriteImg;
    }
    var player = this;
    var map = maze.map();
    var preCoord = new Coordinate(maze.startCoord().x, maze.startCoord().y);
    var cellSize = _cellsize;
    var halfCellSize = cellSize / 2;


    this.redrawPlayer = function (_cellsize) {
        cellSize = _cellsize;
        drawSpriteImg(preCoord);
    }

    function drawSpriteCircle(coord) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(
            (coord.x + 1) * cellSize - halfCellSize,
            (coord.y + 1) * cellSize - halfCellSize,
            halfCellSize - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function drawSpriteImg(coord) {
        ctx.drawImage(
            sprite,
            72,
            29,
            320,
            435,
            coord.x * cellSize + 4,
            coord.y * cellSize + 4,
            cellSize - 8,
            cellSize - 8
        );
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord) {
        ctx.clearRect(
            coord.x * cellSize + 1,
            coord.y * cellSize + 1,
            cellSize - 2,
            cellSize - 2
        );
    }

    function check(e) {
        var cell = map[preCoord.x][preCoord.y];
        var code = e.keyCode;
        moves++;
        switch (code) {
            case 65:
            case 37: // west
                if (cell.w == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x - 1, preCoord.y);
                    drawSprite(preCoord);
                }

                break;
            case 87:
            case 38: // north
                if (cell.n == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x, preCoord.y - 1);
                    drawSprite(preCoord);
                }
                break;
            case 68:
            case 39: // east
                if (cell.e == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x + 1, preCoord.y);
                    drawSprite(preCoord);
                }
                break;
            case 83:
            case 40: // south
                if (cell.s == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x, preCoord.y + 1);
                    drawSprite(preCoord);
                }
                break;
        }
    }

    this.bindKeyDown = function () {
        window.addEventListener("keydown", check, false);

        $("#mazeCanvas").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                console.log(direction)
                switch (direction) {
                    case "up":
                        check({
                            keyCode: 38
                        });
                        break;
                    case "down":
                        check({
                            keyCode: 40
                        })
                        break;
                    case "left":
                        check({
                            keyCode: 37
                        });
                        break;
                    case "right":
                        check({
                            keyCode: 39
                        });
                        break;
                }

            },
            threshold: 0
        });
        document.getElementById("up").addEventListener("click", () => check({ keyCode: 38 }));
        document.getElementById("down").addEventListener("click", () => check({ keyCode: 40 }));
        document.getElementById("left").addEventListener("click", () => check({ keyCode: 37 }));
        document.getElementById("right").addEventListener("click", () => check({ keyCode: 39 }));
    };

    this.unbindKeyDown = function () {
        window.removeEventListener("keydown", check, false);
        $("#mazeCanvas").swipe("destroy");
    };

    drawSprite(maze.startCoord());

    this.bindKeyDown();
}

var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var maze, draw, player;
var cellSize;
var difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function () {
    if (window.innerHeight < window.innerWidth) {
        ctx.canvas.width = window.innerHeight - (75 + (window.innerHeight / 100));
        ctx.canvas.height = window.innerHeight - (75 + (window.innerHeight / 100));
    }
    else {
        ctx.canvas.width = window.innerWidth - (75 + (window.innerWidth / 100));
        ctx.canvas.height = window.innerWidth - (75 + (window.innerWidth / 100));
    }
    cellSize = mazeCanvas.width / difficulty;
    defineSprite();
};

window.onresize = function (event) {
    if (window.innerHeight < window.innerWidth) {
        ctx.canvas.width = window.innerHeight - (75 + (window.innerHeight / 100));
        ctx.canvas.height = window.innerHeight - (75 + (window.innerHeight / 100));
    }
    else {
        ctx.canvas.width = window.innerWidth - (75 + (window.innerWidth / 100));
        ctx.canvas.height = window.innerWidth - (75 + (window.innerWidth / 100));
    }

    cellSize = mazeCanvas.width / difficulty;
    if (player != null) {
        draw.redrawMaze(cellSize);
        player.redrawPlayer(cellSize);
    }

};

function defineSprite() {
    var spr = new Image();
    var url = "https://78.media.tumblr.com/99dbdc2634a3695d60120eebe865a785/tumblr_onsimhGBbN1rgyab2o1_1280.png";
    spr.src = url + "?" + new Date().getTime();
    spr.setAttribute("crossOrigin", " ");
    spr.onload = function changeBritness() {

        var virtCanvas = document.createElement('canvas');
        virtCanvas.width = 500;
        virtCanvas.height = 500;
        var context = virtCanvas.getContext('2d');

        context.drawImage(spr, 0, 0, 500, 500);
        var imgData = context.getImageData(0, 0, 500, 500);

        var factor = 1.20;
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = imgData.data[i] * factor;
            imgData.data[i + 1] = imgData.data[i + 1] * factor;
            imgData.data[i + 2] = imgData.data[i + 2] * factor;
        }
        context.putImageData(imgData, 0, 0);

        sprite = new Image();
        sprite.src = virtCanvas.toDataURL();
    };
}



function makeMaze() {
    document.getElementById("mazeCanvas").classList.add("border");
    if (player != undefined) {
        player.unbindKeyDown();
    }
    difficulty = 10;
    cellSize = mazeCanvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);
    draw = new DrawMaze(maze, ctx, cellSize);
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess);//, sprite);
    if (document.getElementById("mazeContainer").style.opacity < "100") {
        document.getElementById("mazeContainer").style.opacity = "100";
    }
}

function displayVictoryMess(moves) {
    alert(`You Win In ${moves} Moves Baby Great Job :))))))))) ❤❤`);
    nextGamePlatfrom.remove();
    unlockNextLevel();
}

function getDifficulty() {
    var e = document.getElementById("diffSelect");
    return e.options[e.selectedIndex].value;
}

function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == "visible") {
        document.getElementById(id).style.visibility = "hidden";
    } else {
        document.getElementById(id).style.visibility = "visible";
    }
}

function clickerGame() {

    nextGamePlatfrom.remove();
    let clickerGameSec = document.getElementById('clickerGameSec')
    clickerGameSec.style.display = 'block'

    var winPos;
    window.scrollTo(15, 15);
    var flag = false;
    let counter = document.getElementById('counter')
    let lovepowerConatiner = document.querySelector('.lovepowerConatiner')
    let lovepower = document.getElementById('lovepower')
    let clickCounter = 100;

    document.addEventListener("click", function (e) {
        clickCounter++;
        counter.textContent = `Our Love Power is: ${clickCounter}`

        if (clickCounter === 121) {
            let messageShown = false; // کنترل نمایش پیام
            let shake; // ذخیره `setInterval` لرزش صفحه

            let interval = setInterval(() => {
                clickCounter += 12;

                console.log(clickCounter);
                counter.textContent = `Our Love Power is: ${clickCounter}`;
                lovepower.innerText = clickCounter;

                // لرزش صفحه فقط تا زمانی که مقدار کمتر از ۲۰۰۰۰ باشه
                if (!shake && clickCounter < 20000) {
                    let winPos = [document.body.scrollLeft, document.body.scrollTop];
                    let maxShakeOffset = 1;
                    shake = setInterval(() => {
                        let shakeOffset = Math.floor(Math.random() * 10 * maxShakeOffset);
                        window.scrollTo(winPos[0] - maxShakeOffset / 2 + shakeOffset, winPos[1] - maxShakeOffset / 2 + shakeOffset);
                    }, 2);
                }

                if (clickCounter >= 20000 && !messageShown) {
                    alert('Our love power increased every second, baby :)');
                    lovepowerConatiner.style.display = 'block';
                    clickerGameSec.remove();
                    flag = false;
                    unlockNextLevel();
                    messageShown = true; // جلوگیری از نمایش مجدد پیام

                    if (shake) { // اگر لرزش فعال باشه، متوقفش کن
                        clearInterval(shake);
                        shake = null;
                    }
                }

            }, 0.1); // شمارش همچنان ادامه داره
        }

        var div = document.createElement("div");
        div.classList.add('divEffect')

        document.querySelector("body").appendChild(div);
        div.style.left = e.pageX + "px";
        div.style.top = e.pageY + "px";
        var maxElems = 16;
        for (i = 0; i < maxElems; i++) {
            var span = document.createElement("span");
            span.classList.add('spanEffect')
            var newSpan = div.appendChild(span);
            var deg = i * (360 / maxElems) + Math.floor(Math.random() * 15);
            var height = 20 + Math.floor(Math.random() * 30);
            var width = 4 + Math.floor(Math.random() * 10);
            newSpan.style.height = height + "px";
            newSpan.style.width = width + "px";
            newSpan.style.transform = "rotate(" + deg + "deg)";
        }
        window.requestAnimationFrame(
            function () {
                Array.from(div.querySelectorAll("span")).forEach((el) => {
                    var trasY = -50 - Math.floor(Math.random() * 100);
                    el.style.transform += "scaleY(0.5) translateY(" + trasY + "px)";
                    el.style.opacity = "0";
                });
                window.setTimeout(function () {
                    document.body.removeChild(div);
                }, 400)
            }

        );
        if (!flag) {
            flag = true;
            winPos = [document.body.scrollLeft, document.body.scrollTop];
            var maxShakeOffset = 1;
            var shake = window.setInterval(function () {
                var shakeOffset = Math.floor(Math.random() * 10 * maxShakeOffset);
                window.scrollTo(winPos[0] - maxShakeOffset / 2 + shakeOffset, winPos[1] - maxShakeOffset / 2 + shakeOffset)
            }, 10);
            window.setTimeout(function () {
                window.clearInterval(shake);
                window.scrollTo(winPos[0], winPos[1]);
                flag = false;
            }, 200);
        }
    });
}

let timer_start, timer_game, timer_finish, timer_time, good_positions, wrong, right, speed, timerStart, positions;
let game_started = false;
let streak = 0;
let max_streak = 0;
let best_time = 99.999;

let mode = 'jewelry';
let mode_data = {};
mode_data['jewelry'] = [23, 6];

// Get max streak from cookie
const regex = /max-streak_thermite=([\d]+)/g;
let cookie = document.cookie;
if ((cookie = regex.exec(cookie)) !== null) {
    max_streak = cookie[1];
}
// Get max streak from cookie
const regex_time = /best-time_thermite=([\d.]+)/g;
cookie = document.cookie;
if ((cookie = regex_time.exec(cookie)) !== null) {
    best_time = parseFloat(cookie[1]);
}

const sleep = (ms, fn) => { return setTimeout(fn, ms) };

const range = (start, end, length = end - start + 1) => {
    return Array.from({ length }, (_, i) => start + i)
}

const gameShuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Options
document.querySelector('#speed').addEventListener('input', function (ev) {
    document.querySelector('.speed_value').innerHTML = ev.target.value + 's';
});
document.querySelectorAll('.game_mode .button').forEach(el => {
    el.addEventListener('click', function (ev) {
        let new_mode = ev.target.dataset.mode;
        if (new_mode !== mode) {
            let b = document.querySelector('body').classList;
            b.remove(mode);
            b.add(new_mode);
            document.querySelector('.game_mode .button.active').classList.remove('active');
            ev.target.classList.add('active');
            mode = 'jewelry';
            streak = 0;
            reset();
        }
    });
});

// Resets
document.querySelector('.btn_again').addEventListener('click', function () {
    streak = 0;
    reset();
});

function listener(ev) {
    if (!game_started) return;

    if (good_positions.indexOf(parseInt(ev.target.dataset.position)) === -1) {
        wrong++;
        ev.target.classList.add('bad');
    } else {
        right++;
        ev.target.classList.add('good');
    }

    ev.target.removeEventListener('mousedown', listener);

    check();
}

function addListeners() {
    document.querySelectorAll('.group').forEach(el => {
        el.addEventListener('mousedown', listener);
    });
}

function check() {
    if (wrong === 3) {
        resetTimer();
        game_started = false;
        streak = 0;

        let blocks = document.querySelectorAll('.group');
        good_positions.forEach(pos => {
            blocks[pos].classList.add('proper');
        });
        alert('try again')
        setTimeout(() => {
            streak = 0;
            reset();
        }, 1000);
        return;
    }
    if (right === mode_data[mode][1]) {
        stopTimer();
        streak++;
        if (streak > max_streak) {
            max_streak = streak;
            document.cookie = "max-streak_thermite=" + max_streak;
        }
        let time = 0;
        if (parseFloat(time) < best_time) {
            best_time = parseFloat(time);
            document.cookie = "best-time_thermite=" + best_time;
        }
        let leaderboard = new XMLHttpRequest();
        leaderboard.open("HEAD", 'streak.php?streak=' + streak + '&max_streak=' + max_streak
            + '&speed=' + speed + '&mode=' + mode + '&time=' + time);
        leaderboard.send();
        
        alert('You Cracked the data and gained your gift')
        endGames();
    }
}

function reset() {
    game_started = false;

    resetTimer();
    clearTimeout(timer_start);
    clearTimeout(timer_game);
    clearTimeout(timer_finish);

    document.querySelector('.splash').classList.remove('hidden');
    document.querySelector('.groups').classList.add('hidden');

    document.querySelectorAll('.group').forEach(el => { el.remove(); });

    start();
}

function start() {
    wrong = 0;
    right = 0;

    positions = range(0, mode_data[mode][0] - 1);
    gameShuffle(positions);
    good_positions = positions.slice(0, mode_data[mode][1]);

    let div = document.createElement('div');
    div.classList.add('group');
    const groups = document.querySelector('.groups');
    for (let i = 0; i < mode_data[mode][0]; i++) {
        let group = div.cloneNode();
        group.dataset.position = i.toString();
        groups.appendChild(group);
    }

    addListeners();

    timer_start = sleep(2000, function () {
        document.querySelector('.splash').classList.add('hidden');
        document.querySelector('.groups').classList.remove('hidden');

        let blocks = document.querySelectorAll('.group');
        good_positions.forEach(pos => {
            blocks[pos].classList.add('good');
        });

        timer_game = sleep(4000, function () {
            document.querySelectorAll('.group.good').forEach(el => { el.classList.remove('good') });
            game_started = true;

            startTimer();
            speed = 30;
            timer_finish = sleep((speed * 1000), function () {
                game_started = false;
                wrong = 3;
                check();
            });
        });
    });
}

function startTimer() {
    timerStart = new Date();
    timer_time = setInterval(timer, 1);
}
function timer() {
    let timerNow = new Date();
    let timerDiff = new Date();
    timerDiff.setTime(timerNow - timerStart);
    let ms = timerDiff.getMilliseconds();
    let sec = timerDiff.getSeconds();
    if (ms < 10) { ms = "00" + ms; } else if (ms < 100) { ms = "0" + ms; }
}
function stopTimer() {
    clearInterval(timer_time);
}
function resetTimer() {
    clearInterval(timer_time);
}

function breakTheIce() {
    let vault = document.querySelector('.vault')
    vault.style.display = 'block'
    start();
}

function endGames() {
    localStorage.setItem('endGameValue', true)
    confirm('great job baby you defeated the hacker now you can open your gift press ok')
    if(confirm) {
        location.replace('https://lilastrro.github.io/secretletter.github.io/')
    }
}
