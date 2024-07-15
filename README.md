# workshop-0-repaso-js-node
# Workshop 0: Repasando JavaScript

## Introducción

Bienvenidos al Workshop 0, donde repasaremos conceptos fundamentales de JavaScript. Este workshop está diseñado para evaluar y reforzar tus conocimientos previos antes de comenzar con el curso de TypeScript y Node.js. A través de actividades prácticas, exploraremos temas clave y desarrollaremos aplicaciones que integren estos conceptos de manera creativa y real.

## Instrucciones de Entrega

1. Crea un nuevo repositorio en tu cuenta de GitHub llamado `workshop-0-repaso-js-node`.
2. Copia las preguntas y ejercicios de este workshop en el archivo `README.md` de tu repositorio.
3. Resuelve cada pregunta y ejercicio en su respectiva sección.
4. Realiza un commit y un push de tus respuestas y código a GitHub.
5. Subir a Moodle en el espacio habilitado de semana 1 el link del repositorio en GitHub. En caso de no estar habilitado el envío en Moodle, enviar el link del repo a `nicolas.picon@riwi.io`.

## Instrucciones Generales

1. No se aceptarán preguntas sobre ninguno de los ejercicios.

## Objetivos

1. **Conocimiento**: Identificar y describir los conceptos clave de JavaScript y Node.js.
2. **Comprensión**: Explicar y comparar diferentes estructuras y técnicas de programación en JavaScript y Node.js.
3. **Aplicación**: Implementar soluciones prácticas que utilicen estos conceptos en aplicaciones reales.

## Punto 1: Ejercicio Guiado - Creando una Aplicación de Gestión de Tareas

En este primer punto, crearás una aplicación de gestión de tareas que te permitirá añadir, editar, eliminar y marcar tareas como completadas. Durante el proceso, se evaluarán los siguientes temas:

- JavaScript Básico
- Manipulación del DOM
- Programación Orientada a Objetos (OOP)
- Eventos en JavaScript
- Variables y Tipos de Datos
- Control de Flujo
- Funciones de Flecha
- JSON
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de tareas que me permita añadir, editar, eliminar y marcar tareas como completadas para organizar mis actividades diarias de manera eficiente.

### Criterios de Aceptación

1. **Añadir una Tarea**:
   - Debe existir un campo de entrada y un botón para añadir una nueva tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Tarea**:
   - Debe ser posible editar la descripción de una tarea existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Tarea**:
   - Debe existir un botón para eliminar una tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Tarea como Completada**:
   - Debe ser posible marcar una tarea como completada y debe visualizarse de manera diferente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Tareas en localStorage**:
   - Las tareas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.


#### HTML

```html
<!DOCTYPE html> <!-- Recordemos que el DOCTYPE es la primera línea de un documento HTML y se utiliza para indicar al navegador qué tipo de documento se está utilizando. -->
<html lang="en"> <!-- La etiqueta <html> es el contenedor raíz de todo el contenido de una página web. El atributo lang se utiliza para especificar el idioma de la página. -->
<head> <!-- La etiqueta <head> contiene información sobre el documento, como metadatos, enlaces a estilos y scripts, y otros elementos que no se muestran directamente en la página. -->
    <meta charset="UTF-8"> <!-- La etiqueta <meta> se utiliza para especificar metadatos, como el juego de caracteres utilizado en el documento. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- La etiqueta <meta> con el atributo name="viewport" se utiliza para controlar el tamaño y la escala de la página en dispositivos móviles. -->
    <title>Gestión de Tareas</title> <!-- La etiqueta <title> se utiliza para especificar el título de la página, que se muestra en la pestaña del navegador. -->
    <link rel="stylesheet" href="styles.css"> <!-- La etiqueta <link> se utiliza para enlazar una hoja de estilos externa con la página. -->
</head>
<body> <!-- La etiqueta <body> contiene todo el contenido visible de una página web, como texto, imágenes, enlaces, formularios, etc. -->
    <div id="app"> <!-- La etiqueta <div> se utiliza para agrupar elementos y crear secciones en una página web. El atributo id se utiliza para identificar un elemento de forma única. -->
        <h1>Gestión de Tareas</h1> <!-- La etiqueta <h1> se utiliza para definir un encabezado de nivel 1 en una página web. -->
        <input type="text" id="new-task" placeholder="Nueva tarea"> <!-- La etiqueta <input> se utiliza para crear campos de entrada en formularios. El atributo type se utiliza para especificar el tipo de campo (e.g., texto). El atributo id se utiliza para identificar un campo de forma única. El atributo placeholder se utiliza para mostrar un texto de ayuda en el campo. -->
        <button id="add-task">Añadir Tarea</button> <!-- La etiqueta <button> se utiliza para crear botones en una página web. El atributo id se utiliza para identificar un botón de forma única. -->
        <ul id="task-list"></ul> <!-- La etiqueta <ul> se utiliza para crear listas no ordenadas en una página web. El atributo id se utiliza para identificar una lista de forma única. -->
    </div>
    <script src="app.js"></script> <!-- La etiqueta <script> se utiliza para enlazar un archivo de script con la página. -->
</body>
</html>
```

#### JavaScript

```javascript
class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});
```
3. **Ejecución**: Probar la aplicación en un navegador y realizar las siguientes acciones:
    - Probar funcionalidad del codigo. Si encuentras errores, depurar el código, corregirlos y generar un informe de los errores encontrados y como los corregiste.
    - Añadir una nueva tarea.
    - Marcar una tarea como completada.
    - Eliminar una tarea.
    - Verificar que las tareas se almacenan y recuperan correctamente en `localStorage`.
4. **Analisis**: Explicar el código proporcionado linea por linea en el archivo `README.md` de tu repositorio.

## Punto 2: Ejercicio Independiente - Creando una Aplicación de Gestión de Notas

En este segundo punto, crearás una aplicación de gestión de notas que te permitirá añadir, editar, eliminar y marcar notas como importantes. Durante el proceso, se evaluarán los siguientes temas:

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de notas para poder añadir, editar, eliminar y marcar notas como importantes, de manera que pueda organizar mis tareas y recordatorios de forma eficiente.

### Criterios de Aceptación

1. **Añadir una Nota**:
   - Debe existir un campo de entrada y un botón para añadir una nueva nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Nota**:
   - Debe ser posible editar la descripción de una nota existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Nota**:
   - Debe existir un botón para eliminar una nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Nota como Importante**:
   - Debe ser posible marcar una nota como importante y debe visualizarse de manera destacada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Notas en localStorage**:
   - Las notas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.

### Ejercicio

Desarrolla la aplicación de acuerdo a los criterios de aceptación mencionados. Asegúrate de probar la aplicación en un navegador y realizar las siguientes acciones:

1. Añadir una nueva nota.
2. Editar una nota existente.
3. Marcar una nota como importante.
4. Eliminar una nota.
5. Verificar que las notas se almacenan y recuperan correctamente en `localStorage`.
6. Documentar el proceso y el código en el archivo `README.md` de tu repositorio.

## Punto 3: Ejercicio Guiado - Consumiendo una API con JSONPlaceholder

En este tercer punto, crearás una aplicación que consuma datos de una API utilizando JSONPlaceholder. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que consuma datos de una API pública, para visualizar y gestionar información de manera eficiente.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/posts).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

4. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha.

### Ejemplo de Código

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consumiendo API con JSONPlaceholder</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>Listado de Posts</h1>
        <button id="fetch-posts">Cargar Posts</button>
        <ul id="post-list"></ul>
        <div id="error-message"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
```

### Ejecución

1. Añadir un botón en el HTML para iniciar la solicitud de la API.
2. Crear una función en JavaScript para consumir la API utilizando `fetch`.
3. Manejar las promesas y los posibles errores de la solicitud.
4. Mostrar los datos obtenidos de la API en la página.
5. Implementar métodos de depuración para el manejo de errores y validación.

### Análisis

Explica el código proporcionado línea por línea en el archivo `README.md` de tu repositorio. Asegúrate de describir cómo se aplican los conceptos de control de flujo, funciones de flecha, JSON, promesas y depuración.

## Punto 4: Ejercicio Independiente - Creando una Aplicación de Gestión de Productos con la API de Platzi

En este cuarto punto, crearás una aplicación que consuma datos de la API de Platzi Fake Store y muestre la información de productos de manera interactiva y visualmente atractiva. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que me permita ver y gestionar productos de una tienda en línea, para explorar las opciones disponibles y tomar decisiones de compra informadas.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de Platzi Fake Store (https://fakeapi.platzi.com/).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada y atractiva. Puede usar una tabla, una lista o cualquier otro formato que consideres adecuado.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

4. **Filtrado y Búsqueda**:
   - Implementar funcionalidades de filtrado y búsqueda para que los usuarios puedan encontrar productos específicos.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

5. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

## Punto 5: Ejercicio Independiente - Métodos de Array en JavaScript

En este quinto punto, explorarás y aplicarás diversos métodos de array en JavaScript. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- Métodos de Array (reduce, forEach, map, filter, find, some, every)

### Historia de Usuario

Como usuario, quiero una aplicación que me permita gestionar y analizar una lista de productos utilizando diversos métodos de array, para obtener información relevante y personalizada de manera eficiente.

### Interface de Producto

```javascript

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

```

### Criterios de Aceptación

1. **Visualización de Productos**:
   - La aplicación debe mostrar una lista de productos en la página. Puedes interactuar con el DOM o con la consola del navegador.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, forEach.

2. **Calcular el Precio Total**:
   - La aplicación debe calcular y mostrar el precio total de todos los productos utilizando el método `reduce`.
   - **Concepto de JavaScript aplicado**: reduce.

3. **Filtrar Productos por Categoría**:
   - La aplicación debe permitir filtrar productos por categoría utilizando el método `filter`.
   - **Concepto de JavaScript aplicado**: filter.

4. **Buscar un Producto por Nombre**:
   - La aplicación debe permitir buscar un producto específico por su nombre utilizando el método `find`.
   - **Concepto de JavaScript aplicado**: find.

5. **Verificar Disponibilidad de Productos**:
   - La aplicación debe verificar si todos los productos están disponibles utilizando el método `every`.
   - **Concepto de JavaScript aplicado**: every.

6. **Obtener Nombres de Productos**:
   - La aplicación debe crear una lista con los nombres de todos los productos utilizando el método `map`.
   - **Concepto de JavaScript aplicado**: map.

7. **Depuración y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.

# Solución

## Punto 1:

### Informe de Errores y Correcciones

1. **Error:** La aplicación no permitía editar una tarea.
**Corrección:** Se añadió el método showTaskInfo para cargar la información de la tarea en el campo de entrada y el método updateTask para actualizar la tarea en la lista.

2. **Error:** Las tareas completadas no se mostraban correctamente.
**Corrección:** Se corrigió el método toggleTaskComplete para que actualice correctamente el estado de la tarea en la lista, además se agregaron estilos a la clase completed para que se pudiera diferenciar las tareas competadas de las incompletas y se restingió el escuchador de eventos a un checkbox.

3. **Error:** No se pedía confirmación para la eliminación de una tarea.
**Corrección:** Se añadió una confirmación antes de eliminar una tarea en el método deleteTask.


```CSS
.completed { 
    text-decoration: line-through; /* Línea sobre el texto para tareas completadas. */
    color: gray; /* Color gris para tareas completadas. */
}
```

```html
<!DOCTYPE html> <!-- Indica el tipo de documento como HTML5. -->
<html lang="en"> <!-- Contenedor raíz del contenido HTML, especifica el idioma como inglés. -->
<head> <!-- Contiene metadatos e información sobre el documento. -->
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres del documento como UTF-8. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Ajusta la escala de la página para dispositivos móviles. -->
    <title>Gestión de Tareas</title> <!-- Título de la página, se muestra en la pestaña del navegador. -->
    <link rel="stylesheet" href="./src/css/styles.css"> <!-- Enlaza una hoja de estilos externa. -->
</head>
<body> <!-- Contiene el contenido visible de la página web. -->
    <section id="app"> <!-- Contenedor principal de la aplicación. -->
        <h1>Gestión de Tareas</h1> <!-- Encabezado de nivel 1. -->
        <input type="text" id="new-task" placeholder="Nueva tarea"> <!-- Campo de entrada para añadir nuevas tareas. -->
        <button id="add-task">Añadir Tarea</button> <!-- Botón para añadir tareas. -->
        <ul id="task-list"></ul> <!-- Lista no ordenada para mostrar las tareas. -->
    </section>
    <script src="./src/js/app.js"></script> <!-- Enlaza el archivo JavaScript que contiene la lógica de la aplicación. -->
</body>
</html>
```
```javascript
// Clase Task se utiliza para construir una tarea individual.
class Task {
    constructor(id, description, completed = false) {
        this.id = id; // Identificador único de la tarea.
        this.description = description; // Descripción de la tarea.
        this.completed = completed; // Estado de la tarea, por defecto no completada.
    }

    // Método para cambiar el estado de la tarea entre completada y no completada.
    toggleComplete() {
        this.completed = !this.completed;
    }
}

// Clase TaskManager se usa para manejar la colección de tareas.
class TaskManager {
    constructor() {
        // Carga las tareas desde localStorage o inicializa una lista vacía.
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks(); // Carga y renderiza las tareas al iniciar.
        this.id = undefined; // ID de la tarea que se está editando por defecto en undefined.
    }

    // Método para añadir una nueva tarea o actualizar una existente.
    addTask(description) {
        // Si hay una tarea en edición, la actualiza.
        if (this.id !== undefined) {
            this.updateTask(description);
        } else {
            // Genera un nuevo ID para la tarea.
            const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
            const task = new Task(id, description); // Crea una nueva tarea.
            this.tasks.push(task); // Añade la nueva tarea a la lista.
        }

        this.saveTasks(); // Guarda las tareas en localStorage.
        this.renderTasks(); // Renderiza las tareas.
    }

    // Método para eliminar una tarea por su ID después de confirmar.
    deleteTask(id) {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) { // Confirma antes de eliminar una tarea.
            return;
        }
        // Filtra las tareas, eliminando la tarea con el ID especificado.
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Guarda las tareas en localStorage.
        this.renderTasks(); // Renderiza las tareas.
    }

    // Método para mostrar la información de una tarea en el campo de entrada.
    showTaskInfo(id, description) {
        this.id = id; // Guarda el ID de la tarea en edición.
        const preTask = document.getElementById("new-task"); // Obtiene el campo de entrada de la nueva tarea.
        preTask.value = description; // Muestra la descripción de la tarea en el campo de entrada.
    }

    // Método para actualizar la descripción de una tarea existente.
    updateTask(taskModified) {
        // Encuentra la tarea por su ID.
        const taskFound = this.tasks.findIndex(task => task.id === this.id);
        this.tasks[taskFound].description = taskModified; // Actualiza la descripción de la tarea.
        this.id = undefined; // Resetea el ID de la tarea en edición.
        this.saveTasks(); // Guarda las tareas en localStorage.
        this.renderTasks(); // Renderiza las tareas.
    }

    // Método para cambiar el estado de completado de una tarea.
    toggleTaskComplete(id, label) {
        // Encuentra la tarea por su ID.
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            // Crea una instancia de la tarea.
            const taskInstance = new Task(task.id, task.description, task.completed);
            taskInstance.toggleComplete(); // Cambia el estado de completado de la tarea.
            // Actualiza la lista de tareas.
            this.tasks = this.tasks.map(noToggledTask => (noToggledTask.id === id ? taskInstance : noToggledTask));
            this.saveTasks(); // Guarda las tareas en localStorage.
            this.renderTasks(); // Renderiza las tareas.
        }
    }

    // Método para guardar las tareas en localStorage.
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Método para cargar y renderizar las tareas.
    loadTasks() {
        this.renderTasks();
    }

    // Método para renderizar la lista de tareas en el DOM.
    renderTasks() {
        const taskList = document.getElementById('task-list'); // Obtiene el elemento de la lista de tareas.
        taskList.innerHTML = ''; // Limpia la lista de tareas.
        this.tasks.forEach(task => {
            const item = document.createElement('li'); // Crea un elemento de lista.

            const taskTextContainer = document.createElement('span'); // Crea un contenedor de texto para la tarea.
            taskTextContainer.textContent = task.description; // Añade la descripción de la tarea.
            taskTextContainer.className = task.completed ? 'completed' : ''; // Añade la clase 'completed' si la tarea está completada.

            const taskCompleteCheckbox = document.createElement('input'); // Crea un checkbox.
            taskCompleteCheckbox.setAttribute('type', 'checkbox'); // Establece el tipo de entrada como checkbox.
            taskCompleteCheckbox.name = task.id; // Añade el nombre igual al ID de la tarea.
            taskCompleteCheckbox.id = task.id; // Añade el ID igual al ID de la tarea.
            taskCompleteCheckbox.checked = task.completed; // Establece el estado del checkbox.

            const labelCheckbox = document.createElement('label'); // Crea una etiqueta para el checkbox.
            labelCheckbox.htmlFor = task.id; // Asocia el label con el checkbox.
            labelCheckbox.textContent = task.completed ? 'Completada' : 'Incompleta'; // Texto del label según el estado de la tarea.

            // Añade un event listener para cambiar el estado de la tarea.
            taskCompleteCheckbox.addEventListener('change', () => {
                this.toggleTaskComplete(task.id, labelCheckbox, taskCompleteCheckbox);
            });

            const deleteButton = document.createElement('button'); // Crea un botón de eliminar.
            deleteButton.textContent = 'Eliminar'; // Establece el texto del botón de eliminar.
            // Añade un event listener para eliminar la tarea.
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el evento se propague al elemento padre.
                this.deleteTask(task.id); // Llama al método de eliminar tarea.
            });

            const updateButton = document.createElement('button'); // Crea un botón de editar.
            updateButton.textContent = 'Editar'; // Establece el texto del botón de editar.
            // Añade un event listener para editar la tarea.
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el evento se propague al elemento padre.
                this.showTaskInfo(task.id, task.description); // Muestra la información de la tarea en el campo de entrada.
            });

            item.appendChild(taskTextContainer); // Añade el contenedor de texto de la tarea al elemento de lista.
            item.appendChild(updateButton); // Añade el botón de editar al elemento de lista.
            item.appendChild(deleteButton); // Añade el botón de eliminar al elemento de lista.
            item.appendChild(taskCompleteCheckbox); // Añade el checkbox de completado al elemento de lista.
            item.appendChild(labelCheckbox); // Añade el label del checkbox al elemento de lista.
            taskList.appendChild(item); // Añade la tarea a la lista.
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { // Se ejecuta cuando el contenido del DOM está completamente cargado.
    const taskManager = new TaskManager(); // Crea una instancia de TaskManager.

    // Añade un event listener al botón de añadir tarea.
    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value; // Obtiene el valor del campo de entrada de la nueva tarea.
        if (newTask) {
            taskManager.addTask(newTask); // Añade una nueva tarea.
            document.getElementById('new-task').value = ''; // Limpia el campo de entrada.
        }
    });
});
```

## Punto 2

```html
<!DOCTYPE html> <!-- Recordemos que el DOCTYPE es la primera línea de un documento HTML y se utiliza para indicar al navegador qué tipo de documento se está utilizando. -->
<html lang="en"> <!-- La etiqueta <html> es el contenedor raíz de todo el contenido de una página web. El atributo lang se utiliza para especificar el idioma de la página. -->
<head> <!-- La etiqueta <head> contiene información sobre el documento, como metadatos, enlaces a estilos y scripts, y otros elementos que no se muestran directamente en la página. -->
    <meta charset="UTF-8"> <!-- La etiqueta <meta> se utiliza para especificar metadatos, como el juego de caracteres utilizado en el documento. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- La etiqueta <meta> con el atributo name="viewport" se utiliza para controlar el tamaño y la escala de la página en dispositivos móviles. -->
    <title>Gestión de Notas</title> <!-- La etiqueta <title> se utiliza para especificar el título de la página, que se muestra en la pestaña del navegador. -->
</head>

<body> <!-- La etiqueta <body> contiene todo el contenido visible de una página web, como texto, imágenes, enlaces, formularios, etc. -->
    <div id="app"> <!-- La etiqueta <div> se utiliza para agrupar elementos y crear secciones en una página web.-->
        <h1>Gestión de Notas</h1> <!-- La etiqueta <h1> se utiliza para definir un encabezado de nivel 1 en una página web. -->
        <input type="text" id="new-note" placeholder="Nueva nota"> <!-- La etiqueta <input> se utiliza para crear campos de entrada en formularios. El atributo type se utiliza para especificar el tipo de campo. El atributo placeholder se utiliza para mostrar un texto de ayuda en el campo. -->
        <button id="add-note">Añadir Nota</button> <!-- La etiqueta <button> se utiliza para crear botones en una página web. El atributo id se utiliza para identificar un botón de forma única. -->
        <ul id="notes-list"></ul> <!-- La etiqueta <ul> se utiliza para crear listas no ordenadas en una página web. -->
    </div>
    <script src="./src/js/app.js"></script> <!-- La etiqueta <script> se utiliza para enlazar un archivo de script con la página. -->
</body>
</html>
```

```Javascript
// Clase Note se tiliza para construir una nota individual.
class Note {
  constructor(id, description, isImportant = false) {
    this.id = id; // Identificador único de la nota.
    this.description = description; // Descripción de la nota.
    this.isImportant = isImportant; // Estado de la nota, por defecto no importante.
  }

  // Método para cambiar el estado de importancia de la nota.
  toggleImportance() {
    this.isImportant = !this.isImportant;
  }
}

// Clase NoteManager se utiliza para manejar la colección de notas.
class NoteManager {
  constructor() {
    // Carga las notas desde localStorage o inicializa una lista vacía.
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    this.loadNotes(); // Carga y renderiza las notas al iniciar.
    this.id = undefined; // ID de la nota que se está editando por defecto en undefined.
  }

  // Método para añadir una nueva nota o actualizar una existente.
  addNote(description) {
    // Si hay una nota en edición, la actualiza.
    if (this.id !== undefined) {
      this.updateNote(description);
    } else {
      // Genera un nuevo ID para la nota.
      const id = this.notes.length
        ? this.notes[this.notes.length - 1].id + 1 : 1;
      const note = new Note(id, description); // Crea una nueva nota.
      this.notes.push(note); // Añade la nueva nota a la lista.
    }

    this.saveNotes(); // Guarda las notas en localStorage.
    this.renderNotes(); // Renderiza las notas.
  }

  // Método para eliminar una nota por su ID después de confirmar.
  deleteNote(id) {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) { // Confirma antes de eliminar una nota.
      return;
    }
    // Filtra las notas, eliminando la nota con el ID especificado.
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes(); // Guarda las notas en localStorage.
    this.renderNotes(); // Renderiza las notas.
  }

  // Método para mostrar la información de una nota en el campo de entrada.
  showNoteInfo(id, description) {
    this.id = id; // Guarda el ID de la nota en edición.
    const preNote = document.getElementById("new-note"); // Obtiene el campo de entrada de la nueva nota.
    preNote.value = description; // Muestra la descripción de la nota en el campo de entrada.
  }

  // Método para actualizar la descripción de una nota existente.
  updateNote(noteModified) {
    // Encuentra la nota por su ID.
    const noteFound = this.notes.findIndex((note) => note.id == this.id);
    this.notes[noteFound].description = noteModified; // Actualiza la descripción de la nota.
    this.id = undefined; // Resetea el ID de la nota en edición.
    this.saveNotes(); // Guarda las notas en localStorage.
    this.renderNotes(); // Renderiza las notas.
  }

  // Método para cambiar el estado de importancia de una nota.
  toggleNoteImportance(id) {
    // Encuentra la nota por su ID.
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      // Crea una instancia de la nota.
      const noteInstance = new Note(note.id, note.description, note.isImportant);
      noteInstance.toggleImportance(); // Cambia el estado de importancia de la nota.
      // Actualiza la lista de notas.
      this.notes = this.notes.map((noteTog) =>
        noteTog.id === id ? noteInstance : noteTog
      );
      this.saveNotes(); // Guarda las notas en localStorage.
      this.renderNotes(); // Renderiza las notas.
    }
  }

  // Método para guardar las notas en localStorage.
  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  // Método para cargar y renderizar las notas.
  loadNotes() {
    this.renderNotes();
  }

  // Método para renderizar la lista de notas en el DOM.
  renderNotes() {
    const noteList = document.getElementById("notes-list"); // Obtiene el elemento de la lista de notas.
    noteList.innerHTML = ""; // Limpia la lista de notas.
    this.notes.forEach((note) => {
      const item = document.createElement("li"); // Crea un elemento de lista.

      const noteCheckbox = document.createElement('input'); // Crea un checkbox.
      noteCheckbox.setAttribute('type', 'checkbox'); // Establece el tipo de entrada como checkbox.
      noteCheckbox.name = note.id; // Añade el nombre igual al ID de la nota.
      noteCheckbox.id = note.id; // Añade el ID igual al ID de la nota.
      noteCheckbox.checked = note.isImportant; // Establece el estado del checkbox.
      // Añade un event listener para cambiar el estado de importancia de la nota.
      noteCheckbox.addEventListener("change", () => this.toggleNoteImportance(note.id));

      const labelCheckbox = document.createElement('label'); // Crea una etiqueta para el checkbox.
      labelCheckbox.htmlFor = note.id; // Asocia el label con el checkbox.
      labelCheckbox.textContent = note.isImportant ? '¡Importante!' : 'Nota normal'; // Texto del label según el estado de la nota.

      if (note.isImportant) {
        const strongText = document.createElement("strong"); // Crea un elemento de texto en negrita.
        strongText.textContent = note.description; // Añade la descripción de la nota.
        item.appendChild(strongText); // Añade el texto en negrita al elemento de lista.
      } else {
        item.textContent = note.description; // Añade la descripción de la nota al elemento de lista.
      }
      
      const deleteButton = document.createElement("button"); // Crea un botón de eliminar.
      deleteButton.textContent = "Eliminar"; // Establece el texto del botón de eliminar.
      // Añade un event listener para eliminar la nota.
      deleteButton.addEventListener("click", (e) => {
        this.deleteNote(note.id); // Llama al método de eliminar nota.
      });

      const updateButton = document.createElement("button"); // Crea un botón de editar.
      updateButton.textContent = "Editar"; // Establece el texto del botón de editar.
      // Añade un event listener para editar la nota.
      updateButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre.
        this.showNoteInfo(note.id, note.description); // Muestra la información de la nota en el campo de entrada.
      });

      item.appendChild(updateButton); // Añade el botón de editar al elemento de lista.
      item.appendChild(deleteButton); // Añade el botón de eliminar al elemento de lista.
      item.appendChild(noteCheckbox); // Añade el checkbox de importancia al elemento de lista.
      item.appendChild(labelCheckbox); // Añade el label del checkbox al elemento de lista.
      noteList.appendChild(item); // Añade la nota a la lista.
    });
  }
}

document.addEventListener("DOMContentLoaded", () => { // Se ejecuta cuando el contenido del DOM está completamente cargado.
  const noteManager = new NoteManager(); // Crea una instancia de NoteManager.

  // Añade un event listener al botón de añadir nota.
  document.getElementById("add-note").addEventListener("click", () => {
    const newNote = document.getElementById("new-note").value; // Obtiene el valor del campo de entrada de la nueva nota.
    if (newNote) {
      noteManager.addNote(newNote); // Añade una nueva nota.
      document.getElementById("new-note").value = ""; // Limpia el campo de entrada.
    }
  });
});
```

## Punto 3

```` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres del documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Controla el tamaño y la escala en dispositivos móviles -->
    <title>Consumiendo API con JSONPlaceholder</title> <!-- Título de la página mostrado en la pestaña del navegador -->
</head>
<body>
    <div id="app">
        <h1>Listado de Posts</h1> <!-- Encabezado principal -->
        <button id="fetch-posts">Cargar Posts</button> <!-- Botón para cargar los posts -->
        <ul id="post-list"></ul> <!-- Lista donde se mostrarán los posts -->
        <div id="error-message"></div> <!-- Mensaje de error en caso de problemas con la carga de posts -->
    </div>
    <script src="./src/js/app.js"></script> <!-- Enlace al archivo JavaScript que maneja la lógica de la página -->
</body>
</html>

````

```Javascript
// Event listener para el botón 'Cargar Posts'
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();// Se llama a la función encargada de cargar los post traidos por la API.
});

// Función para hacer la solicitud a la API y manejar la respuesta
const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) { // Verifica si la respuesta de la red es exitosa
                throw new Error('Network response was not ok ' + response.statusText); // Lanza un error personalizado si la respuesta no es exitosa
            }
            return response.json(); // Convierte la respuesta a JSON y la devuelve
        })
        .then(posts => {
            displayPosts(posts); // Llama a la función para mostrar los posts en la UI
        })
        .catch(error => {
            displayError(error); // Captura cualquier error y muestra un mensaje de error en la UI
        });
};

// Función para mostrar los posts en la lista
const displayPosts = (posts) => {
    const postList = document.getElementById('post-list'); // Obtiene el elemento de la lista de posts
    postList.innerHTML = ''; // Limpia cualquier contenido previo de la lista
    posts.forEach(post => {
        const listItem = document.createElement('li'); // Crea un elemento de lista para cada post
        const titleItem = document.createElement('h3'); // Crea un elemento de encabezado para el título del post
        const textItem = document.createElement('p'); // Crea un elemento de párrafo para el cuerpo del post
        titleItem.textContent = `Title: ${post.title}`; // Establece el texto del título del post
        textItem.textContent = `Post: ${post.body}`; // Establece el texto del cuerpo del post
        listItem.appendChild(titleItem); // Añade el título al elemento de lista
        listItem.appendChild(textItem); // Añade el cuerpo del post al elemento de lista
        postList.appendChild(listItem); // Añade el elemento de lista a la lista de posts
    });
};

// Función para mostrar un mensaje de error en caso de falla en la solicitud
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message'); // Obtiene el elemento donde se mostrará el mensaje de error
    errorMessage.textContent = `Error: ${error.message}`; // Muestra el mensaje de error
};
```

## Punto 4

```` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8"> <!-- Define la codificación de caracteres del documento -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Controla el tamaño y la escala en dispositivos móviles -->
  <title>Product Management with the Platzi API</title> <!-- Título de la página mostrado en la pestaña del navegador -->
</head>

<body>
  <section id="app">
    <h1>Platzi Store Products</h1> <!-- Encabezado principal -->
    <input type="search" id="search-input" placeholder="Search by name"> <!-- Campo de búsqueda por nombre -->
    <button id="search-product">Search</button> <!-- Botón para activar la búsqueda -->

    <select name="select" id="category-select"> <!-- Menú desplegable para filtrar por categoría -->
      <option value="All">All</option> <!-- Opción para mostrar todos los productos -->
      <option value="Clothes">Clothes</option> <!-- Opciones para filtrar por categoría -->
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
      <option value="Shoes">Shoes</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>

    <table>
      <thead>
        <tr>
          <th scope="col">ID</th> <!-- Encabezado de columna para ID -->
          <th scope="col">Category</th> <!-- Encabezado de columna para Category -->
          <th scope="col">Product</th> <!-- Encabezado de columna para Product -->
          <th scope="col">Price by unit</th> <!-- Encabezado de columna para Price -->
          <th scope="col">Image</th> <!-- Encabezado de columna para Image -->
          <th scope="col">Description</th> <!-- Encabezado de columna para Description -->
        </tr>
      </thead>
      <tbody id="tbody"> <!-- Cuerpo de la tabla donde se insertarán los productos -->

      </tbody>
    </table>
  </section>
  <script src="./src/js/app.js"></script> <!-- Enlace al archivo JavaScript que maneja la lógica de la página -->
</body>

</html>
````

```Javascript
let data; // Variable global para almacenar los datos de los productos

const fetchPosts = () => {
    fetch('https://api.escuelajs.co/api/v1/products') // Fetch para obtener los productos desde la API
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText); // Manejo de errores si la respuesta no es exitosa
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(posts => {
            data = posts; // Almacenar los datos de los productos en la variable global
            displayPosts(posts); // Llamar a la función para mostrar los productos
        })
        .catch(error => {
            displayError(error); // Mostrar mensaje de error si ocurre algún problema
        });
};

const displayPosts = (posts) => {
    const tbody = document.getElementById('tbody'); // Obtener el cuerpo de la tabla
    tbody.innerHTML = ''; // Limpiar contenido anterior

    posts.forEach(post => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${post.id}</td> <!-- Mostrar el ID del producto -->
            <td scope="col">${post.category.name}</td> <!-- Mostrar la categoría del producto -->
            <td scope="col">${post.title}</td> <!-- Mostrar el nombre del producto -->
            <td scope="col">$${post.price}</td> <!-- Mostrar el precio del producto -->
            <td scope="col"><img src=${post.images[0]} width="100px" alt="${post.title}"></td> <!-- Mostrar la imagen del producto -->
            <td scope="col">${post.description}</td> <!-- Mostrar la descripción del producto -->
        </tr>
        `;
    });
}

const InfoFiltered = (category) => {
    const categorizedPosts = data.filter((post) => post.category.name === category); // Filtrar productos por categoría
    displayPosts(categorizedPosts); // Mostrar productos filtrados
}

const infoFound = (wordToSearch) => {
    if (wordToSearch) {
        const searchResults = data.filter((post) => post.title.toLowerCase().includes(wordToSearch.toLowerCase())); // Filtrar productos por búsqueda de palabra clave en el título
        displayPosts(searchResults); // Mostrar resultados de búsqueda
    }
}

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message'); // Obtener el elemento donde se mostrará el mensaje de error
    errorMessage.textContent = `Error: ${error.message}`; // Mostrar mensaje de error
};

const categorySelect = document.getElementById('category-select'); // Obtener el menú desplegable de categorías
categorySelect.addEventListener('change', () => {
    const category = categorySelect.value; // Obtener el valor seleccionado del menú desplegable

    if (!(category === 'All')) {
        InfoFiltered(category); // Filtrar y mostrar productos de acuerdo a la categoría seleccionada
    } else {
        fetchPosts(); // Mostrar todos los productos si se selecciona 'All'
    }
});

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-input').value; // Obtener la palabra clave de búsqueda
    infoFound(wordToSearch); // Filtrar y mostrar productos según la palabra clave ingresada
})

fetchPosts(); // Cargar productos al cargar la página

```

## Punto 5

```` html

````

```Javascript

```