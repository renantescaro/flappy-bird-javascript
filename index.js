
var can = document.getElementById('canvas');

can.width = 1200;
can.height = 600;

var subir = false;

var altura = 0;

var ctx = can.getContext('2d');

var xBird = 150;
var yBird = can.height / 2;

var xCano = can.width;

var pontos = 0;

function draw(){
    
    if(subir == true){

        for(var i = 0; i < 10; i++){

            if( yBird > 0 ){

                yBird = yBird - 15;
                desenharBird();
            }
        }

        subir = false;
    }else{
        
        if( yBird >= can.height ){

            // alert('morreu');

            pontos = 0;

            yBird = can.height / 2;
            xCano = can.width;
        }else{

            yBird = yBird + 5;
            desenharBird();
        }
    }

    desenharCanos();

    var img1 = new Image();

    img1.onload = function () {

        ctx.drawImage(img1, 0, 0);

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, can.width, can.height);

    };

    img1.src = 'fundo.png';

    // Cima
    ctx.fillStyle = 'rgba(255,255,255,255)';
    ctx.fillRect(0, 0, can.width, 10);
    ctx.fill();

    // Baixo
    ctx.fillStyle = 'rgba(255,255,255,255)';
    ctx.fillRect(0, can.height -10, can.width, 10);
    ctx.fill();    

    // Fundo
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);

    requestAnimationFrame(draw);
}

draw();

function desenharCanos(){

    // novo cano
    if(xCano < 0){

        xCano = can.width;
        altura = Math.floor((Math.random() * 300) + 1);

        pontos = pontos + 10;
    }

    // colisao cano
    if( xCano == xBird && ( (yBird <= altura)  || (yBird >= (altura + 100)) ) ){

        xCano = can.width;
        altura = Math.floor((Math.random() * 300) + 1);

        pontos = 0;
    }

    // cima
    ctx.fillStyle = 'rgba(0,255,0,255)';
    ctx.fillRect(xCano, 0, 30, altura);
    ctx.fill();

    // baixo
    ctx.fillStyle = 'rgba(0,255,0,255)';
    ctx.fillRect(xCano, altura + 100, 30, 500);
    ctx.fill();

    // Pontos
    ctx.font = '48px serif';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(pontos, 500, 50);

    xCano = xCano - 5;
}

function desenharBird(){

    ctx.fillStyle = 'rgba(255,255,0,255)';
    ctx.fillRect(xBird, yBird, 20, 20);
    ctx.fill();
}


function keyPressed(evt){
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;

    return String.fromCharCode(key); 
}

document.onkeypress = function(evt){
    
    var str = keyPressed(evt);

    if(str == ' '){
        subir = true;
    }
};