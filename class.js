//todas as classes 
class borda{//o bloco da borda, posicao, tamanho e cor
    static width = 80;
    static height = 80;// tamanho da largura e altura

    constructor (posicao){
        this.position = posicao;
        this.width = 80;
        this.height = 80;
    }
    draw(){
        ctx.fillStyle= 'Red';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}
