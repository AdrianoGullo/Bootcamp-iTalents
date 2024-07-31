// Calculo do IMC (peso em KG, altura em CM)
function calcularIMC(peso, altura) {
    if (altura > 3) {
        altura = altura / 100;
    }

    let imc = peso / (altura * altura);

    let classificacao;
    let explicacao;
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        explicacao = 'O IMC abaixo de <u>18.5</u> pode indicar desnutrição ou condições médicas que afetam o peso.<br> Consulte um profissional de saúde para avaliar sua dieta e saúde geral.';
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacao = 'Peso normal';
        explicacao = 'O IMC entre <u>18.5 e 24.9</u> é considerado dentro da faixa normal.<br> Manter um estilo de vida equilibrado é importante para a saúde geral.';
    } else if (imc >= 25 && imc < 29.9) {
        classificacao = 'Sobrepeso';
        explicacao = 'O IMC entre <u>25 e 29.9</u> indica sobrepeso. <br> Pode ser benéfico revisar sua dieta e aumentar sua atividade física para reduzir o risco de doenças relacionadas ao peso.';
    } else {
        classificacao = 'Obesidade';
        explicacao = 'O IMC acima de <u>30</u> é considerado obesidade. <br> É importante buscar orientação médica para discutir estratégias de perda de peso e avaliação de saúde.';
    }

    return `Seu IMC é <strong>${imc.toFixed(2)}</strong>. <br>${classificacao} <br>${explicacao}`;
}

function limparTagsHTML(texto) {
    return texto.replace(/<[^>]*>/g, '');
}

// Obter informações do formulário e passar resposta pro bloco de resultados
document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultado = calcularIMC(peso, altura);
    document.getElementById('explicacao').innerHTML = resultado.split('<br>').join('<br>'); 
});

// Testes
function testarCalculoIMC() {
    const testes = [
        { peso: 55, altura: 1.55 },   // Abaixo do peso
        { peso: 50, altura: 1.75 },   // Abaixo do peso
        { peso: 70, altura: 1.75 },   // Peso normal
        { peso: 60, altura: 1.6 },    // Peso normal
        { peso: 90, altura: 1.75 },   // Sobrepeso
        { peso: 80, altura: 1.6 },    // Sobrepeso
        { peso: 110, altura: 1.75 },  // Obesidade
        { peso: 100, altura: 1.6 },   // Obesidade
        { peso: 95, altura: 1.55 }    // Obesidade
    ];

    testes.forEach((test, index) => {
        const { peso, altura } = test;
        const resultado = limparTagsHTML(calcularIMC(peso, altura));
        console.log(`Teste ${index + 1}: Peso = ${peso}kg, Altura = ${altura}m`);
        console.log(resultado);
        console.log('-----------------------------');
    });
}

testarCalculoIMC();