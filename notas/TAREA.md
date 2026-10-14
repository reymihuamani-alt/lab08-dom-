# Tarea: Mi componente interactivo

## Componente elegido

Una **lista de tareas**: se escribe una tarea, se agrega a la lista, se puede marcar como hecha, borrar y buscar. Elegi este componente porque lo uso a diario para organizar mis trabajos y combina bien DOM, eventos y objetos.

## Version 1: solo DOM

**Que agregue:** el HTML con el formulario, el buscador y la lista vacia, y un app.js que crea dos tareas fijas con `createElement` y `appendChild`.

**Por que:** para comprobar primero que puedo seleccionar elementos y crear nodos, antes de agregar interaccion.

**Que cambio en la pagina:** al abrirla aparecen dos tareas y un resumen. Todavia no responde a nada del usuario.

```js
const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const textos = ["Estudiar DOM", "Hacer el laboratorio 08"];

textos.forEach((t) => {
  const li = document.createElement("li");
  li.textContent = t;
  lista.appendChild(li);
});

resumen.textContent = "Tareas: " + textos.length;
```

## Version 2: con eventos

**Que agregue:** tres eventos: `submit` para agregar tareas (con `preventDefault` y validacion), `click` para marcar y borrar, e `input` para el contador de caracteres y el buscador. Los datos viven en un arreglo de objetos simples `{ texto, completada }`.

**Por que:** para que la pagina reaccione al usuario sin recargarse.

**Que cambio en la pagina:** ahora se pueden agregar, marcar y borrar tareas; si el texto tiene menos de 3 caracteres sale un mensaje en rojo dentro de la pagina; el contador de caracteres cambia mientras se escribe.

```js
let tareas = [];

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = texto.value.trim();

  if (valor.length < 3) {
    mensaje.textContent = "La tarea debe tener al menos 3 caracteres";
    mensaje.className = "error";
    return;
  }

  tareas.push({ texto: valor, completada: false });
  formTarea.reset();
  dibujar();
});

texto.addEventListener("input", () => {
  contadorCaracteres.textContent = texto.value.length + " / 60";
});

// dentro de dibujar(): click para marcar y para borrar
span.addEventListener("click", () => {
  tarea.completada = !tarea.completada;
  dibujar();
});
btnBorrar.addEventListener("click", () => {
  tareas = tareas.filter((t) => t !== tarea);
  dibujar();
});
```

## Version 3: con clases y objetos

**Que agregue:** las clases `Tarea` y `ListaTareas`. Ahora los datos y las acciones (alternar, eliminar, buscar, contar pendientes, evitar duplicados) estan dentro de las clases, y el DOM solo se encarga de dibujar.

**Por que:** el codigo de la version 2 mezclaba datos y logica con el dibujo; con clases queda ordenado y es mas facil de ampliar.

**Que cambio en la pagina:** se ve igual, pero ahora tambien evita tareas duplicadas y el buscador filtra usando un metodo de la clase.

```js
class Tarea {
  constructor(texto) {
    this.id = Date.now() + Math.random();
    this.texto = texto;
    this.completada = false;
  }
  alternar() { this.completada = !this.completada; }
  descripcion() { return (this.completada ? "[x] " : "[ ] ") + this.texto; }
}

class ListaTareas {
  constructor() { this.items = []; }
  agregar(texto) { const t = new Tarea(texto); this.items.push(t); return t; }
  eliminar(id) { this.items = this.items.filter((t) => t.id !== id); }
  existe(texto) { return this.items.some((t) => t.texto.toLowerCase() === texto.toLowerCase()); }
  pendientes() { return this.items.filter((t) => !t.completada).length; }
  buscar(filtro) { return this.items.filter((t) => t.texto.toLowerCase().includes(filtro.toLowerCase())); }
}

const tareas = new ListaTareas();
```

## Donde uso DOM, eventos y objetos

| Parte | Donde esta en el codigo final | Para que sirve |
|-------|-------------------------------|----------------|
| DOM | `document.querySelector(...)`, `createElement("li")`, `appendChild`, `classList`, `textContent` en `dibujar()` | Mostrar y actualizar la lista en la pagina |
| Eventos | `submit` del formulario, `click` en la tarea y en Borrar, `input` en el texto y en el buscador | Que la pagina reaccione al usuario |
| Objetos | `class Tarea`, `class ListaTareas` y `const tareas = new ListaTareas()` | Guardar los datos y las acciones de cada tarea |

## Pruebas realizadas

| Accion | Resultado esperado | Resultado obtenido | Cumple (Si/No) |
|--------|--------------------|--------------------|----------------|
| Agregar "Estudiar JavaScript" | Aparece en la lista y el resumen suma 1 | Aparece en la lista y el resumen suma 1 | Si |
| Enviar el campo vacio o con "ab" | Mensaje rojo "al menos 3 caracteres" y no se agrega | Mensaje rojo en la pagina y no se agrego | Si |
| Agregar dos veces la misma tarea | Mensaje "Esa tarea ya existe" | Mensaje en rojo y no se duplico | Si |
| Clic sobre una tarea | Se tacha y baja el numero de pendientes | Se tacho y bajo el numero de pendientes | Si |
| Clic en Borrar | La tarea desaparece de la lista | Desaparecio y el resumen se actualizo | Si |
| Escribir en el buscador | Solo se muestran las tareas que contienen el texto | Se filtro la lista mientras escribia | Si |
| Escribir en el campo de tarea | El contador cambia (ej. 5 / 60) | El contador cambio letra por letra | Si |

## Por que disene asi mi clase

La clase `Tarea` guarda lo que define a una tarea: su `texto`, su estado `completada` y un `id` unico para poder borrarla sin confundirla con otra. Sus metodos son `alternar()` y `descripcion()`, porque son las acciones propias de una tarea. La clase `ListaTareas` guarda el arreglo `items` y tiene los metodos que trabajan con el conjunto: `agregar`, `eliminar`, `existe`, `pendientes` y `buscar`. Separe las dos clases para que el DOM solo dibuje y no tenga que manejar los datos, y asi cambiar la logica no obliga a tocar el HTML.
