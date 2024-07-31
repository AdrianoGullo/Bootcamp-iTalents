class Item {
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

class Meteorito extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'meteorito';
    }

    getCor() {
        return 'gray';
    }
}

class Bomba extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'bomba';
    }

    getCor() {
        return 'red';
    }
}

class Ouro extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'ouro';
    }

    getCor() {
        return 'gold';
    }
}

class Vida extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'vida';
    }

    getCor() {
        return 'green';
    }
}

class Energia extends Item {
    constructor(x, y) {
        super(x, y);
        this.tipo = 'energia';
    }

    getCor() {
        return 'blue';
    }
}

class Personagem {
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

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const personagem = new Personagem(canvas.width / 2, canvas.height - 50);
const itens = [];
let faseAtual = 1;
let tempoFase = 60; // Tempo da fase em segundos
let tempoRestante = tempoFase; // Tempo restante para a fase atual
let faseTimer = null; // Timer para a fase atual
const fases = [
    { porcentagemItens: { meteorito: 0.2, bomba: 0.1, ouro: 0.6, vida: 0.1, energia: 0.0 }, velocidadeItens: 1, pontuacaoMinima: 50 },
    { porcentagemItens: { meteorito: 0.25, bomba: 0.15, ouro: 0.55, vida: 0.05, energia: 0.05 }, velocidadeItens: 0.9, pontuacaoMinima: 70 },
    { porcentagemItens: { meteorito: 0.3, bomba: 0.2, ouro: 0.45, vida: 0.05, energia: 0.1 }, velocidadeItens: 0.8, pontuacaoMinima: 90 },
    { porcentagemItens: { meteorito: 0.35, bomba: 0.25, ouro: 0.4, vida: 0.0, energia: 0.05 }, velocidadeItens: 0.7, pontuacaoMinima: 110 },
    { porcentagemItens: { meteorito: 0.4, bomba: 0.3, ouro: 0.3, vida: 0.0, energia: 0.1 }, velocidadeItens: 0.6, pontuacaoMinima: 130 },
    { porcentagemItens: { meteorito: 0.45, bomba: 0.35, ouro: 0.2, vida: 0.0, energia: 0.15 }, velocidadeItens: 0.5, pontuacaoMinima: 150 },
    { porcentagemItens: { meteorito: 0.5, bomba: 0.4, ouro: 0.1, vida: 0.0, energia: 0.2 }, velocidadeItens: 0.4, pontuacaoMinima: 170 },
    { porcentagemItens: { meteorito: 0.55, bomba: 0.4, ouro: 0.05, vida: 0.0, energia: 0.25 }, velocidadeItens: 0.3, pontuacaoMinima: 190 },
    { porcentagemItens: { meteorito: 0.6, bomba: 0.4, ouro: 0.0, vida: 0.0, energia: 0.3 }, velocidadeItens: 0.2, pontuacaoMinima: 210 },
    { porcentagemItens: { meteorito: 0.65, bomba: 0.4, ouro: 0.0, vida: 0.0, energia: 0.35 }, velocidadeItens: 0.1, pontuacaoMinima: 230 },
];

function gerarItem(tipo) {
    let x = Math.random() * (canvas.width - 50);
    let y = 0;
    if (tipo === 'meteorito') return new Meteorito(x, y);
    if (tipo === 'bomba') return new Bomba(x, y);
    if (tipo === 'ouro') return new Ouro(x, y);
    if (tipo === 'vida') return new Vida(x, y);
    if (tipo === 'energia') return new Energia(x, y);
}

function verificarColisao(personagem, item) {
    return item.colisaoCom(personagem);
}

function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar itens
    for (let item of itens) {
        item.cair();
        item.desenhar(ctx);
        if (verificarColisao(personagem, item)) {
            personagem.coletar(item);
            itens.splice(itens.indexOf(item), 1); // Remove o item da tela
        }
    }

    // Desenhar personagem
    ctx.fillStyle = 'black';
    ctx.fillRect(personagem.x, personagem.y, 50, 50);

    // Mostrar pontuação, vida, fase e tempo
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Pontuação: ${personagem.pontuacao}`, 10, 20);
    ctx.fillText(`Vida: ${personagem.vida}`, 10, 40);
    ctx.fillText(`Energia: ${personagem.energia}`, 10, 60);
    ctx.fillText(`Fase: ${faseAtual}`, canvas.width - 100, 20);
    ctx.fillText(`Tempo: ${tempoRestante}s`, canvas.width - 100, 40);

    // Verificar se o personagem morreu
    if (personagem.verificarMorte()) {
        alert('Você morreu! Reiniciando a fase...');
        iniciarFase(faseAtual);
        return;
    }

    if (tempoRestante <= 0) {
        clearInterval(faseTimer);
        mostrarOpcoes();
        return;
    }

    // Atualizar habilidades
    if (habilidades.imune.ativada) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Indica imunidade
        ctx.fillRect(personagem.x, personagem.y, 50, 50);
    }

    requestAnimationFrame(atualizarJogo);
}

function iniciarFase(fase) {
    faseAtual = fase;
    tempoRestante = tempoFase;
    if (faseTimer) clearInterval(faseTimer); // Limpa o timer anterior
    faseTimer = setInterval(() => {
        tempoRestante--;
        if (tempoRestante <= 0) clearInterval(faseTimer);
    }, 1000);

    // Limpa itens antigos
    itens.length = 0;

    // Ajusta a taxa de aparecimento de itens
    const { porcentagemItens, velocidadeItens } = fases[fase - 1];
    const taxaAparicao = 1000 / (velocidadeItens * fase); // Aumenta a taxa com o avanço das fases

    setInterval(() => {
        let rand = Math.random();
        if (rand < porcentagemItens.meteorito) itens.push(gerarItem('meteorito'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba) itens.push(gerarItem('bomba'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba + porcentagemItens.ouro) itens.push(gerarItem('ouro'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba + porcentagemItens.ouro + porcentagemItens.vida) itens.push(gerarItem('vida'));
        else itens.push(gerarItem('energia'));
    }, taxaAparicao);

    atualizarJogo();
}

function mostrarOpcoes() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Parabéns, você completou a fase ${faseAtual}.`, canvas.width / 2, canvas.height / 2 - 60);

    const opcoes = [
        { texto: 'Próxima Fase', acao: () => iniciarFase(faseAtual + 1) },
        { texto: 'Abrir Loja', acao: abrirLoja }
    ];

    opcoes.forEach((opcao, index) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 30 + index * 40, 200, 30);
        ctx.fillStyle = 'white';
        ctx.fillText(opcao.texto, canvas.width / 2, canvas.height / 2 - 10 + index * 40);

        canvas.addEventListener('click', (event) => {
            const x = event.clientX - canvas.getBoundingClientRect().left;
            const y = event.clientY - canvas.getBoundingClientRect().top;
            if (x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100 &&
                y >= canvas.height / 2 - 30 + index * 40 && y <= canvas.height / 2 - 30 + index * 40 + 30) {
                opcao.acao();
            }
        }, { once: true }); // Adiciona o listener de clique apenas uma vez
    });
}



// Definição de habilidades
const habilidades = {
    teleportar: { nome: 'Teleportar', custoEnergia: 1, ativada: false },
    imune: { nome: 'Imunidade', custoEnergia: 2, ativada: false },
    tempoExtra: { nome: 'Tempo Extra', custoEnergia: 3, ativada: false }
};

// Função para usar habilidades
function usarHabilidade(habilidade) {
    if (habilidades[habilidade].ativada && personagem.energia >= habilidades[habilidade].custoEnergia) {
        personagem.energia -= habilidades[habilidade].custoEnergia;
        switch (habilidade) {
            case 'teleportar':
                const direcao = teclado.direcao; // 'esquerda' ou 'direita'
                if (direcao === 'esquerda') personagem.x = 0;
                if (direcao === 'direita') personagem.x = canvas.width - 50;
                break;
            case 'imune':
                habilidades.imune.ativada = true;
                setTimeout(() => habilidades.imune.ativada = false, 15000); // Imunidade por 15 segundos
                break;
            case 'tempoExtra':
                tempoFase += 30; // Adiciona 30 segundos
                break;
        }
    }
}

// Função para abrir a loja
function abrirLoja() {
    const lojaContainer = document.createElement('div');
    lojaContainer.style.position = 'absolute';
    lojaContainer.style.top = '0';
    lojaContainer.style.left = '0';
    lojaContainer.style.width = '200px';
    lojaContainer.style.height = '100%';
    lojaContainer.style.backgroundColor = 'white';
    lojaContainer.style.zIndex = '1000';
    lojaContainer.style.padding = '10px';

    const habilidadesDiv = document.createElement('div');
    habilidadesDiv.innerHTML = `
        <h2>Loja</h2>
        ${Object.entries(habilidades).map(([key, habilidade]) => `
            <div>
                <p>${habilidade.nome}</p>
                <p>Custo de Energia: ${habilidade.custoEnergia}</p>
                <button onclick="comprarHabilidade('${key}')">Comprar</button>
            </div>
        `).join('')}
    `;

    lojaContainer.appendChild(habilidadesDiv);
    document.body.appendChild(lojaContainer);
}

// Função para comprar habilidade
function comprarHabilidade(habilidade) {
    usarHabilidade(habilidade);
    document.body.removeChild(document.querySelector('div')); // Remove a loja
}


// Iniciar a primeira fase
iniciarFase(faseAtual);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') personagem.mover('esquerda');
    if (event.key === 'ArrowRight') personagem.mover('direita');
});
