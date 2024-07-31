# Gestão de Notas

Este projeto é uma aplicação web para gerenciar notas de alunos e matérias. A aplicação permite adicionar alunos, registrar matérias e acompanhar as notas e faltas dos alunos. A interface é responsiva e valida as entradas para garantir a integridade dos dados.

## Funcionalidades

- **Adicionar Aluno**: Permite inserir o nome de um novo aluno.
- **Adicionar Matéria**: Após adicionar um aluno, é possível adicionar matérias com notas e faltas.
- **Visualizar Resultados**: Exibe uma lista de alunos com suas respectivas matérias, notas, médias e status de aprovação.

## Requisitos

- Node.js (recomendado versão 14.x ou superior)
- npm (ou yarn) para gerenciar pacotes

## Estrutura do Projeto

- `index.html`: Arquivo principal HTML que define a estrutura da página.
- `styles.css`: Folha de estilos para o layout e aparência da aplicação.
- `script.js`: Arquivo JavaScript que gerencia a lógica da aplicação e manipulação do DOM.
- `server.js`: Servidor Node.js para servir os arquivos estáticos e gerenciar a aplicação.

## Instalação e Execução

1. **Clone o Repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>

2. **Navegue até a pasta**

cd nome-do-repositorio

3. **Instale as dependências**

Se você ainda não tem o server.js, você pode criar um arquivo package.json e instalar o express para servir os arquivos estáticos:

    ```bash
    npm init -y
    npm install express
    ```

4.  **Inicie o Servidor**
    ```bash
    node server.js
    ```

5. **Acesse o local da página**
Abra um navegador e vá para http://localhost:3000 para visualizar e interagir com a aplicação.