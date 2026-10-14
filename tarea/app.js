// Tarea - Version 3: DOM + eventos + clases y objetos

class Tarea {
  constructor(texto) {
    this.id = Date.now() + Math.random();
    this.texto = texto;
    this.completada = false;
  }

  alternar() {
    this.completada = !this.completada;
  }

  descripcion() {
    return (this.completada ? "[x] " : "[ ] ") + this.texto;
  }
}

class ListaTareas {
  constructor() {
    this.items = [];
  }

  agregar(texto) {
    const tarea = new Tarea(texto);
    this.items.push(tarea);
    return tarea;
  }

  eliminar(id) {
    this.items = this.items.filter((t) => t.id !== id);
  }

  existe(texto) {
    return this.items.some((t) => t.texto.toLowerCase() === texto.toLowerCase());
  }

  pendientes() {
    return this.items.filter((t) => !t.completada).length;
  }

  buscar(filtro) {
    return this.items.filter((t) => t.texto.toLowerCase().includes(filtro.toLowerCase()));
  }
}

const tareas = new ListaTareas();

const formTarea = document.querySelector("#formTarea");
const texto = document.querySelector("#texto");
const contadorCaracteres = document.querySelector("#contadorCaracteres");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");

function mostrarMensaje(textoMensaje, tipo) {
  mensaje.textContent = textoMensaje;
  mensaje.className = tipo;
}

function dibujar() {
  lista.innerHTML = "";

  tareas.buscar(buscador.value).forEach((tarea) => {
    const li = document.createElement("li");
    if (tarea.completada) li.classList.add("hecha");

    const span = document.createElement("span");
    span.textContent = tarea.texto;
    // evento click: marcar / desmarcar
    span.addEventListener("click", () => {
      tarea.alternar();
      dibujar();
    });

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    // evento click: eliminar
    btnBorrar.addEventListener("click", () => {
      tareas.eliminar(tarea.id);
      dibujar();
    });

    li.appendChild(span);
    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });

  resumen.textContent = "Pendientes: " + tareas.pendientes() + " de " + tareas.items.length;
}

// evento submit: agregar con validacion
formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = texto.value.trim();

  if (valor.length < 3) {
    mostrarMensaje("La tarea debe tener al menos 3 caracteres", "error");
    return;
  }
  if (tareas.existe(valor)) {
    mostrarMensaje("Esa tarea ya existe", "error");
    return;
  }

  tareas.agregar(valor);
  mostrarMensaje("Tarea agregada", "ok");
  formTarea.reset();
  contadorCaracteres.textContent = "0 / 60";
  dibujar();
});

// evento input: contador de caracteres
texto.addEventListener("input", () => {
  contadorCaracteres.textContent = texto.value.length + " / 60";
});

// evento input: buscador
buscador.addEventListener("input", dibujar);

dibujar();
