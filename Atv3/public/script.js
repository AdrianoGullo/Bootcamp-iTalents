document.addEventListener('DOMContentLoaded', () => {
    const criarContaButton = document.getElementById('criar-conta');
    const depositarButton = document.getElementById('depositar');
    const sacarButton = document.getElementById('sacar');
    const verificarSaldoButton = document.getElementById('verificar-saldo');
    const visualizarContasButton = document.getElementById('visualizar-contas'); // Novo botão
    const formBlocks = document.getElementById('form-blocks');
    const infoConta = document.getElementById('info-conta');
    
    // Objeto para armazenar contas por titular
    let contasPorTitular = {};

    // Função para exibir o formulário inicial
    function exibirFormularioInicial() {
        formBlocks.innerHTML = `
            <div class="form-block" id="form-titular">
                <label for="titular">Nome do Titular:</label>
                <input type="text" id="titular" placeholder="Nome do titular">
            </div>
            <button id="criar-conta">Criar Conta</button>
            <button id="sacar">Sacar</button>
            <button id="depositar">Depositar</button>
            <button id="verificar-saldo">Verificar Saldo</button>
            <button id="visualizar-contas">Visualizar Contas</button> <!-- Novo botão -->
        `;
        // Reatribuir eventos aos botões do formulário inicial
        document.getElementById('criar-conta').addEventListener('click', criarConta);
        document.getElementById('sacar').addEventListener('click', () => exibirFormularioOperacao('sacar'));
        document.getElementById('depositar').addEventListener('click', () => exibirFormularioOperacao('depositar'));
        document.getElementById('verificar-saldo').addEventListener('click', exibirFormularioVerificarSaldo);
        document.getElementById('visualizar-contas').addEventListener('click', visualizarContas); // Novo evento
    }

    function exibirFormularioOperacao(operacao) {
        formBlocks.innerHTML = `
            <div class="form-block">
                <label for="titular">Nome do Titular:</label>
                <input type="text" id="titular-operacao" placeholder="Nome do titular">
            </div>
            <div class="form-block">
                <label for="tipo-conta">Tipo de Conta:</label>
                <select id="tipo-conta-operacao">
                    <option value="corrente">Conta Corrente</option>
                    <option value="poupanca">Conta Poupança</option>
                    <option value="normal">Conta Normal</option>
                </select>
            </div>
            <div class="form-block">
                <label for="valor">${operacao === 'depositar' ? 'Valor a Depositar:' : 'Valor a Sacar:'}</label>
                <input type="number" id="valor" placeholder="${operacao === 'depositar' ? 'Valor em reais' : 'Valor em reais'}" step="0.01">
            </div>
            <button id="confirmar-${operacao}">Confirmar ${operacao.charAt(0).toUpperCase() + operacao.slice(1)}</button>
            <button id="voltar">Voltar</button>
        `;

        document.getElementById(`confirmar-${operacao}`).addEventListener('click', () => {
            const titular = document.getElementById('titular-operacao').value;
            const tipoConta = document.getElementById('tipo-conta-operacao').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const conta = encontrarContaPorTitularETipo(titular, tipoConta);

            if (conta) {
                if (valor >= 0) {
                    if (operacao === 'depositar') {
                        conta.depositar(valor);
                        infoConta.innerHTML = `<p>Depósito realizado.<p> Saldo atual de ${titular} na ${tipoConta}: <strong>R$ ${conta.saldo.toFixed(2)}</strong>`;
                    } else if (operacao === 'sacar') {
                        if (valor <= conta.saldo) {
                            conta.sacar(valor);
                            infoConta.innerHTML = `<p><strong>Saque realizado.</strong></p>Saldo atual de ${titular} na ${tipoConta}: <strong>R$ ${conta.saldo.toFixed(2)}</strong>`;
                        } else {
                            infoConta.innerHTML = `<p>Saldo <strong>insuficiente</strong> para saque.</p> Saldo atual de ${titular} na ${tipoConta}: <strong>R$ ${conta.saldo.toFixed(2)}</strong>`;
                        }
                    }
                } else {
                    infoConta.innerHTML = `
                    <div class="resultado-bloco">
                        <p>Por favor, insira um valor válido.</p>
                    </div>`;
                }
            } else {
                infoConta.innerHTML = `
                    <div class="resultado-bloco">
                        <p>Conta não encontrada para o titular e tipo de conta informado.</p>
                    </div>`;
            }
        });

        document.getElementById('voltar').addEventListener('click', exibirFormularioInicial);
    }

    function exibirFormularioVerificarSaldo() {
        formBlocks.innerHTML = `
            <div class="form-block">
                <label for="titular">Nome do Titular:</label>
                <input type="text" id="titular-verificar" placeholder="Nome do titular">
            </div>
            <div class="form-block">
                <label for="tipo-conta">Tipo de Conta:</label>
                <select id="tipo-conta-verificar">
                    <option value="corrente">Conta Corrente</option>
                    <option value="poupanca">Conta Poupança</option>
                    <option value="normal">Conta Normal</option>
                </select>
            </div>
            <button id="confirmar-verificar-saldo">Confirmar Verificação</button>
            <button id="voltar">Voltar</button>
        `;

        document.getElementById('confirmar-verificar-saldo').addEventListener('click', verificarSaldo);
        document.getElementById('voltar').addEventListener('click', exibirFormularioInicial);
    }

    function criarConta() {
        const titular = document.getElementById('titular').value;
        if (titular) {
            formBlocks.innerHTML = `
                <div class="form-block">
                    <label for="saldo">Valor Inicial da Conta:</label>
                    <input type="number" id="saldo" placeholder="Valor inicial" step="0.01">
                </div>
                <div class="form-block">
                    <label for="tipo-conta">Tipo de Conta:</label>
                    <select id="tipo-conta">
                        <option value="corrente">Conta Corrente</option>
                        <option value="poupanca">Conta Poupança</option>
                        <option value="normal">Conta Normal</option>
                    </select>
                </div>
                <button id="confirmar-criacao">Confirmar Criação</button>
                <button id="cancelar-criacao">Cancelar</button>
            `;

            infoConta.innerHTML = `
                <div class="resultado-bloco">
                    <p><strong>Conta Corrente</strong> - Juros de 0,5% ao mês.</p>
                </div>
                <div class="resultado-bloco">
                    <p><strong>Conta Poupança</strong> - Juros de 1,0% ao mês.</p>
                </div>
                `;
                

            document.getElementById('confirmar-criacao').addEventListener('click', () => {
                const saldo = parseFloat(document.getElementById('saldo').value);
                const tipoConta = document.getElementById('tipo-conta').value;

                if (saldo >= 0) {
                    let novaConta;
                    let informacoesConta;
                    if (tipoConta === 'corrente') {
                        novaConta = new ContaCorrente(titular, saldo, 5.0); // Taxa de juros de 5% ao ano
                        informacoesConta = `
                            <p><strong>Conta Corrente</strong> criada.</p>
                            <p>Juros de 0,5% ao mês.</p>
                            <p><strong>Valor inicial:</strong> R$ ${saldo.toFixed(2)}.</p>
                            <p><strong>Valor estimado após um ano:</strong> R$ ${(saldo * Math.pow(1 + 0.005, 12)).toFixed(2)}</p>
                        `;
                    } else if (tipoConta === 'poupanca') {
                        novaConta = new ContaPoupanca(titular, saldo, 12.0); // Rendimento de 1% ao mês (12% ao ano)
                        informacoesConta = `
                            <p><strong>Conta Poupança</strong> criada.</p>
                            <p>Juros de 1,0% ao mês.</p>
                            <p><strong>Valor inicial:</strong> R$ ${saldo.toFixed(2)}.</p>
                            <p><strong>Valor estimado após um ano:</strong> R$ ${(saldo * Math.pow(1 + 0.01, 12)).toFixed(2)}</p>
                        `;
                    } else {
                        novaConta = new Conta(titular, saldo);
                        informacoesConta = `
                            <p><strong>Conta normal</strong> criada.</p>
                            <p><strong>Saldo inicial:</strong> R$ ${saldo.toFixed(2)}.</p>
                        `;
                    }

                    // Verifica se o titular já existe no objeto contasPorTitular
                    if (!contasPorTitular[titular]) {
                        contasPorTitular[titular] = [];
                    }
                    contasPorTitular[titular].push(novaConta);
                    infoConta.innerHTML = informacoesConta;

                    // Exibir o formulário inicial após a criação da conta
                    exibirFormularioInicial();
                } else {
                    infoConta.innerHTML = `
                        <div class="resultado-bloco">
                            <p><strong>Por favor, insira um valor inicial válido.</strong></p>
                        </div>
                    `;
                }
            });

            document.getElementById('cancelar-criacao').addEventListener('click', exibirFormularioInicial);
        } else {
            infoConta.innerHTML = `
                <div class="resultado-bloco">
                    <p><strong>Por favor, insira o nome do titular.</strong></p>
                </div>
            `;
        }
    }

    function verificarSaldo() {
        const titular = document.getElementById('titular-verificar').value;
        const tipoConta = document.getElementById('tipo-conta-verificar').value;
        const conta = encontrarContaPorTitularETipo(titular, tipoConta);

        if (conta) {
            let saldoAtualizado;
            let infoHtml = `<div class="resultado-bloco">`;

            if (conta instanceof ContaCorrente) {
                saldoAtualizado = conta.saldo * (1 + conta.juros / 100);
                infoHtml += `
                    <p><strong>Titular:</strong> ${conta.titular}</p>
                    <p><strong>Tipo de Conta:</strong> Conta Corrente</p>
                    <p><strong>Saldo Atual:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                    <p><strong>Estimativa com Juros:</strong> R$ ${saldoAtualizado.toFixed(2)}</p>
                `;
            } else if (conta instanceof ContaPoupanca) {
                saldoAtualizado = conta.saldo * Math.pow(1 + 0.01, 12);
                infoHtml += `
                    <p><strong>Titular:</strong> ${conta.titular}</p>
                    <p><strong>Tipo de Conta:</strong> Conta Poupança</p>
                    <p><strong>Saldo Atual:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                    <p><strong>Estimativa com Rendimento:</strong> R$ ${saldoAtualizado.toFixed(2)}</p>
                `;
            } else {
                infoHtml += `
                    <p><strong>Titular:</strong> ${conta.titular}</p>
                    <p><strong>Tipo de Conta:</strong> Conta Normal</p>
                    <p><strong>Saldo Atual:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                `;
            }

            infoHtml += `</div>`;
            infoConta.innerHTML = infoHtml;
        } else {
            infoConta.innerHTML = `
                <div class="resultado-bloco">
                    <p>Conta não encontrada para o titular e tipo de conta informado.</p>
                </div>`;
        }
    }

    function visualizarContas() {
        if (Object.keys(contasPorTitular).length > 0) {
            infoConta.innerHTML = Object.keys(contasPorTitular).map(titular => {
                return contasPorTitular[titular].map(conta => {
                    let saldoAtualizado;
                    let infoHtml = `<div class="resultado-bloco">`;

                    if (conta instanceof ContaCorrente) {
                        saldoAtualizado = conta.saldo * (1 + conta.juros / 100);
                        infoHtml += `
                            <p><strong>Titular:</strong> ${conta.titular}</p>
                            <p><strong>Tipo de Conta:</strong> Conta Corrente</p>
                            <p><strong>Saldo Inicial:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                            <p><strong>Estimativa com Juros:</strong> R$ ${saldoAtualizado.toFixed(2)}</p>
                        `;
                    } else if (conta instanceof ContaPoupanca) {
                        saldoAtualizado = conta.saldo * Math.pow(1 + 0.01, 12);
                        infoHtml += `
                            <p><strong>Titular:</strong> ${conta.titular}</p>
                            <p><strong>Tipo de Conta:</strong> Conta Poupança</p>
                            <p><strong>Saldo Inicial:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                            <p><strong>Estimativa com Rendimento:</strong> R$ ${saldoAtualizado.toFixed(2)}</p>
                        `;
                    } else {
                        infoHtml += `
                            <p><strong>Titular:</strong> ${conta.titular}</p>
                            <p><strong>Tipo de Conta:</strong> Conta Normal</p>
                            <p><strong>Saldo Inicial:</strong> R$ ${conta.saldo.toFixed(2)}</p>
                        `;
                    }

                    infoHtml += `</div>`;
                    return infoHtml;
                }).join('');
            }).join('');
        } else {
            infoConta.innerHTML = `<div class="resultado-bloco"><p>Nenhuma conta disponível.</p></div>`;
        }
    }

    function encontrarContaPorTitularETipo(titular, tipo) {
        if (!contasPorTitular[titular]) {
            return null;
        }

        return contasPorTitular[titular].find(conta => {
            if (tipo === 'corrente' && conta instanceof ContaCorrente) {
                return true;
            } else if (tipo === 'poupanca' && conta instanceof ContaPoupanca) {
                return true;
            } else if (tipo === 'normal' && !(conta instanceof ContaCorrente) && !(conta instanceof ContaPoupanca)) {
                return true;
            }
            return false;
        });
    }

    // Inicializar o formulário inicial
    exibirFormularioInicial();

    // Classe Base - Conta
    class Conta {
        constructor(titular, saldo = 0) {
            this.titular = titular;
            this.saldo = saldo;
        }

        depositar(valor) {
            this.saldo += valor;
        }

        sacar(valor) {
            this.saldo -= valor;
        }
    }

    // Classe Derivada - ContaCorrente
    class ContaCorrente extends Conta {
        constructor(titular, saldo = 0, juros = 0) {
            super(titular, saldo);
            this.juros = juros;
        }

        aplicarJuros() {
            const aumento = this.saldo * (this.juros / 100);
            this.saldo += aumento;
        }
    }

    // Classe Derivada - ContaPoupanca
    class ContaPoupanca extends Conta {
        constructor(titular, saldo = 0, rendimento = 0) {
            super(titular, saldo);
            this.rendimento = rendimento;
        }

        aplicarRendimento() {
            const aumento = this.saldo * (this.rendimento / 100);
            this.saldo += aumento;
        }
    }
});
