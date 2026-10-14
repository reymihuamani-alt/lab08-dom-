# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: Google Chrome

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|---------------------------------|
| textContent desde la consola | El titulo paso a decir "Hola desde la consola" | No |
| textContent desde app.js | El titulo dice "Hola TECSUP" | Si |
| style.color | El titulo se puso azul | Si |
| classList.add | El parrafo tiene fondo amarillo | Si |
| createElement + appendChild | La lista muestra un tercer elemento: JavaScript | Si |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Un clic sobre el boton Sumar 1 | 1 |
| dblclick | Dos clics rapidos seguidos sobre el boton | 1 por cada doble clic |
| mouseover | Pasar el cursor por encima del boton, sin hacer clic | 1 cada vez que el cursor entra al boton |

- evento.type mostro el nombre del evento ("click"), es decir, que tipo de accion ocurrio.
- evento.target mostro el elemento que recibio el evento: el boton `<button id="btnSumar">`.

## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El saludo "Hola, ..." cambio letra por letra | No |
| Enviar sin preventDefault | "Enviado" aparecio un instante y desaparecio; el campo quedo vacio | Si |
| Enviar con preventDefault, correo sin @ | Salio "Correo no valido: falta @" en rojo | No |
| Enviar con preventDefault, correo con @ | Salio "Enviado: " con el correo escrito | No |

## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
|--------|--------|--------|---------------|--------------------|
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |

Con la clase, cada producto se crea con una sola linea y todos comparten los mismos metodos, sin repetir codigo.
Si hay que agregar o cambiar un producto, se hace en JavaScript y la pagina se actualiza sola sin tocar el HTML.

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba | Total que muestra la pagina | Correcto (Si/No) |
|--------|-----------------------------|------------------|
| Cuaderno 12.50 | 12.50 | Si |
| + Lapicero 3.20 | 15.70 | Si |
| + Mochila 89.90 | 105.60 | Si |
| Sin Number() | No muestra nada: el producto no aparece y sale el error this.precio.toFixed is not a function | No |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
|-------|----------------------------------|----------------|
| DOM | `const li = document.createElement("li");` y `listaCarrito.appendChild(li);` | Crear el elemento del producto y mostrarlo en la pagina |
| Evento | `formProducto.addEventListener("submit", (evento) => {` | Reaccionar cuando el usuario envia el formulario |
| Objeto | `const producto = new Producto(prodNombre.value, Number(prodPrecio.value));` | Guardar nombre y precio del producto juntos, con sus metodos |
