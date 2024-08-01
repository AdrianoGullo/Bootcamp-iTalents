Bem-vindo ao "Atrás do ouro"! Este é um jogo interativo de fase onde você controla um personagem que deve coletar itens e desviar de obstáculos para pontuar e progredir nas fases.

## Descrição

Conforme o jogador avança pelas fases, a quantidade e a velocidade dos itens aumentam, tornando o jogo mais desafiador, o objetivo é conseguir a maior pontuação possível sem morrer e completar as 10 fases. Ao morrer, o jogo recomeça.

## Funcionalidades

- **Movimentação**: Use as setas do teclado para mover o personagem para a esquerda e para a direita.
- **Itens**: Coleta de itens como Meteorito, Bomba, Ouro, Vida e Energia, cada um com efeitos distintos.
- **Fases**: O jogo tem 10 fases com dificuldade crescente. A cada nova fase, a quantidade de itens gerados aumenta.
- **Pontuação e Vida**: A pontuação aumenta ao coletar Ouro e diminui ao colidir com Bombas. A Vida do personagem é afetada por Meteoritos e Bombas.

## Classes utilizadas

### `Item`
Classe base para todos os itens do jogo. Define o comportamento padrão dos itens.

- **Métodos**:
  - `cair()`: Faz o item cair na tela.
  - `desenhar(ctx)`: Desenha o item na tela.
  - `getCor()`: Retorna a cor do item (deve ser sobrescrito por subclasses).
  - `colisaoCom(personagem)`: Verifica colisão com o personagem.

### `Meteorito`
Subclasse de `Item` representando um meteorito.

- **Cor**: Cinza

### `Bomba`
Subclasse de `Item` representando uma bomba.

- **Cor**: Vermelha

### `Ouro`
Subclasse de `Item` representando uma moeda de ouro.

- **Cor**: Amarela

### `Vida`
Subclasse de `Item` representando um item de vida.

- **Cor**: Verde

### `Energia`
Subclasse de `Item` representando um item de energia.

- **Cor**: Azul

### `Personagem`
Classe que representa o personagem controlado pelo jogador.

- **Métodos**:
  - `mover(dir)`: Move o personagem para a esquerda ou para a direita.
  - `coletar(item)`: Coleta um item e aplica seus efeitos.
  - `verificarMorte()`: Verifica se o personagem morreu.

## Como Jogar

1. **Iniciar o Jogo**: Acesse a página inicial do jogo no seu navegador.
2. **Movimentação**: Use as setas do teclado para mover o personagem.
3. **Coletar Itens**: Tente coletar o máximo de Ouro e evitar Meteoritos e Bombas.
4. **Progredir nas Fases**: Complete cada fase para avançar para a próxima. A dificuldade aumenta conforme você avança.


## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/AdrianoGullo/Bootcamp-iTalents/tree/6f688f6ba659a2f08d6e091f5fe8c55bc93cf3ae/AtvFinal
   ```

2. Navegue para o diretório do projeto:
    ```bash
    cd AtvFinal
    ```

3. Execute o node e o servidor
    ```bash
    npm install
    node server.js
    ```