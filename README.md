# Calculadora HTML, CSS y JS

Calculadora básica funcional construida con HTML, CSS y JavaScript puro (sin
frameworks ni librerías externas), con un fondo decorativo tipo anime hecho
completamente con CSS.

> **Proyecto educativo** desarrollado como ejemplo para el ramo
> **Taller de Java**, impartido a los alumnos de **IPChile** por la docente
> **Sabina Romero**.

El objetivo de este proyecto es servir de referencia practica para entender
cómo se separan las tres capas de una página web (estructura, estilos y lógica)
y como se conectan entre sí.

---

## Que hace

- Operaciones básicas: suma, resta, multiplicación y división.
- Funciones extra:
  - `AC`: limpia todo y reinicia la calculadora.
  - `⌫`: borra el ultimo digito ingresado.
  - `%`: calcula el porcentaje del número actual.
  - `.`: permite números decimales.
- Manejo de división por cero (muestra `Error` en lugar de romperse).
- Corrección de errores de coma flotante (por ejemplo, `0.1 + 0.2` da `0.3`).
- Separador de miles automático en la pantalla.
- Soporte de teclado físico además de los botones.

---

## Estructura del proyecto

```
Calculadora_html_css_js_basica/
├── index.html   # Estructura: pantalla, teclado y fondo
├── style.css    # Estilos: diseño de la calculadora y fondo anime
├── script.js    # Logica: operaciones y manejo de estado
└── README.md    # Este archivo
```

Los tres archivos deben estar en la misma carpeta para que la calculadora
funcione, ya que `index.html` enlaza a `style.css` y `script.js` por su nombre.

---

## Como ejecutarlo

No requiere instalación ni servidor. Basta con:

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` con cualquier navegador (doble clic).

---

## Como se usa

Puedes operar la calculadora de dos formas:

**Con el mouse:** haciendo clic en los botones.

**Con el teclado fisico:**

| Tecla              | Acción                 |
|--------------------|------------------------|
| `0` a `9` y `.`    | Ingresar números       |
| `+` `-` `*` `/`    | Operaciones            |
| `Enter` o `=`      | Calcular resultado     |
| `Backspace`        | Borrar ultimo digito   |
| `Escape`           | Limpiar todo           |
| `%`                | Porcentaje             |

---

## Tecnologías utilizadas

- **HTML5** para la estructura semántica.
- **CSS3** para el diseño, las animaciones y el fondo (gradientes, `clip-path`,
  `@keyframes`, `backdrop-filter`).
- **JavaScript** (vanilla) para la lógica, sin dependencias externas.

---

## Conceptos que ejemplifica

Este proyecto fue pensado para reforzar los siguientes conceptos:

- Separación de responsabilidades en tres archivos (estructura, estilo, lógica).
- Uso de atributos `data-*` y la propiedad `dataset` para conectar el HTML con
  el JavaScript.
- Manejo de un objeto de **estado** único para controlar la calculadora.
- **Delegación de eventos**: un solo `addEventListener` en el contenedor del
  teclado en lugar de uno por cada botón.
- Captura de eventos de teclado (`keydown`).
- Buenas prácticas al operar con números decimales en JavaScript.

---

## Autoría

Material elaborado por la docente **Sabina Romero** como recurso de aprendizaje
para los estudiantes de **IPChile**, ramo **Taller de Java**.

Uso educativo.

