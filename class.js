class Sprite { // Classe para criar sprites (objetos com imagem e posição)
    constructor({position, velocity, image, frames = {max: 1}, sprites}){
        this.position = position // Posição do sprite no canvas
        this.image = image // Imagem que será desenhada
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.movendo = false
        this.sprites = sprites
    }

    draw(){ // Método para desenhar o sprite no canvas

        ctx.drawImage(
            this.image, // A imagem do personagem
            this.frames.val * this.width, // A posição inicial no eixo X para cortar a imagem(width)
            0, // A posição inicial no eixo Y para cortar a imagem(height)
            this.image.width / this.frames.max, // Largura do corte da imagem (usando 1/6 da largura da imagem)
            this.image.height, // Altura do corte da imagem
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, // Largura da imagem cortada
            this.image.height, // Altura da imagem cortada
        )

        if(!this.movendo) return

        if(this.frames.max > 1){
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 3 === 0)
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        
    }
}

class Borda {
    static width = 80   
    static height = 80
    constructor({position}){
        this.position = position
        this.width = 80
        this.height = 80
    }

    draw() {
        ctx.fillStyle = 'rgba(255,0,0, 0.5)' // aumentar o 0.0 pra ver colisões
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}       