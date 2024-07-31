# Gestão de Notas

Este projeto é uma aplicação web para gerenciar notas de alunos e matérias. A aplicação permite adicionar alunos, registrar matérias e acompanhar as notas e faltas dos alunos. A interface é responsiva e valida as entradas para garantir a integridade dos dados.

## Funcionalidades

- **Adicionar Aluno**: Permite inserir o nome de um novo aluno.
- **Adicionar Matéria**: Após adicionar um aluno, é possível adicionar matérias com notas e faltas.
- **Visualizar Resultados**: Exibe uma lista de alunos com suas respectivas matérias, notas, médias e status de aprovação.

## Estrutura do Projeto

- `index.html`: Arquivo principal HTML que define a estrutura da página.
- `styles.css`: Folha de estilos para o layout e aparência da aplicação.
- `script.js`: Arquivo JavaScript que gerencia a lógica da aplicação e manipulação do DOM.

## Como Usar

1. **Adicionar um Aluno**:
   - Insira o nome do aluno no campo "Nome do Aluno" e clique em "Adicionar Aluno".
   - O formulário para adicionar matérias será exibido.

2. **Adicionar uma Matéria**:
   - Preencha o nome da matéria, as notas (separadas por vírgula) e o número de faltas.
   - Clique em "Adicionar Matéria" para adicionar a matéria ao aluno atual.
   - Use o botão "Adicionar Novo Aluno" para adicionar um novo aluno e suas matérias.

## Requisitos

- O projeto deve ser servido em um ambiente web que suporte HTML, CSS e JavaScript.

## Validações

- **Nome do Aluno e Nome da Matéria**: Apenas letras e espaços são permitidos.
- **Notas**: Devem ser números válidos separados por vírgulas.
- **Faltas**: Devem ser números positivos.

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/AdrianoGullo/Bootcamp-iTalents/tree/f88262796c627141f663cf7520335825c83fa9be/Atv2
