# Calculadora HTML, CSS y JS

Calculadora basica funcional construida con HTML, CSS y JavaScript puro (sin
frameworks ni librerias externas), con un fondo decorativo tipo anime hecho
completamente con CSS.

> **Proyecto educativo** desarrollado como ejemplo para el ramo
> **Taller de Java**, impartido a los alumnos de **IPChile** por la docente
> **Sabina Romero**.

El objetivo de este proyecto es servir de referencia practica para entender
como se separan las tres capas de una pagina web (estructura, estilos y logica)
y como se conectan entre si.

---

## Que hace

- Operaciones basicas: suma, resta, multiplicacion y division.
- Funciones extra:
  - `AC`: limpia todo y reinicia la calculadora.
  - `⌫`: borra el ultimo digito ingresado.
  - `%`: calcula el porcentaje del numero actual.
  - `.`: permite numeros decimales.
- Manejo de division por cero (muestra `Error` en lugar de romperse).
- Correccion de errores de coma flotante (por ejemplo, `0.1 + 0.2` da `0.3`).
- Separador de miles automatico en la pantalla.
- Soporte de teclado fisico ademas de los botones.

---

## Estructura del proyecto

```
Calculadora_html_css_js_basica/
├── index.html   # Estructura: pantalla, teclado y fondo
├── style.css    # Estilos: diseno de la calculadora y fondo anime
├── script.js    # Logica: operaciones y manejo de estado
└── README.md    # Este archivo
```

Los tres archivos deben estar en la misma carpeta para que la calculadora
funcione, ya que `index.html` enlaza a `style.css` y `script.js` por su nombre.

---

## Como ejecutarlo

No requiere instalacion ni servidor. Basta con:

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` con cualquier navegador (doble clic).

---

## Como se usa

Puedes operar la calculadora de dos formas:

**Con el mouse:** haciendo clic en los botones.

**Con el teclado fisico:**

| Tecla              | Accion                 |
|--------------------|------------------------|
| `0` a `9` y `.`    | Ingresar numeros       |
| `+` `-` `*` `/`    | Operaciones            |
| `Enter` o `=`      | Calcular resultado     |
| `Backspace`        | Borrar ultimo digito   |
| `Escape`           | Limpiar todo           |
| `%`                | Porcentaje             |

---

## Tecnologias utilizadas

- **HTML5** para la estructura semantica.
- **CSS3** para el diseno, las animaciones y el fondo (gradientes, `clip-path`,
  `@keyframes`, `backdrop-filter`).
- **JavaScript** (vanilla) para la logica, sin dependencias externas.

---

## Conceptos que ejemplifica

Este proyecto fue pensado para reforzar los siguientes conceptos:

- Separacion de responsabilidades en tres archivos (estructura, estilo, logica).
- Uso de atributos `data-*` y la propiedad `dataset` para conectar el HTML con
  el JavaScript.
- Manejo de un objeto de **estado** unico para controlar la calculadora.
- **Delegacion de eventos**: un solo `addEventListener` en el contenedor del
  teclado en lugar de uno por cada boton.
- Captura de eventos de teclado (`keydown`).
- Buenas practicas al operar con numeros decimales en JavaScript.

---

## Autoria

Material elaborado por la docente **Sabina Romero** como recurso de aprendizaje
para los estudiantes de **IPChile**, ramo **Taller de Java**.

Uso educativo.