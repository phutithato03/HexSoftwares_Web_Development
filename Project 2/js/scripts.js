document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value = '';
}

function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (completed) li.classList.add('completed');

    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.textContent = taskText;

    // Create the Mark Completed button
    const markCompletedButton = document.createElement('button');
    markCompletedButton.className = 'mark-completed';
    markCompletedButton.textContent = completed ? 'Unmark' : 'Mark Completed';
    markCompletedButton.addEventListener('click', () => toggleTaskCompletion(taskTextElement, markCompletedButton));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => deleteTask(li, taskText));

    // Append buttons in the order: Mark Completed, Remove, then Task Text
    li.appendChild(taskTextElement);
    li.appendChild(markCompletedButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function toggleTaskCompletion(taskTextElement, markCompletedButton) {
    const taskItem = taskTextElement.parentElement;
    taskItem.classList.toggle('completed');
    const taskText = taskTextElement.textContent;
    const completed = taskItem.classList.contains('completed');
    
    markCompletedButton.textContent = completed ? 'Unmark' : 'Mark Completed';
    updateTaskStatus(taskText);
}

function deleteTask(taskElement, taskText) {
    taskList.removeChild(taskElement);
    removeTaskFromStorage(taskText);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.text === taskText) task.completed = !task.completed;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
