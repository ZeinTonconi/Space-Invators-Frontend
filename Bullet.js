export default class Bullet{
    img = new Image ();
    constructor(canvas,x,y,velocity,bulletColor,nombreimagen){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 50;
        this.height = 50;

        this.img.src = nombreimagen;
        
    }


    draw(ctx){
        this.y -= this.velocity;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        //ctx.fillStyle = this.bulletColor;
        //ctx.fillRect(this.x,this.y,this.width, this.height);
    }

    collideWith(sprite){
        //console.log("this:" ,this.x,this.width,this.y,this.height)
        //console.log("sprite:" ,sprite.x,sprite.width,sprite.y,sprite.height)
        if(this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
        ){
         return true;
        }else{
         return false;    
        }
    }
    

}