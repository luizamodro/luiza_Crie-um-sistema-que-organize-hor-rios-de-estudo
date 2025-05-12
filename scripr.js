const form = document.getElementById('study-form');
const taskInput = document.getElementById('task-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Carregar tarefas do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText && taskTime) {
    addTask(taskText, taskTime);
    saveTask(taskText, taskTime);
    taskInput.value = '';
    timeInput.value = '';
  }
});

function addTask(text, time) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `${time} - ${text}`;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remover';
  deleteBtn.addEventListener('click', function () {
    taskList.removeChild(li);
    removeTask(`${time} - ${text}`);
  });
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text, time) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, time });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.time));
}

function removeTask(taskString) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => `${task.time} - ${task.text}` !== taskString);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}