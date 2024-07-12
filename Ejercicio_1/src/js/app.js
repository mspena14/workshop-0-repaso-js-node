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
        this.id = undefined;
    }

    addTask(description) {
        if (!(this.id == undefined)) {
            this.updateTask(description)
        } else {
            const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
            const task = new Task(id, description);
            this.tasks.push(task);
        }

        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        if (!(confirm('¿Estás seguro de eliminar esta tarea?'))) {
            return
        }
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    showTaskInfo(id, description) {
        this.id = id;
        const preTask = document.getElementById("new-task");
        preTask.value = description;
    }

    updateTask(taskModified) {
        const taksFound = this.tasks.findIndex(task => task.id == this.id);
        this.tasks[taksFound].description = taskModified;
        this.id = undefined;
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id, label) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const taskIntance = new Task(task.id, task.description, task.completed);
            taskIntance.toggleComplete();
            this.tasks = this.tasks.map(noToggledTask => (noToggledTask.id === id ? taskIntance : noToggledTask));
            label.textContent = task.completed ? 'Completada' : 'Incompleta';
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

            const taskTextContainer = document.createElement('span');
            taskTextContainer.textContent = task.description;
            taskTextContainer.className = task.completed ? 'completed' : '';

            const taskCompleteCheckbox = document.createElement('input')
            taskCompleteCheckbox.setAttribute('type', 'checkbox')
            taskCompleteCheckbox.name = task.id
            taskCompleteCheckbox.id = task.id
            taskCompleteCheckbox.checked = task.completed; // Establece el estado del checkbox

            const labelCheckbox = document.createElement('label')
            labelCheckbox.htmlFor = task.id
            labelCheckbox.textContent = task.completed ? 'Completada' : 'Incompleta';

            taskCompleteCheckbox.addEventListener('change', () => {
                this.toggleTaskComplete(task.id, labelCheckbox, taskCompleteCheckbox);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre
                this.deleteTask(task.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Editar';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre
                this.showTaskInfo(task.id, task.description);
            });
            item.appendChild(taskTextContainer)
            item.appendChild(updateButton);
            item.appendChild(deleteButton);
            item.appendChild(taskCompleteCheckbox);
            item.appendChild(labelCheckbox);
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
