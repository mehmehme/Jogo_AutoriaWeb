const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d") ;

canvas.width = 2240; //largura canva
canvas.height = 1280; //altura canva

ctx.fillStyle = 'White'; //pinta o canva de branco
ctx.fillRect(0,0,canvas.width,canvas.height);// pinta o canva

const map = new Image();//cria a constante da imagem
map.src= './mapinha/mapa.png'//pega a imagem

map.onload =() => {//espera a imagem carregar
    ctx.drawImage(map,-2840,-800);//desenha a imagem na tela
}