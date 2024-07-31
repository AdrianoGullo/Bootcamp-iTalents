// Definindo as classes e funções principais

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

let contasPorTitular = {};

function criarConta(titular, saldo, tipoConta) {
    let novaConta;
    if (tipoConta === 'corrente') {
        novaConta = new ContaCorrente(titular, saldo, 6.0); // Taxa de juros de 0,5% ao mês
    } else if (tipoConta === 'poupanca') {
        novaConta = new ContaPoupanca(titular, saldo, 12.0); // Rendimento de 1% ao mês
    } else {
        novaConta = new Conta(titular, saldo);
    }

    if (!contasPorTitular[titular]) {
        contasPorTitular[titular] = [];
    }
    contasPorTitular[titular].push(novaConta);
    return novaConta;
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
