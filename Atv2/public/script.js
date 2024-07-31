let alunoAtual = null;

document.getElementById('adicionarAluno').addEventListener('click', function() {
    const nomeAluno = document.getElementById('alunoNome').value.trim();

    if (!nomeAluno || !/^[A-Za-z\s]+$/.test(nomeAluno)) {
        alert('O nome do aluno deve conter apenas letras e espaços.');
        return;
    }

    alunoAtual = nomeAluno;
    document.getElementById('bloco1').classList.add('hidden');
    document.getElementById('bloco2').classList.remove('hidden');
    document.getElementById('adicionarMateria').dataset.aluno = alunoAtual;
    document.getElementById('alunoNome').value = '';
});

document.getElementById('adicionarMateria').addEventListener('click', function() {
    const nomeMateria = document.getElementById('materiaNome').value.trim();
    const notasStr = document.getElementById('notas').value.trim();
    const faltas = parseInt(document.getElementById('faltas').value, 10);

    if (!nomeMateria || !/^[A-Za-z\s]+$/.test(nomeMateria)) {
        alert('O nome da matéria deve conter apenas letras e espaços.');
        return;
    }

    if (!/^\d+(\.\d+)?(,\s*\d+(\.\d+)?)*$/.test(notasStr)) {
        alert('As notas devem ser números separados por vírgulas.');
        return;
    }

    const notas = notasStr.split(',').map(nota => parseFloat(nota.trim()));
    if (notas.some(isNaN)) {
        alert('Todas as notas devem ser números válidos.');
        return;
    }

    if (isNaN(faltas) || faltas < 0) {
        alert('O número de faltas deve ser um número positivo.');
        return;
    }

    const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
    const status = faltas > 5 ? 'Reprovado por faltas' : (media < 7 ? 'Reprovado por nota' : 'Aprovado');

    let alunoContainer = document.querySelector(`.aluno-container[data-aluno="${alunoAtual}"]`);

    if (!alunoContainer) {
        alunoContainer = document.createElement('div');
        alunoContainer.className = 'aluno-container';
        alunoContainer.setAttribute('data-aluno', alunoAtual);

        const alunoTitulo = document.createElement('h2');
        alunoTitulo.textContent = `${alunoAtual}`;
        alunoContainer.appendChild(alunoTitulo);

        const materiasList = document.createElement('div');
        materiasList.className = 'materias-list';
        alunoContainer.appendChild(materiasList);

        document.getElementById('resultados').appendChild(alunoContainer);
    }

    const materiaContainer = document.createElement('div');
    materiaContainer.className = 'materia-container';

    materiaContainer.innerHTML = `
        <p><strong>${nomeMateria}</strong></p>
        <p>Notas: ${notas.join(', ')}</p>
        <p>Média: ${media.toFixed(2)}</p>
        <p>Faltas: ${faltas}</p>
        <p>Status: <u>${status}</u></p>
    `;

    alunoContainer.querySelector('.materias-list').appendChild(materiaContainer);

    // Limpa os campos do Bloco 2
    document.getElementById('materiaNome').value = '';
    document.getElementById('notas').value = '';
    document.getElementById('faltas').value = '';
});

document.getElementById('novoAluno').addEventListener('click', function() {
    // Limpa e oculta o Bloco 2, e mostra o Bloco 1 para novo aluno
    document.getElementById('bloco2').classList.add('hidden');
    document.getElementById('bloco1').classList.remove('hidden');

    // Limpa os campos do Bloco 2
    document.getElementById('materiaNome').value = '';
    document.getElementById('notas').value = '';
    document.getElementById('faltas').value = '';

    // Limpa a variável do aluno atual
    alunoAtual = null;
});
