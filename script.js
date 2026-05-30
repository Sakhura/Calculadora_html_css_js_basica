// ====== Estado de la calculadora ======
const estado = {
  actual: "0",      // numero que se esta escribiendo
  previo: null,     // numero anterior guardado
  operador: null,   // operacion pendiente
  reiniciar: false, // si true, el proximo numero reemplaza la pantalla
};

const resultadoEl = document.getElementById("resultado");
const historialEl = document.getElementById("historial");

const simbolos = { sumar: "+", restar: "−", multiplicar: "×", dividir: "÷" };

// ====== Render en pantalla ======
function formatear(valor) {
  if (valor === "Error") return valor;
  const num = parseFloat(valor);
  if (isNaN(num)) return valor;
  // Mantener punto decimal mientras se escribe (ej. "5.")
  if (valor.endsWith(".")) return valor;
  // Limitar decimales largos y agregar separador de miles
  const partes = valor.split(".");
  const entero = parseFloat(partes[0]).toLocaleString("es-CL");
  return partes.length > 1 ? `${entero}.${partes[1]}` : entero;
}

function actualizarPantalla() {
  resultadoEl.textContent = formatear(estado.actual);
  if (estado.operador && estado.previo !== null) {
    historialEl.textContent = `${formatear(estado.previo)} ${simbolos[estado.operador]}`;
  } else {
    historialEl.innerHTML = "&nbsp;";
  }
  resultadoEl.classList.remove("flash");
  void resultadoEl.offsetWidth; // reinicia la animacion
  resultadoEl.classList.add("flash");
}

// ====== Acciones con numeros ======
function ingresarNumero(n) {
  if (estado.actual === "Error") estado.actual = "0";

  if (n === ".") {
    if (estado.reiniciar) { estado.actual = "0."; estado.reiniciar = false; return; }
    if (!estado.actual.includes(".")) estado.actual += ".";
    return;
  }

  if (estado.reiniciar || estado.actual === "0") {
    estado.actual = n;
    estado.reiniciar = false;
  } else {
    estado.actual += n;
  }
}

// ====== Operaciones ======
function elegirOperador(op) {
  if (estado.actual === "Error") return;
  if (estado.operador && !estado.reiniciar) {
    calcular();
  }
  estado.previo = estado.actual;
  estado.operador = op;
  estado.reiniciar = true;
}

function calcular() {
  if (estado.operador === null || estado.previo === null) return;

  const a = parseFloat(estado.previo);
  const b = parseFloat(estado.actual);
  let res;

  switch (estado.operador) {
    case "sumar":       res = a + b; break;
    case "restar":      res = a - b; break;
    case "multiplicar": res = a * b; break;
    case "dividir":
      if (b === 0) { mostrarError(); return; }
      res = a / b;
      break;
    default: return;
  }

  // Redondeo para evitar errores de coma flotante (ej. 0.1 + 0.2)
  res = Math.round((res + Number.EPSILON) * 1e10) / 1e10;

  estado.actual = res.toString();
  estado.operador = null;
  estado.previo = null;
  estado.reiniciar = true;
}

function mostrarError() {
  estado.actual = "Error";
  estado.previo = null;
  estado.operador = null;
  estado.reiniciar = true;
}

// ====== Funciones extra ======
function limpiar() {
  estado.actual = "0";
  estado.previo = null;
  estado.operador = null;
  estado.reiniciar = false;
}

function borrar() {
  if (estado.actual === "Error") { limpiar(); return; }
  if (estado.reiniciar) return;
  estado.actual = estado.actual.length > 1
    ? estado.actual.slice(0, -1)
    : "0";
}

function porcentaje() {
  if (estado.actual === "Error") return;
  estado.actual = (parseFloat(estado.actual) / 100).toString();
}

// ====== Conexion con los botones ======
document.querySelector(".teclado").addEventListener("click", (e) => {
  const tecla = e.target.closest(".tecla");
  if (!tecla) return;

  if (tecla.dataset.numero !== undefined) {
    ingresarNumero(tecla.dataset.numero);
  } else {
    switch (tecla.dataset.accion) {
      case "sumar":
      case "restar":
      case "multiplicar":
      case "dividir":   elegirOperador(tecla.dataset.accion); break;
      case "igual":     calcular(); break;
      case "limpiar":   limpiar(); break;
      case "borrar":    borrar(); break;
      case "porcentaje": porcentaje(); break;
    }
  }
  actualizarPantalla();
});

// ====== Soporte de teclado ======
const mapaTeclas = {
  "+": "sumar", "-": "restar", "*": "multiplicar", "/": "dividir",
  "Enter": "igual", "=": "igual",
  "Backspace": "borrar", "Escape": "limpiar", "%": "porcentaje",
};

document.addEventListener("keydown", (e) => {
  if (/[0-9.]/.test(e.key)) {
    ingresarNumero(e.key);
    resaltar(`[data-numero="${e.key}"]`);
  } else if (mapaTeclas[e.key]) {
    const accion = mapaTeclas[e.key];
    if (e.key === "Enter") e.preventDefault();
    if (accion === "igual") calcular();
    else if (accion === "limpiar") limpiar();
    else if (accion === "borrar") borrar();
    else if (accion === "porcentaje") porcentaje();
    else elegirOperador(accion);
    resaltar(`[data-accion="${accion}"]`);
  } else {
    return;
  }
  actualizarPantalla();
});

// Efecto visual al usar el teclado fisico
function resaltar(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.classList.add("presionada");
  setTimeout(() => btn.classList.remove("presionada"), 120);
}

// ====== Inicio ======
actualizarPantalla();