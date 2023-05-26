import Bullet from "./Bullet.js";
export default class BulletController{

    bullets = [];
    timeTillNextBulletAllowed = 0;
    constructor(canvas,maxBulletsATime, bulletColor, soundEnab, imagenbala){
        this.canvas = canvas;
        this.maxBulletsATime = maxBulletsATime;
        this.bulletColor = bulletColor;
        this.soundEnab = soundEnab;

        this.shootSound = new Audio("Sonido/shoot.mp3");
        this.shootSound.volume = 0.3;
        this.imagenbala = imagenbala;

    }

    draw(ctx){
        this.bullets = this.bullets.filter((bullet => bullet.y + bullet.width >0 && bullet.y <= this.canvas.height)
            );
        //console.log(this.bullets.length);
        this.bullets.forEach((bullet)=>bullet.draw(ctx));
        if(this.timeTillNextBulletAllowed > 0){
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite){
        //const bulletThatHitSpriteIndex = this.bullets.findIndex(bullet=>{
            //bullet.collideWith(sprite)
            //console.log(bullet.collideWith(sprite))
        //});
        //if((sprite instanceof Enemy)&& this.bullets.length!=0){
            //console.log({sprite,bulletThatHitSpriteIndex})
           // console.log(this.bullets)
            
        //}  
        let bulletThatHitSpriteIndex = -1;
        for (let i = 0; i<this.bullets.length; i++){
            if(this.bullets[i].collideWith(sprite)){
                bulletThatHitSpriteIndex = i;
                break;
            }
        }
        //console.log(bulletThatHitSpriteIndex)     
        if(bulletThatHitSpriteIndex >= 0){
            this.bullets.splice(bulletThatHitSpriteIndex,1); 
            return true;
        }

        return false;
    }

    shoot(x,y,velocity,timeTillNextBulletAllowed = 0){
        if(
            this.timeTillNextBulletAllowed <=0 && 
            this.bullets.length < this.maxBulletsATime
        ){
            const bull = new Bullet(this.canvas,x,y,velocity,this.bulletColor,this.imagenbala);
            this.bullets.push(bull);
            if(this.soundEnab){
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}