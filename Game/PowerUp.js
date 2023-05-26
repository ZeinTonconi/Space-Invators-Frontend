

export default class PowerUp{
    img = new Image ();
    constructor(canvas,x,y,velocity,nombreimagen, type){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.width = 50;
        this.height = 50;

        this.img.src = nombreimagen;
        this.type = type;
    }


    draw(ctx){
        this.y -= this.velocity;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

    collideWith(sprite){
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