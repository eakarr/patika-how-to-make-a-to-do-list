function createElement(element) {
  const li = document.createElement("li");
  const spanCheck = document.createElement("SPAN");
  const spanRemove = document.createElement("SPAN");
  const crossSign = document.createTextNode("\u00D7");
  const task = document.createTextNode(element.message);

  spanRemove.classList.add("remove");
  spanRemove.appendChild(crossSign);
  spanRemove.addEventListener("click", function () {
    removeElement(element.id);
  });

  li.appendChild(spanCheck);
  li.appendChild(task);
  li.appendChild(spanRemove);
  li.addEventListener("click", function (event) {
    toggleTodo(event, element.id);
  });

  if (element.checkStatus) {
    li.classList.add("checked");
  }

  return li;
}

function toggleTodo(event, id) {
  event.target.classList.toggle("checked");
  const tasks = localStorage.getItem("tasks");
  const tasksArray = JSON.parse(tasks);
  const index = tasksArray.findIndex((element) => element.id === id);
  const task = tasksArray[index];
  if (!task) {
    return;
  }
  task.checkStatus = event.target.classList.contains("checked");
  tasksArray[index] = task;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function removeElement(id) {
  const tasks = localStorage.getItem("tasks");
  const tasksArray = JSON.parse(tasks);
  const updatedTasksArray = tasksArray.filter((element) => element.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasksArray));
  load();
}

function appendNode(node) {
  const ul = document.querySelector("#list");
  ul.appendChild(node);
}

function load() {
  const ul = document.querySelector("#list");
  ul.innerHTML = "";

  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    const tasksArray = JSON.parse(tasks);
    tasksArray.forEach((element) => {
      const node = createElement(element);
      appendNode(node);
    });
  }
}

function successToast() {
  const successAlert = document.querySelector("#success");
  const bsAlert = new bootstrap.Toast(successAlert);
  bsAlert.show();
}

function errorToast() {
  const errorAlert = document.querySelector("#error");
  const bsAlert = new bootstrap.Toast(errorAlert);
  bsAlert.show();
}

function addNewTodo() {
  const message = document.querySelector("#task").value.trim();
  if (message == "") {
    errorToast();
    document.querySelector("#task").value = "";
  } else {
    const id = Date.now();
    const checkStatus = false;
    const task = { id, message, checkStatus };
    const node = createElement(task);
    appendNode(node);
    saveToLocalStorage(task);
    successToast();
    document.querySelector("#task").value = "";
  }
}

function saveToLocalStorage(task) {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    const tasksArray = JSON.parse(tasks);
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  } else {
    const tasksArray = [task];
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
}

window.addEventListener("load", load);
