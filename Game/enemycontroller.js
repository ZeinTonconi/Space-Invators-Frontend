import Enemy from "./enemy.js";
import MovingDirection from "./MovingDirection.js";
import Movimientoenemigo from "./MovingDirection.js";
export default class enemycontroller {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ,2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    // defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    // fireBulletTimerDefault = 100;
    // fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas,enemybulletcontroller, balaDelJugador, balaDelGhost, powerUpController, defaultVelocity, fireBulletTimerDefault){
        this.canvas = canvas;
        this.enemybulletcontroller = enemybulletcontroller;
        this.balaDelJugador = balaDelJugador;
        this.balaDelGhost = balaDelGhost
        this.enemyDeathSound = new Audio ('../Sonido/enemydeath.mp3');
        this.enemyDeathSound.volume = 0.5;
        this.createEnemies();

        this.powerUpController=powerUpController
        
        this.defaultXVelocity = defaultVelocity;
        this.fireBulletTimerDefault = fireBulletTimerDefault;
        this.fireBulletTimer = fireBulletTimerDefault;
    }

    draw(ctx){
        this.decrementMoveDownTimer();
      this.updateVelocityAndDirection();
      this.collisiondetection();
      this.drawEnemies(ctx);
      this.resetMovedownTimer();
      this.fireBullet();
      //console.log(this.moveDownTimer);
    }

    eliminarEnemigo(enemy, enemyIndex, enemyRow){
        this.enemyDeathSound.currentTime = 0;
        this.enemyDeathSound.play();
        enemyRow.splice(enemyIndex,1);

        this.powerUpController.shoot(enemy.x, enemy.y, -3)
        console.log("Generando Power Up")

        let score = parseInt(document.getElementById("score").innerHTML);
        score += 500;
        document.getElementById("score").innerHTML = score;
    }

    collisiondetection(){
        this.enemyRows.forEach(enemyRow=>{
            enemyRow.forEach((enemy, enemyIndex)=>{
                if(this.balaDelJugador.collideWith(enemy)){
                    this.eliminarEnemigo(enemy,enemyIndex,enemyRow)
                }

                if(this.balaDelGhost.collideWith(enemy)){
                    this.eliminarEnemigo(enemy,enemyIndex,enemyRow)
                }                

            });
        });

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random()*allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemybulletcontroller.shoot(enemy.x,enemy.y,-3);
            console.log(enemyIndex);
        }
    }

    resetMovedownTimer(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        if(
            this.currentDirection === MovingDirection.downleft ||
            this.currentDirection === MovingDirection.downright
        )   {
             this.moveDownTimer--;

        }
    }

    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width>= this.canvas.width){
                    this.currentDirection = MovingDirection.downleft;
                    break;
                }
            } else if(this.currentDirection === MovingDirection.downleft){
              if(this.moveDown(MovingDirection.left)){
                break;
            }
        }else if(this.currentDirection === MovingDirection.left){
            this.xVelocity = -this.defaultXVelocity;
            this.yVelocity = 0;
            const leftMostEnemy = enemyRow[0];
            if (leftMostEnemy.x <= 0){
                this.currentDirection = MovingDirection.downright;
                break;
            }
        } else if(this.currentDirection === MovingDirection.downright){
          if (this.moveDown(MovingDirection.right)){
            break;
            }
        }
    }
}
moveDown(newDirection){
    this.xVelocity = 0; 
    this.yVelocity = this.defaultYVelocity;
    if(this.moveDownTimer <= 0){
        this.currentDirection = newDirection;
        return true;
    }
    return false;
}

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        });
    }

    createEnemies(){
        this.enemyMap.forEach((row, rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemynumber, enemyIndex)=>{
                if(enemynumber > 0){
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex*101, rowIndex*100, enemynumber)
                    );
                }

            })
        });
    }

    collideWith(sprite){
        return this.enemyRows.flat().some(enemy=>enemy.collideWith(sprite));
    }
}   