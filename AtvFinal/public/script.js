const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const personagem = new Personagem(canvas.width / 2, canvas.height - 50);
const itens = [];
let faseAtual = 1;
let tempoFase = 60; // Tempo da fase em segundos
let tempoRestante = tempoFase; // Tempo restante para a fase atual
let faseTimer = null; // Timer para a fase atual
let recorde = 0;

// Fases do jogo e a probabilidade de cada item cair.
const fases = [
    { porcentagemItens: { meteorito: 0.2, bomba: 0.1, ouro: 0.6, vida: 0.1}, velocidadeItens: 1 },
    { porcentagemItens: { meteorito: 0.25, bomba: 0.15, ouro: 0.55, vida: 0.05}, velocidadeItens: 0.9 },
    { porcentagemItens: { meteorito: 0.3, bomba: 0.2, ouro: 0.45, vida: 0.05}, velocidadeItens: 0.8 },
    { porcentagemItens: { meteorito: 0.35, bomba: 0.25, ouro: 0.4, vida: 0.0}, velocidadeItens: 0.8 },
    { porcentagemItens: { meteorito: 0.4, bomba: 0.3, ouro: 0.3, vida: 0.1}, velocidadeItens: 0.7 },
    { porcentagemItens: { meteorito: 0.45, bomba: 0.35, ouro: 0.2, vida: 0.1}, velocidadeItens: 0.7 },
    { porcentagemItens: { meteorito: 0.5, bomba: 0.4, ouro: 0.1, vida: 0.2}, velocidadeItens: 0.7 },
    { porcentagemItens: { meteorito: 0.50, bomba: 0.4, ouro: 0.05, vida: 0.1}, velocidadeItens: 0.7 },
    { porcentagemItens: { meteorito: 0.6, bomba: 0.4, ouro: 0.0, vida: 0.0}, velocidadeItens: 0.7 },
    { porcentagemItens: { meteorito: 0.65, bomba: 0.4, ouro: 0.0, vida: 0.0}, velocidadeItens: 0.7 },
];

// Função para gerar os itens
function gerarItem(tipo) {
    let x = Math.random() * (canvas.width - 50);
    let y = 0;
    if (tipo === 'meteorito') return new Meteorito(x, y);
    if (tipo === 'bomba') return new Bomba(x, y);
    if (tipo === 'ouro') return new Ouro(x, y);
    if (tipo === 'vida') return new Vida(x, y);
}

// Função para verificar se o item colide com o personagem
function verificarColisao(personagem, item) {
    return item.colisaoCom(personagem);
}


const larguraMaxima = canvas.width - 10;
// Função para atualização do frame do jogo
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
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';

    ajustarTexto(ctx, `Pontuação: ${personagem.pontuacao}`, 10, 20, larguraMaxima);
    ajustarTexto(ctx, `Vida: ${personagem.vida}`, 10, 40, larguraMaxima);
    ajustarTexto(ctx, `Fase: ${faseAtual}`, canvas.width - 100, 20, canvas.width);
    ajustarTexto(ctx, `Tempo: ${tempoRestante}s`, canvas.width - 100, 40, canvas.width);

    // Verificar se o personagem morreu
    if (personagem.verificarMorte()) {
        mostrarMenuMorte(); // Mostrar o menu de morte
        return;
    }
    if (tempoRestante <= 0) {
        clearInterval(faseTimer);
        mostrarOpcoes();
        return;
    }
    requestAnimationFrame(atualizarJogo);
}

function ajustarTexto(ctx, texto, x, y, larguraMaxima) {
    const medida = ctx.measureText(texto).width;
    if (x + medida > larguraMaxima) {
        x = larguraMaxima - medida; // Ajusta a posição se o texto exceder o limite
    }
    ctx.fillText(texto, x, y);
}

function iniciarFase(fase) {
    faseAtual = fase;
    tempoRestante = tempoFase;
    if (faseTimer) clearInterval(faseTimer);
    faseTimer = setInterval(() => {
        tempoRestante--;
        if (tempoRestante <= 0) clearInterval(faseTimer);
    }, 1000);

    itens.length = 0;

    const { porcentagemItens, velocidadeItens } = fases[fase - 1];
    const multiplicadorItens = 1 + (fase - 1) * 0.1;
    const taxaAparicao = 1000 / (velocidadeItens * multiplicadorItens);

    setInterval(() => {
        let rand = Math.random();
        if (rand < porcentagemItens.meteorito) itens.push(gerarItem('meteorito'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba) itens.push(gerarItem('bomba'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba + porcentagemItens.ouro) itens.push(gerarItem('ouro'));
        else if (rand < porcentagemItens.meteorito + porcentagemItens.bomba + porcentagemItens.ouro + porcentagemItens.vida) itens.push(gerarItem('vida'));
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
    ctx.fillText(`Pontuação: ${personagem.pontuacao}`, canvas.width / 2, canvas.height / 2 - 30);

    const opcoes = [
        { texto: 'Próxima Fase', acao: () => iniciarFase(faseAtual + 1) }
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

function mostrarMenuMorte() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Você morreu!', canvas.width / 2, canvas.height / 2 - 60);
    ctx.fillText(`Pontuação: ${personagem.pontuacao}`, canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText('Atualize a página para recomeçar', canvas.width / 2, canvas.height / 2 + 60);
}

// Iniciar a primeira fase
iniciarFase(faseAtual);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') personagem.mover('esquerda');
    if (event.key === 'ArrowRight') personagem.mover('direita');
    if (event.key === 'q' || event.key === 'Q') {
        if (personagem.energia > 0) {
            personagem.energia -= 1;
            console.log(`Energia atual: ${personagem.energia}`);
        } else {
            console.log('Sem energia suficiente para usar a habilidade.');
        }
    }
});
