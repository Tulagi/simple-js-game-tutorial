// 简单打砖块游戏 - 教程版本

// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏配置
const config = {
    paddleWidth: 100,
    paddleHeight: 15,
    ballRadius: 10,
    brickRows: 5,
    brickColumns: 10,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 30,
    brickOffsetLeft: 30
};

// 游戏状态
let gameState = {
    score: 0,
    lives: 3,
    gameRunning: false
};

// 游戏对象
const paddle = {
    x: (canvas.width - config.paddleWidth) / 2,
    y: canvas.height - config.paddleHeight - 10,
    width: config.paddleWidth,
    height: config.paddleHeight,
    dx: 8
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 4,
    dy: -4,
    radius: config.ballRadius
};

// 创建砖块数组
const bricks = [];
for(let c = 0; c < config.brickColumns; c++) {
    bricks[c] = [];
    for(let r = 0; r < config.brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// 输入处理
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // 空格键开始游戏
    if(e.key === ' ' && !gameState.gameRunning) {
        gameState.gameRunning = true;
        gameLoop();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 绘制函数
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c = 0; c < config.brickColumns; c++) {
        for(let r = 0; r < config.brickRows; r++) {
            if(bricks[c][r].status === 1) {
                const brickX = c * (config.brickWidth + config.brickPadding) + config.brickOffsetLeft;
                const brickY = r * (config.brickHeight + config.brickPadding) + config.brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                
                ctx.beginPath();
                ctx.rect(brickX, brickY, config.brickWidth, config.brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('分数: ' + gameState.score, 8, 20);
}

function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('生命: ' + gameState.lives, canvas.width - 65, 20);
}

// 碰撞检测
function collisionDetection() {
    for(let c = 0; c < config.brickColumns; c++) {
        for(let r = 0; r < config.brickRows; r++) {
            const b = bricks[c][r];
            if(b.status === 1) {
                if(ball.x > b.x && 
                   ball.x < b.x + config.brickWidth && 
                   ball.y > b.y && 
                   ball.y < b.y + config.brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    gameState.score++;
                    
                    // 检查是否赢得游戏
                    if(gameState.score === config.brickRows * config.brickColumns) {
                        alert('恭喜你赢得了游戏！🏆');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// 更新游戏逻辑
function update() {
    // 移动挡板
    if(keys['ArrowRight'] && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    }
    if(keys['ArrowLeft'] && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
    
    // 移动球
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // 墙壁碰撞
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if(ball.y + ball.dy > canvas.height - ball.radius) {
        // 底部碰撞检测
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            // 球击中挡板
            ball.dy = -ball.dy;
        } else {
            // 球未击中挡板
            gameState.lives--;
            if(!gameState.lives) {
                alert('游戏结束！');
                document.location.reload();
            } else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 4;
                ball.dy = -4;
                paddle.x = (canvas.width - paddle.width) / 2;
                gameState.gameRunning = false;
            }
        }
    }
    
    collisionDetection();
}

// 渲染函数
function render() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制游戏元素
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
}

// 主游戏循环
function gameLoop() {
    if(gameState.gameRunning) {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }
}

// 初始渲染
render();

// 显示开始提示
ctx.font = '20px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.fillText('按空格键开始游戏', canvas.width / 2, canvas.height / 2);