# Sistema Bancário em JavaScript

Este projeto é uma aplicação de sistema bancário simples desenvolvida em JavaScript com Node.js. A aplicação permite criar contas bancárias, realizar depósitos e saques, verificar saldos e visualizar todas as contas com seus saldos. Além disso, oferece a opção de calcular os juros de contas correntes e rendimentos de contas poupança.

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

- **`index.html`**: Arquivo HTML principal que contém a estrutura da interface de usuário.
- **`style.css`**: Arquivo CSS para estilizar a interface.
- **`script.js`**: Arquivo JavaScript que contém a lógica da aplicação.
- **`server.js`**: Arquivo Node.js para configurar e iniciar o servidor.
- **`README.md`**: Este arquivo.

## Funcionalidades

- **Criar Conta**: Permite criar uma nova conta bancária com um valor inicial e escolher entre Conta Normal, Conta Corrente ou Conta Poupança.
- **Sacar**: Permite realizar saques da conta especificada, com verificação de saldo.
- **Depositar**: Permite realizar depósitos na conta especificada.
- **Verificar Saldo**: Exibe o saldo atual de uma conta, considerando juros e rendimentos aplicados.
- **Visualizar Contas**: Mostra todas as contas e seus saldos.

## Como Utilizar

1. **Clone o Repositório**:

    Se você ainda não fez isso, clone o repositório onde o projeto está localizado:

    ```bash
    git clone https://github.com/AdrianoGullo/Bootcamp-iTalents/tree/f88262796c627141f663cf7520335825c83fa9be/Atv3
    ```

2. **Navegue para a Pasta do Projeto**:

    Vá até o diretório `Atv3` dentro da pasta `Bootcamp`:

    ```bash
    cd Bootcamp/Atv3
    ```

3. **Instale as Dependências**:

    Certifique-se de estar no diretório do projeto e instale as dependências necessárias:

    ```bash
    npm install
    ```

4. **Inicie o Servidor**:

    Execute o servidor Node.js para iniciar a aplicação:

    ```bash
    node server.js
    ```

5. **Acesse a Aplicação**:

    Abra o navegador e acesse `http://localhost:3000` (ou a porta configurada no seu servidor).

## Como Funciona

1. **Criar Conta**:
    - Insira o nome do titular.
    - Clique em "Criar Conta" e preencha o valor inicial e o tipo de conta.
    - As contas são armazenadas em uma lista e podem ser visualizadas posteriormente.

2. **Sacar**:
    - Insira o nome do titular e o valor a ser sacado.
    - O sistema verifica se o saldo é suficiente e realiza a operação.

3. **Depositar**:
    - Insira o nome do titular e o valor a ser depositado.
    - O valor é adicionado ao saldo da conta especificada.

4. **Verificar Saldo**:
    - Escolha a conta para verificar o saldo.
    - O saldo exibido considera os juros ou rendimentos aplicados.

5. **Visualizar Contas**:
    - Mostra todas as contas existentes e seus saldos atualizados.

## Exemplo de Uso

1. **Criar Conta**:

    - Nome do Titular: João
    - Valor Inicial: R$ 1000,00
    - Tipo de Conta: Corrente

2. **Sacar**:

    - Nome do Titular: João
    - Valor a Sacar: R$ 200,00

3. **Depositar**:

    - Nome do Titular: João
    - Valor a Depositar: R$ 500,00

4. **Verificar Saldo**:

    - Nome do Titular: João
    - Tipo de Conta: Corrente

5. **Visualizar Contas**:

    - Exibe todas as contas e saldos.

## Observações

- O valor inicial é o valor com o qual a conta começa. Os cálculos de juros e rendimentos são apresentados apenas para visualização.
