// classes.js

export class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    cair() {
        this.y += 2.5; // Diminuir pela metade a velocidade de queda dos objetos
    }

    desenhar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 25, 0, 2 * Math.PI);
        ctx.fillStyle = this.getCor();
        ctx.fill();
        ctx.closePath();
    }

    getCor() {
        return 'black'; // Default color, should be overridden
    }

    colisaoCom(personagem) {
        const distancia = Math.hypot(personagem.x + 25 - this.x - 25, personagem.y + 25 - this.y - 25);
        return distancia < 50; // 50 é o raio do círculo
    }
}

export class Meteorito extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'meteorito';
    }

    getCor() {
        return 'gray';
    }
}

export class Bomba extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'bomba';
    }

    getCor() {
        return 'red';
    }
}

export class Ouro extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'ouro';
    }

    getCor() {
        return 'gold';
    }
}

export class Vida extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'vida';
    }

    getCor() {
        return 'green';
    }
}

export class Energia extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'energia';
    }

    getCor() {
        return 'blue';
    }
}

export class Personagem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vida = 100;
        this.pontuacao = 0;
        this.energia = 0;
        this.velocidade = 40; // Dobrar a velocidade do jogador
    }

    mover(dir) {
        if (dir === 'esquerda') this.x = Math.max(0, this.x - this.velocidade);
        if (dir === 'direita') this.x = Math.min(canvas.width - 50, this.x + this.velocidade);
    }

    coletar(item) {
        if (item.tipo === 'ouro') this.pontuacao += 10;
        if (item.tipo === 'vida') this.vida = Math.min(this.vida + 50, 100);
        if (item.tipo === 'energia') this.energia += 1;
        if (item.tipo === 'meteorito') this.vida -= 20;
        if (item.tipo === 'bomba') this.vida -= 30;
    }

    verificarMorte() {
        return this.vida <= 0;
    }
}
