let taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
let currentEditId = null;

document.getElementById('openForm').addEventListener('click', function () {
  document.getElementById('modalBox').style.display = "block";
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
});

document.getElementById('newForm').addEventListener('submit', (e) => {
  e.preventDefault();
});

function addTask() {
  const tasksContainer = document.getElementById('tasksContainer');
  const newDiv = document.createElement('div');
  const newP = document.createElement('p');
  const delButton = document.createElement('button');
  const editButton = document.createElement('button');

  const divId = "div_" + JSON.stringify(new Date());
  newDiv.id = divId;

  const taskTopicInput = document.getElementById('taskTopicInput').value;
  const taskInput = document.getElementById('taskInput').value;
  const dateToDo = document.getElementById('dateToDo').value;

  const date = new Date(dateToDo);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  newP.innerHTML = `<b><u>Your task Topic:</u> ${taskTopicInput}</b><br><u>When to do your task:</u> ${day}-${month}-${year}<br><u>Your task:</u> ${taskInput}`;
  delButton.innerHTML = "Delete";
  editButton.innerHTML = "Edit";

  editButton.addEventListener('click', function() {
    openEditForm(divId);
  });

  delButton.addEventListener('click', function() {
    deleteTask(newDiv);
  });

  delButton.className = "submit-button";
  editButton.className = "submit-button";

  newDiv.className = "content";
  newDiv.appendChild(newP);
  newDiv.appendChild(delButton);
  newDiv.appendChild(editButton);
  tasksContainer.appendChild(newDiv);

  const taskObj = {
    id: divId,
    topic: taskTopicInput,
    task: taskInput,
    date: dateToDo
  };

  taskArray.push(taskObj);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));

  closeForm();
}

function deleteTask(div) {
  const parentId = div.id;
  deleteTaskByItsId(parentId);
  div.remove();
}

function closeForm() {
  document.getElementById('modalBox').style.display = "none";
  document.getElementById('editModalBox').style.display = "none";
}

function deleteTaskByItsId(idToBeDeleted) {
  taskArray = taskArray.filter(function (item) {
    return item.id !== idToBeDeleted;
  });
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function openEditForm(divId) {
  currentEditId = divId;
  const selectedTask = taskArray.find(task => task.id === divId);
  document.getElementById('newTaskTopicInput').value = selectedTask.topic;
  document.getElementById('newDateToDo').value = selectedTask.date;

  // Create updated task content
  const updatedContent = `<b><u>Your task Topic:</u> ${selectedTask.topic}</b><br><u>When to do your task:</u> ${selectedTask.date}<br><u>Your task:</u> ${selectedTask.task}`;

  // Update the task content in the DOM
  const editedDiv = document.getElementById(currentEditId);
  editedDiv.querySelector('p').innerHTML = updatedContent;

  const editModalBox = document.getElementById('editModalBox');
  editModalBox.style.display = "block";
}

function updateTask() {
  const newTaskTopicInput = document.getElementById('newTaskTopicInput').value;
  const newTaskInput = document.getElementById('newTaskInput').value;
  const newDateToDo = document.getElementById('newDateToDo').value;

  // Update the task object in taskArray
  const selectedTask = taskArray.find(task => task.id === currentEditId);
  selectedTask.topic = newTaskTopicInput;
  selectedTask.task = newTaskInput;
  selectedTask.date = newDateToDo;

  // Format the date
  const date = new Date(newDateToDo);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Create updated task content
  const updatedContent = `<b><u>Your task Topic:</u> ${newTaskTopicInput}</b><br><u>When to do your task:</u> ${day}-${month}-${year}<br><u>Your task:</u> ${newTaskInput}`;

  // Update the task content in the DOM
  const editedDiv = document.getElementById(currentEditId);
  editedDiv.querySelector('p').innerHTML = updatedContent;

  // Update the taskArray in localStorage
  localStorage.setItem("taskArray", JSON.stringify(taskArray));

  // Close the edit form
  closeForm();
}

window.addEventListener('load', () => {
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = ''; // Clear existing tasks

  taskArray.forEach(task => {
    const newDiv = document.createElement('div');
    newDiv.id = task.id;
    newDiv.className = "content";

    const newP = document.createElement('p');
    newP.innerHTML = `<b><u>Your task Topic:</u> ${task.topic}</b><br><u>When to do your task:</u> ${task.date}<br><u>Your task:</u> ${task.task}`;

    const delButton = document.createElement('button');
    delButton.innerHTML = "Delete";
    delButton.addEventListener('click', function() {
      deleteTask(newDiv);
    });

    const editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    editButton.addEventListener('click', function() {
      openEditForm(task.id);
    });

    delButton.className = "submit-button";
    editButton.className = "submit-button";

    newDiv.appendChild(newP);
    newDiv.appendChild(delButton);
    newDiv.appendChild(editButton);
    tasksContainer.appendChild(newDiv);
  });
});
