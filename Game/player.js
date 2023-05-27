
export default class player{

    ghostTimeActivated = 0;

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
    constructor(canvas,velocity, bulletController, ghost){
        this.canvas=canvas;
        this.velocity=velocity;
        this.bulletController=bulletController;

        this.x=this.canvas.width/2;
        this.y=this.canvas.height -200;
        this.width = 200;
        this.height = 200;
        this.image = new Image();
        this.image.src="../imagenes/naverj.png";

        this.ghost = ghost
        document.addEventListener("keydown",this.keydown);
        document.addEventListener("keyup", this.keyup);

    }


    draw(ctx){
        //console.log("dibujando jugador")
        if(this.shootPressed){
            //console.log("jugador disparando");
            this.bulletController.shoot(this.x+this.width/2,this.y,4,10)
            if(this.ghostTimeActivated){
                this.ghost.shoot()
                //this.bulletController.shoot(this.ghost.x+this.ghost.width/2, this.ghost.y,4,10);
            }
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);    
        if(this.ghostTimeActivated){
            this.ghost.draw(ctx);
            this.ghostTimeActivated--;
        }
    }

    collideWithWalls(){
        if(this.x < 0){
            this.x = 0;
            this.ghost.move(1);
        }

        if(this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
            this.ghost.move(-1);
        }
    }

    move(){
        if(this.rightPressed){
            this.x += this.velocity;
                this.ghost.move(1);
        }else if(this.leftPressed){
            this.x += -this.velocity;
            this.ghost.move(-1);
        
        }
    }

    keydown = (event) =>{
        if(event.code == "ArrowRight"){
            this.rightPressed = true;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = true;
        }
        if(event.code == "Space"){
            this.shootPressed = true;
        }
    };

    keyup = (event) =>{
        if(event.code == "ArrowRight"){
            this.rightPressed = false;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = false;
        }
        if(event.code == "Space"){
            this.shootPressed = false;
        }
    };


    ghostear(){
        this.ghostTimeActivated += 200;
    }

}