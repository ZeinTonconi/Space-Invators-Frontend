import Bullet from "./Bullet.js";

export default class Ghost {
    constructor(imgGhost,canvas,velocity, bulletController){
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController

        this.x = 2*this.canvas.width/3
        this.y=this.canvas.height -200;
        this.width = 200;
        this.height = 200;
        this.image = new Image();
        this.image.src=`../imagenes/nave${imgGhost}.png`;
    }

    shoot(){
        console.log("Fantasma disparando")
        this.bulletController.shoot(this.x+this.width/2,this.y,4,10)
    
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height); 
    }

    move(direccion){
        this.x += this.velocity*direccion
    }

}