const canvas = document.getElementById("myCanvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ctx = canvas.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5 ;
let ground_width = 150;
let brickArray = [];
let count = 0;

// min, max
// 100, 500
function getRandomArbitray(min, max) {
    return min + Math.floor(Math.random() * (max - min));   // 輸出介於100~500之間的數字
}

// 設定磚塊
class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        brickArray.push(this);
        this.visible = true;
    }

    drawBrick() {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    touchBall(ballX, ballY) {
        return (
            ballX >= this.x - radius &&
            ballX <= this.x + this.width + radius &&
            ballY >= this.y - radius &&
            ballY <= this.y + this.height + radius
        );     
    }
}

// 製作所有磚塊
for (let i = 0; i < 10; i++) {
    new Brick(getRandomArbitray(0, 950), getRandomArbitray(0, 550)); i
}


canvas.addEventListener("mousemove", (e) => {
    ground_x = e.clientX;
})

function drawCircle () {
    // 確認球是否打到磚塊
    brickArray.forEach((brick) => {
        if (brick.visible && brick.touchBall(circle_x, circle_y)) {
            // 改變x,y方向速度，並且將brick從brick array移除
            // 從下方撞擊

            count++;
            brick.visible = false;

            if (circle_y >= brick.y + brick.height) {
                ySpeed *= -1;
    
            // 從上方撞擊
            } else if (circle_y <= brick.y) {
                ySpeed *= -1;
            }
            // 從左方撞擊
            else if (circle_x <= brick.x) {
                xSpeed *= -1;
    
            // 從右方撞擊
            } else if (circle_x >= brick.x + brick.width) {
                xSpeed *= -1;
            }      
            
            // brickArray.splice(index, 1);  // 時間複雜度 O(n)
            if (count == 10) {
                alert("遊戲結束");
                clearInterval(game);
            }
        }
    })

    // 確認是否打到橘色底板
    if (circle_x >= ground_x - radius && 
        circle_x <= ground_x + radius + 200 && 
        circle_y >= ground_y - radius && 
        circle_y <= ground_y + radius
    ) {
        if (ySpeed > 0) {
            circle_y -= 40;   // 值不能設太小(不然可能一樣<= or >= circle_y)
        } else {
            circle_y += 40;
        }
        ySpeed *= -1; // 有可能 *= -1之後還是在地板的邊界內，球可能會在地板間震動
    }

    // 確認球是否打到邊界 
    // 確認右邊邊界
    if (circle_x >= canvasWidth - radius) {
        xSpeed *= -1;
    // 確認左邊邊界
    } else if (circle_x <= radius) {
        xSpeed *= -1;
    // 確認上邊邊界
    } else if (circle_y <= radius) {
        ySpeed *= -1;
    } else if (circle_y >= canvasHeight - radius) {
        ySpeed *= -1;
    }

    // 更動圓的座標
    circle_x += xSpeed;
    circle_y += ySpeed;

    // 畫出黑色背景
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 畫出所有磚塊
    brickArray.forEach((brick) => {
        if (brick.visible) {
            brick.drawBrick();
        }
    });

    // 畫出可控制地板
    ctx.fillStyle = "orange";
    ctx.fillRect(ground_x, ground_y, ground_width, ground_height);

    
    // 畫出圓球
    ctx.beginPath();
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();

    

}


function drawGround () {

    ctx.beginPath();
    ctx(ground_x, ground_y, ground_width, ground_height);
    ctx.stroke();
    ctx.fillStyle = "orange";
    ctx.fill()
}


let game = setInterval(drawCircle, 25);
