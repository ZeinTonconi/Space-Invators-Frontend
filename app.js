
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

canvas.width = 1754;
canvas.height = 1240;

const background = new Image();
background.src = "imagenes/portada.png";

const draw = () => {
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
}


document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        window.location.href = './Game/index.html?nivel=1'
    }
});

setInterval(draw,1000/60);