// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {

        // Variables applied to each of our instances go here,
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
    }


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

    update(dt) {
        this.x += this.speed * dt * Math.floor(Math.random()*(20-10));
        if(this.x >= 500){
            this.x = 0;
        }
        checkCollisions(this);
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player{
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite="images/char-boy.png";
        this.score=0;

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    handleInput(keyPress){
        if(keyPress==='left'){
            if(this.x >= 20){
                this.x -= this.speed;
            }
        }

        if(keyPress==='right'){
            if(this.x <= 400){
                this.x += this.speed;
            }
        }

        if(keyPress==='up'){
            if(this.y >= 0){
                this.y -= this.speed;
            }

        }

        if(keyPress==='down'){
            if(this.y <= 400){
                this.y += this.speed;
            }
        }

    }

    reset() {
        player.x = 202.5;
        player.y = 383;

    }
}



function checkCollisions(anEnemy){
    let enemyBottom= anEnemy.y + 70;
    let enemyTop= anEnemy.y -70;
    let enemyLeft= anEnemy.x - 70;
    let enemyRight= anEnemy.x + 70;


    if(player.y>enemyTop && player.y < enemyBottom && player.x>enemyLeft && player.x<enemyRight){
        player.reset();
    }

    if(player.y<=13){
        player.reset();
        let highScore = document.querySelector('h2');
        player.score++;
        highScore.innerHTML=`SCORE: ${player.score}`;

    }


}




// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let enemy1 = new Enemy(0,50, 60);
let enemy2= new Enemy(0,220, 50);
let enemy3= new Enemy(0,150, 40);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player

player = new Player(202.5, 383, 50);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
