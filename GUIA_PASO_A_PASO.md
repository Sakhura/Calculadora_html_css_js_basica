# Guia paso a paso: Calculadora con HTML, CSS y JavaScript

> Material educativo del ramo **Taller de Java** — **IPChile**
> Docente: **Sabina Romero**

Esta guia te lleva de la mano para construir, desde cero, una calculadora
funcional con un fondo decorativo tipo anime. Al terminar tendras el mismo
proyecto del repositorio, entendiendo el por que de cada linea.

---

## Objetivos de aprendizaje

Al finalizar esta guia seras capaz de:

- Separar un proyecto web en tres capas: estructura (HTML), estilo (CSS) y
  logica (JavaScript).
- Conectar el HTML con el JavaScript usando atributos `data-*`.
- Manejar el "estado" de una aplicacion con un objeto.
- Capturar eventos de clic y de teclado.
- Aplicar estilos modernos: variables CSS, gradientes y animaciones.

## Requisitos previos

- Un editor de codigo (recomendado: Visual Studio Code).
- Un navegador web (Chrome, Edge, Firefox).
- Nociones basicas de HTML, CSS y JavaScript.

---

## Paso 0 — Preparar la carpeta del proyecto

Crea una carpeta para el proyecto y, dentro, tres archivos vacios:

```
calculadora/
├── index.html
├── style.css
└── script.js
```

Abre la carpeta completa en tu editor. Trabajaremos los tres archivos en
paralelo.

> **Idea clave:** cada archivo tiene una unica responsabilidad. El HTML dice
> *que hay*, el CSS dice *como se ve*, y el JavaScript dice *que hace*.

---

## Paso 1 — Estructura HTML basica

En `index.html` escribe el esqueleto de una pagina y enlaza los otros dos
archivos. El CSS se enlaza en el `<head>` y el JavaScript al final del `<body>`
(para que el HTML ya exista cuando el script intente leerlo).

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Aqui ira la calculadora -->

    <script src="script.js"></script>
</body>
</html>
```

> **Por que el script va al final:** el navegador lee el HTML de arriba hacia
> abajo. Si el script estuviera arriba, intentaria buscar botones que todavia
> no se han creado y fallaria.

---

## Paso 2 — La pantalla y el teclado

Dentro del `<body>` agrega la estructura de la calculadora: una cabecera, una
pantalla (con historial y resultado) y el teclado con todos los botones.

```html
<main class="calculadora">
    <header class="cabecera">
        <span class="titulo">Calculadora</span>
        <span class="subtitulo">Taller Java</span>
    </header>

    <section class="pantalla">
        <div class="historial" id="historial">&nbsp;</div>
        <div class="resultado" id="resultado">0</div>
    </section>

    <section class="teclado">
        <button class="tecla funcion" data-accion="limpiar">AC</button>
        <button class="tecla funcion" data-accion="borrar">&#9003;</button>
        <button class="tecla funcion" data-accion="porcentaje">%</button>
        <button class="tecla operador" data-accion="dividir">/</button>

        <button class="tecla numero" data-numero="7">7</button>
        <button class="tecla numero" data-numero="8">8</button>
        <button class="tecla numero" data-numero="9">9</button>
        <button class="tecla operador" data-accion="multiplicar">*</button>

        <button class="tecla numero" data-numero="4">4</button>
        <button class="tecla numero" data-numero="5">5</button>
        <button class="tecla numero" data-numero="6">6</button>
        <button class="tecla operador" data-accion="restar">-</button>

        <button class="tecla numero" data-numero="1">1</button>
        <button class="tecla numero" data-numero="2">2</button>
        <button class="tecla numero" data-numero="3">3</button>
        <button class="tecla operador" data-accion="sumar">+</button>

        <button class="tecla numero cero" data-numero="0">0</button>
        <button class="tecla numero" data-numero=".">.</button>
        <button class="tecla igual" data-accion="igual">=</button>
    </section>
</main>
```

> **Lo mas importante de este paso son los atributos `data-*`:**
> - `data-numero="7"` marca un boton que ingresa un numero.
> - `data-accion="sumar"` marca un boton que ejecuta una accion.
>
> Mas adelante, el JavaScript leera estos atributos para saber que hacer al
> presionar cada boton. **El texto debe coincidir exactamente** entre el HTML y
> el JS (por ejemplo, `data-accion` se lee como `dataset.accion`).

Si abres `index.html` ahora, veras los botones sin estilo. Es normal.

---

## Paso 3 — Estilos base con CSS

En `style.css` empezamos definiendo variables de color (para no repetir codigo)
y un diseno limpio. Las variables se declaran en `:root` y se usan con `var()`.

```css
:root {
  --texto: #3a2a4d;
  --rosa: #ff7eb6;
  --rosa-fuerte: #ff4f9a;
  --celeste: #6fd6ff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: sans-serif;
  background: linear-gradient(180deg, #6db3f2, #ffb4c6);
}
```

> **`box-sizing: border-box`** hace que el `padding` no agrande los elementos,
> lo que facilita muchisimo el calculo de tamanos. Es una linea que casi siempre
> conviene poner.

Ahora damos forma a la calculadora y a la pantalla:

```css
.calculadora {
  width: min(92vw, 360px);
  padding: 22px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
}

.pantalla {
  background: rgba(58, 42, 77, 0.28);
  border-radius: 18px;
  padding: 16px 18px;
  margin-bottom: 18px;
  text-align: right;
}

.resultado { font-size: 2.6rem; color: #fff; }
.historial { font-size: 0.95rem; color: rgba(255,255,255,0.7); }
```

Y por ultimo el teclado, usando **CSS Grid** para acomodar los botones en una
cuadricula de 4 columnas:

```css
.teclado {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 11px;
}

.tecla {
  font-size: 1.3rem;
  border: none;
  border-radius: 16px;
  padding: 16px 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.78);
}

.tecla.operador { background: var(--celeste); color: #fff; }
.tecla.igual    { background: var(--rosa-fuerte); color: #fff; }

/* El cero ocupa dos columnas */
.cero { grid-column: span 2; }
```

> **`grid-template-columns: repeat(4, 1fr)`** crea 4 columnas del mismo ancho.
> Como tenemos un boton menos en la ultima fila, hacemos que el `0` ocupe dos
> espacios con `grid-column: span 2`.

---

## Paso 4 — El fondo anime (opcional)

El fondo no es necesario para que la calculadora funcione, pero es un buen
ejercicio de CSS. Se hace 100% con CSS, sin imagenes. Agrega esto en el HTML,
justo despues de abrir el `<body>`:

```html
<div class="escena" aria-hidden="true">
    <div class="sol"></div>
    <div class="nube nube-1"></div>
    <div class="montanas"></div>
    <div class="petalos">
        <span></span><span></span><span></span><span></span>
    </div>
</div>
```

Y en el CSS, un ejemplo del sol con una animacion de "latido":

```css
.escena { position: fixed; inset: 0; overflow: hidden; z-index: 0; }

.sol {
  position: absolute;
  top: 14%; left: 50%;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff7e6, rgba(255,224,150,0));
  animation: latido 6s ease-in-out infinite;
}

@keyframes latido {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50%      { transform: translateX(-50%) scale(1.06); }
}

.calculadora { position: relative; z-index: 2; } /* delante del fondo */
```

> **`@keyframes`** define los pasos de una animacion, y `animation` la aplica.
> El `z-index` asegura que la calculadora quede por delante del fondo.

(Las nubes, montanas y petalos siguen la misma idea: posicion absoluta +
animaciones. Puedes revisarlas en el `style.css` del repositorio.)

---

## Paso 5 — El estado de la calculadora (JavaScript)

Aqui empieza la logica. En `script.js`, lo primero es crear un objeto que
guarde toda la informacion que la calculadora necesita recordar. A esto le
llamamos el **estado**.

```js
const estado = {
  actual: "0",      // numero que se esta escribiendo
  previo: null,     // numero anterior guardado
  operador: null,   // operacion pendiente (sumar, restar...)
  reiniciar: false, // si true, el proximo numero reemplaza la pantalla
};

const resultadoEl = document.getElementById("resultado");
const historialEl = document.getElementById("historial");
```

> **Por que un objeto de estado:** en lugar de tener muchas variables sueltas,
> agrupamos todo lo que cambia en un solo lugar. Asi es mas facil seguir el hilo
> de lo que pasa.

---

## Paso 6 — Mostrar y ingresar numeros

Necesitamos una funcion que pinte el estado en la pantalla y otra que agregue
digitos.

```js
function actualizarPantalla() {
  resultadoEl.textContent = estado.actual;
}

function ingresarNumero(n) {
  if (n === ".") {
    if (!estado.actual.includes(".")) estado.actual += ".";
    return;
  }
  if (estado.reiniciar || estado.actual === "0") {
    estado.actual = n;          // reemplaza el 0 inicial
    estado.reiniciar = false;
  } else {
    estado.actual += n;         // agrega el digito al final
  }
}
```

> **Detalle importante:** controlamos que no se escriban dos puntos decimales
> (`includes(".")`) y que al empezar no quede algo como `05`.

---

## Paso 7 — Elegir una operacion

Cuando el usuario presiona `+`, `-`, `*` o `/`, guardamos el numero actual como
"previo" y recordamos que operacion eligio.

```js
function elegirOperador(op) {
  if (estado.operador && !estado.reiniciar) {
    calcular(); // si ya habia una operacion pendiente, la resolvemos primero
  }
  estado.previo = estado.actual;
  estado.operador = op;
  estado.reiniciar = true; // el proximo numero empieza limpio
}
```

---

## Paso 8 — Calcular el resultado

Esta es la funcion central. Toma el numero previo, el actual y el operador, y
hace la cuenta con un `switch`.

```js
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
      if (b === 0) { estado.actual = "Error"; return; } // evita dividir por 0
      res = a / b;
      break;
  }

  // Redondeo para evitar errores de coma flotante (0.1 + 0.2)
  res = Math.round((res + Number.EPSILON) * 1e10) / 1e10;

  estado.actual = res.toString();
  estado.operador = null;
  estado.previo = null;
  estado.reiniciar = true;
}
```

> **`parseFloat`** convierte el texto de la pantalla ("12") en un numero (12)
> para poder operarlo. El redondeo del final corrige el clasico
> `0.1 + 0.2 = 0.30000000000000004` de JavaScript.

---

## Paso 9 — Funciones extra (limpiar, borrar, porcentaje)

```js
function limpiar() {
  estado.actual = "0";
  estado.previo = null;
  estado.operador = null;
  estado.reiniciar = false;
}

function borrar() {
  estado.actual = estado.actual.length > 1
    ? estado.actual.slice(0, -1) // quita el ultimo caracter
    : "0";
}

function porcentaje() {
  estado.actual = (parseFloat(estado.actual) / 100).toString();
}
```

---

## Paso 10 — Conectar los botones

Aqui unimos todo. En lugar de poner un evento por cada boton (serian 19),
usamos un solo evento en el contenedor `.teclado`. Esto se llama
**delegacion de eventos**.

```js
document.querySelector(".teclado").addEventListener("click", (e) => {
  const tecla = e.target.closest(".tecla");
  if (!tecla) return; // se hizo clic fuera de un boton

  if (tecla.dataset.numero !== undefined) {
    ingresarNumero(tecla.dataset.numero);
  } else {
    switch (tecla.dataset.accion) {
      case "sumar":
      case "restar":
      case "multiplicar":
      case "dividir":    elegirOperador(tecla.dataset.accion); break;
      case "igual":      calcular(); break;
      case "limpiar":    limpiar(); break;
      case "borrar":     borrar(); break;
      case "porcentaje": porcentaje(); break;
    }
  }
  actualizarPantalla(); // siempre repintamos al final
});

actualizarPantalla(); // primera pintada al cargar la pagina
```

> **`tecla.dataset.numero`** lee el atributo `data-numero` del HTML.
> **Recuerda:** si en el HTML escribiste `data-accion`, en JS se lee
> `dataset.accion`. Si no coinciden, el boton no hara nada. (Este es el error
> mas comun en este proyecto.)

---

## Paso 11 (opcional) — Soporte de teclado fisico

Para poder usar el teclado del computador, escuchamos el evento `keydown`.

```js
document.addEventListener("keydown", (e) => {
  if (/[0-9.]/.test(e.key)) {
    ingresarNumero(e.key);
  } else if (e.key === "+") elegirOperador("sumar");
  else if (e.key === "-") elegirOperador("restar");
  else if (e.key === "*") elegirOperador("multiplicar");
  else if (e.key === "/") elegirOperador("dividir");
  else if (e.key === "Enter" || e.key === "=") calcular();
  else if (e.key === "Backspace") borrar();
  else if (e.key === "Escape") limpiar();
  else return;

  actualizarPantalla();
});
```

---

## Paso 12 — Probar el proyecto

1. Guarda los tres archivos.
2. Abre `index.html` en el navegador.
3. Prueba sumar, restar, multiplicar y dividir.
4. Si algo no funciona, abre la consola del navegador (tecla **F12**, pestaña
   **Console**) para ver mensajes de error.

> **Truco para depurar:** dentro del evento del clic, escribe
> `console.log(tecla.dataset)` y observa que aparece al presionar cada boton.
> Asi confirmas que el HTML y el JS estan usando los mismos nombres.

---

## Paso 13 — Subir el proyecto a Git (opcional)

Si trabajas con control de versiones:

```bash
git init
git add .
git commit -m "feat: calculadora basica con HTML, CSS y JS"
```

---

## Ejercicios propuestos

Para reforzar lo aprendido, intenta agregar por tu cuenta:

1. Un boton de **cambio de signo** (`+/-`).
2. Una funcion de **raiz cuadrada**.
3. Un **separador de miles** en la pantalla (pista: `toLocaleString`).
4. Un boton para **cambiar entre tema claro y oscuro**.
5. Mostrar en el `historial` la operacion completa (ej. `12 + 8`).

---

## Resumen de conceptos vistos

| Concepto                  | Donde aparece                          |
|---------------------------|----------------------------------------|
| Separacion en 3 capas     | index.html / style.css / script.js     |
| Atributos `data-*`        | botones + `dataset` en JS              |
| Objeto de estado          | `const estado = { ... }`               |
| Condicionales y `switch`  | `calcular()`, manejo de botones        |
| Eventos de clic y teclado | `addEventListener`                     |
| Delegacion de eventos     | un solo evento en `.teclado`           |
| Variables y Grid en CSS   | `:root`, `grid-template-columns`       |
| Animaciones CSS           | `@keyframes`                           |

---

Material elaborado por la docente **Sabina Romero** para los estudiantes de
**IPChile**, ramo **Taller de Java**. Uso educativo.