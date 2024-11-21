const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d") ;

canvas.width = 2240; //largura canva (em pixels)
canvas.height = 1280; //altura canva (em pixels)

const coliMap = [];//inicializa um array para armazenar o mapa de colisão
for(let i=0; i < colisao.length; i+= 70){// Aqui estamos organizando o mapa de colisão em linhas de 70 elementos
    coliMap.push(colisao.slice(i,70+i)); // coloca o map de colisao como array a cada 70 numeros
}



const bordas = []; // Array para armazenar os objetos de colisão (bordas)
const offset = {
    x: -2875,
    y: -1050
}

coliMap.forEach((row,i) =>{//cada linha sendo id I
    row.forEach((symbol,j) =>{// cada numero na linha, ou seja as colunas de id J
        if(symbol === 1025)//se o numero for de colisao
        bordas.push(
            new Borda({ // Adiciona uma borda (objeto de colisão) na posição correta
                position:{
                    x: j*Borda.width + offset.x,//coloca as colisoes no local certo e um do lado do outro
                    y: i*Borda.height + offset.y// assim cada uma tem seu x e y
            } 
        }));
    })
})

const map = new Image();// Carrega a imagem do mapa (o fundo principal)
map.src= './mapinha/mapa.png'// Caminho para a imagem do mapa

const foreImg = new Image();// Carrega a imagem do primeiro plano (foreground)
foreImg.src= './mapinha/mapaForeground.png'// Caminho para a imagem do foreground

const RunRight = new Image();// Carrega a imagem do personagem
RunRight.src = './personagem/RunRight.png'// Caminho para a imagem do personagem andando pra direita

const RunLeft = new Image();// Carrega a imagem do personagem
RunLeft.src = './personagem/RunLeft.png'// Caminho para a imagem do personagem andando pra direita

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 768 / 8 / 2 ,// Centraliza o personagem horizontalmente
        y: canvas.height / 2 - 84 / 2.5 // Centraliza o personagem verticalmente
    },
    image: RunRight,
    frames: {
        max: 8
    },
    
    sprites:{
        up: RunRight,
        right: RunRight,
        left: RunLeft,
        down: RunLeft
    }
})


const background = new Sprite({ // Cria um sprite para o fundo do jogo, com a imagem do mapa
    position: {
        x: offset.x, // Posição X do fundo
        y: offset.y // Posição Y do fundo
    },
    image: map // Imagem do fundo do mapa
})

const foreground = new Sprite({ // Cria um sprite para o primeiro plano (foreground)
    position: {
        x: offset.x, // Posição X do primeiro plano (a posição pode ser baseada em um deslocamento)
        y: offset.y, // Posição Y do primeiro plano
    },
    image: foreImg, // Imagem do primeiro plano
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const moveis = [background, ...bordas, foreground]

function rectangularCollision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // Colisão pela direita
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // Colisão pela esquerda
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // Colisão pela parte superior
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y // Colisão pela parte inferior
        )
}


function animate(){ // Função de animação, que será chamada em loop para atualizar o canvas
    window.requestAnimationFrame(animate) // Chama a função novamente (loop de animação)
    background.draw() // Desenha o fundo
    bordas.forEach(borda =>{
        borda.draw()


    })

    player.draw()
    foreground.draw()
    
    
let movendo = true
player.movendo = false
    if(keys.w.pressed && lastKey === 'w') {
        player.movendo = true
        player.image = player.sprites.up

        for(let i = 0; i < bordas.length; i++){
            const borda =  bordas[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                        x: borda.position.x,
                        y: borda.position.y + 3
                    }}
                })
            ) {
                movendo = false
                break;
            }
        }

        if(movendo)
        moveis.forEach((moveis) => {
            moveis.position.y += 5
        })

    }else if(keys.a.pressed && lastKey === 'a'){
        player.movendo = true
        player.image = player.sprites.left

        for(let i = 0; i < bordas.length; i++){
            const borda =  bordas[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                        x: borda.position.x + 3,
                        y: borda.position.y
                    }}
                })
            ) {
                movendo = false
                break;
            }
        }

        if(movendo)
        moveis.forEach((moveis) => {
            moveis.position.x += 5
        })
    }else if(keys.s.pressed && lastKey === 's'){
        player.movendo = true
        player.image = player.sprites.down

        for(let i = 0; i < bordas.length; i++){
            const borda =  bordas[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                        x: borda.position.x,
                        y: borda.position.y - 3
                    }}
                })
            ) {
                movendo = false
                break;
            }
        }

        if(movendo)
        moveis.forEach((moveis) => {
            moveis.position.y -= 5
        })
    }else if(keys.d.pressed && lastKey === 'd'){
        player.movendo = true
        player.image = player.sprites.right

        for(let i = 0; i < bordas.length; i++){
            const borda =  bordas[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                        x: borda.position.x - 3,
                        y: borda.position.y
                    }}
                })
            ) {
                movendo = false
                break;
            }
        }

        if(movendo)
        moveis.forEach((moveis) => {
            moveis.position.x -= 5
        })
    }
}

animate() // Chama a função de animação para iniciar o loop de renderização


let lastKey = ''
window.addEventListener('keydown', (e) => { // Detecta quando uma tecla é pressionada e executa ações baseadas na tecla
    switch(e.key){ // Dependendo da tecla pressionada, executa uma ação
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;    
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
    }
})

window.addEventListener('keyup', (e) => { // Detecta quando uma tecla é pressionada e executa ações baseadas na tecla
    switch(e.key){ // Dependendo da tecla pressionada, executa uma ação
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;    
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
    }
})


