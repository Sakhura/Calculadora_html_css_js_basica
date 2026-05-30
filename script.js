const estado ={
    actual :"0",  //numero que se esta escribiendo
    previo: null,
    operador: null,
    reiniciar: false,
};

const resultadoEl = document.getElementById("resultado");
const historialEl = document.getElementById("historial");

const simbolos = {sumar: "+", restar: "-", multiplicar: "*", dividir: "/" };

function formatear(valor) {
    if (valor === "Error") return valor;
    const num = parseFloat(valor);
    if(isNaN(num)) return valor;
    if(valor.endsWith(".")) return valor;

    const partes = valor.split(".");
    const entero = parseFloat(partes[0]).toLocaleString("es-CL");
    return partes.length > 1 ? `${entero}.${partes[1]}` : entero;
}

function actualizarPantalla(){
    resultadoEl.textContent = formatear(estado.actual);
    if (estado.operador && estado.previo !== null) {
        historialEl.textContent = `${formatear(estado.previo)} ${simbolos[estado.operador]}`;
    } else {
        historialEl.innerHTML = "&nbsp;";
    }
    resultadoEl.classList.remove("flash");
    void resultadoEl.offsetWidth;
    resultadoEl.classList.add("flash");
}

function ingresarNumero(n) {
    if (estado.actual === "Error") estado.actual = "0";

    if(n === "."){
        if(estado.reiniciar) {estado.actual = "0."; estado.reiniciar = false; return; }
        if(!estado.actual.includes(".")) estado.actual += ".";
        return
    }

    if (estado.reiniciar || estado.actual === "0"){
        estado.actual =n;
        estado.reiniciar = false;
    } else {
        estado.actual += n;
    }
}

function elegirOperador(op){
    if(estado.actual === "Error") return;
    if(estado.operador && !estado.reiniciar){
        calcular();
    }
    estado.previo = estado.actual;
    estado.operador = op;
    estado.reiniciar = true;
}

function calcular(){
    if(estado.operador === null || estado.previo === null) return;

    const a = parseFloat(estado.previo);
    const b = parseFloat(estado.actual);
    let res;

    switch(estado.operador){
        case "sumar": res = a + b; break;
        case "restar": res = a - b; break;
        case "multiplicar": res = a * b; break;
        case "dividir": 
        if(b === 0) {mostrarError(); return;}
        res = a / b; break;
        default: return;
    }
}
