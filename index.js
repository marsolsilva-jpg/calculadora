
let resultado = document.getElementById("resultado");

let numeroAtual = "0";
let numeroAnterior = null;
let operador = null;
let aguardandoNumero = false;

function atualizarVisor() {
    resultado.innerText = numeroAtual.replace(".", ",");
}
function adicionarNumero(numero) {

    if (aguardandoNumero) {
        numeroAtual = numero;
        aguardandoNumero = false;
    } else {
        if (numeroAtual === "0") {
            numeroAtual = numero;
        } else if (numeroAtual.length < 12) {
            numeroAtual += numero;
        }
    }

    atualizarVisor();
}
function adicionarDecimal() {

    if (aguardandoNumero) {
        numeroAtual = "0";
        aguardandoNumero = false;
    }

    if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }

    atualizarVisor();
}
function escolherOperador(op) {

    if (operador !== null && !aguardandoNumero) {
        calcular();
    }

    numeroAnterior = Number(numeroAtual);
    operador = op;
    aguardandoNumero = true;
}
function calcular() {

    if (operador === null || numeroAnterior === null) {
        return;
    }

    let atual = Number(numeroAtual);
    let total;

    if (operador === "+") {
        total = numeroAnterior + atual;
    }

    else if (operador === "-") {
        total = numeroAnterior - atual;
    }

    else if (operador === "*") {
        total = numeroAnterior * atual;
    }

    else if (operador === "/") {

        if (atual === 0) {
            numeroAtual = "Erro";
            operador = null;
            numeroAnterior = null;
            atualizarVisor();
            return;
        }

        total = numeroAnterior / atual;
    }

    numeroAtual = String(Number(total.toPrecision(10)));

    if (numeroAtual.length > 12) {
        numeroAtual = Number(numeroAtual).toExponential(5);
    }

    operador = null;
    numeroAnterior = null;
    aguardandoNumero = true;

    atualizarVisor();
}
function limpar() {
    numeroAtual = "0";
    numeroAnterior = null;
    operador = null;
    aguardandoNumero = false;

    atualizarVisor();
}
function trocarSinal() {

    if (numeroAtual !== "0" && numeroAtual !== "Erro") {
        numeroAtual = String(Number(numeroAtual) * -1);
    }

    atualizarVisor();
}
function porcentagem() {

    if (numeroAtual !== "Erro") {
        numeroAtual = String(Number(numeroAtual) / 100);
    }

    atualizarVisor();
}
document.querySelector(".botoes").addEventListener("click", function(event) {

    let botao = event.target;

    if (botao.dataset.number !== undefined) {
        adicionarNumero(botao.dataset.number);
    }

    if (botao.dataset.operator) {
        escolherOperador(botao.dataset.operator);
    }

    if (botao.dataset.action === "decimal") {
        adicionarDecimal();
    }

    if (botao.dataset.action === "igual") {
        calcular();
    }

    if (botao.dataset.action === "limpar") {
        limpar();
    }

    if (botao.dataset.action === "sinal") {
        trocarSinal();
    }

    if (botao.dataset.action === "porcentagem") {
        porcentagem();
    }

});
