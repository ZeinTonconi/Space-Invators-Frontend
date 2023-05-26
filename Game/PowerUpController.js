import PowerUp from "./PowerUp.js";
export default class PowerUpController{

    typesPowerUps = ['linea','aleatorio','nave'];
    imgPowerUps = ['bonuslinea.png', 'bonusaleatorio.png', 'bonusnave.png']
    scorePowerUps = [50,100,0];

    powerUps = [];

    constructor(canvas, soundEnab, enemyController){
        this.canvas = canvas;
        // this.soundEnab = soundEnab;

        // this.shootSound = new Audio("Sonido/shoot.mp3");
        // this.shootSound.volume = 0.3;

    }

    setEnemyController(enemyController){
        this.enemyController = enemyController;
    }

    draw(ctx){
        this.powerUps = this.powerUps.filter((powerUp => powerUp.y + powerUp.width >0 && powerUp.y <= this.canvas.height)
            );
        
        this.powerUps.forEach((powerUp)=>powerUp.draw(ctx));
    }

    collideWith(sprite){

        let powerUpThatHitSpriteIndex = -1;
        for (let i = 0; i<this.powerUps.length; i++){
            if(this.powerUps[i].collideWith(sprite)){
                powerUpThatHitSpriteIndex = i;
                break;
            }
        }

        if(powerUpThatHitSpriteIndex >= 0){
            if(this.powerUps[powerUpThatHitSpriteIndex].type == 'linea'){
                this.enemyController.enemyRows.pop();
            }
            
            if(this.powerUps[powerUpThatHitSpriteIndex].type == 'aleatorio'){
                
                for(let i=0;i<5;i++){
                    const row = Math.floor(Math.random()*this.enemyController.enemyRows.length);
                    const col = Math.floor(Math.random()*this.enemyController.enemyRows[row].length);
                    console.log({row,col})
                    this.enemyController.enemyRows[row].splice(col,1);       
                }
                this.enemyController.enemyRows = this.enemyController.enemyRows.filter((enemyRow) => enemyRow.length > 0);

            }


            let score = parseInt(document.getElementById("score").innerHTML);
            score += this.scorePowerUps[powerUpThatHitSpriteIndex];
            document.getElementById("score").innerHTML = score;

            this.powerUps.splice(powerUpThatHitSpriteIndex,1);    
            
        
        }



    }

    shoot(x,y,velocity){
    
        if(Math.random() >= 0.75){
            const powerUpIndex = 1//Math.floor(Math.random() * 3);
            const powerUp = new PowerUp(this.canvas,x,y,velocity,`../imagenes/${this.imgPowerUps[powerUpIndex]}`,this.typesPowerUps[powerUpIndex]);
            this.powerUps.push(powerUp);
        }
        // if(this.soundEnab){
        //     this.shootSound.currentTime = 0;
        //     this.shootSound.play();
        // }
        // this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
}