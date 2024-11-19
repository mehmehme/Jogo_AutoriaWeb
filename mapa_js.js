const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d") ;

canvas.width = 2240; //largura canva
canvas.height = 1280; //altura canva

const coliMap = [];

for(let i=0; i < colisao.length; i+= 70){
    coliMap.push(colisao.slice(i,70+i)); // coloca o map de colisao como array a cada 70 numeros
}

const bordas = [];

coliMap.forEach((row,i) =>{//cada linha sendo id I
    row.forEach((symbol,j) =>{// cada numero na linha, ou seja as colunas de id J
        if(symbol === 73 || symbol === 45 || symbol === 65 || symbol == 53)//se o numero for de colisao
        bordas.push(new borda({
            posicao:{
                x: j*borda.width,//coloca as colisoes no local certo e um do lado do outro
                y: i*borda.height,// assim cada uma tem seu x e y
            } 
        }));
    })
})

const map = new Image();//cria a constante da imagem
map.src= './mapinha/mapa.png'//pega a imagem

const foreImg = new Image();//cria a constante da imagem
foreImg.src= './mapinha/mapaForeground.png'//pega a imagem

map.onload =() => {//espera a imagem carregar
    ctx.drawImage(map,-2840,-800);//desenha a imagem na tela nas coordenadas do castelo
}

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foreImg,
})