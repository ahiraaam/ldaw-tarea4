function storeTask() {
  console.log("Stores the tasks");
  // Javascript
  let taskDescription = document.getElementById("task_description").value;
  console.log("taskDescription", taskDescription);

  let payload = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: taskDescription }),
  };
  fetch("/tasks", payload)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then((task) => {
      document.getElementById("task_description").value = "";
      addTask(task);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function addTask(task) {
  let html = `
  <div id="${task.id}" "class="card my-3" class="card my-3 {{#eq status 'done' }}bg-light{{/eq}}">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
        <a href="javascript:;" id="button_done_${task.id}" onclick="changeStatus(${task.id});"  class="card-link">Done</a>
        <a href="javascript:;"  onclick="deleteTask(${task.id});"  class="card-link">Delete</a>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById("task_list").prepend(node);
}

function changeStatus(id) {
  // Javascript
  console.log("ide status", id);

  let payload = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  };
  fetch("/changeStatus", payload)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then((task) => {
      console.log("ACTUALIZADO", task);
      updateTask(id);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function updateTask(id) {
  document.getElementById(id).classList.add("bg-light");
  document.getElementById("button_done_" + id).remove();
}

function deleteTask(id) {
  console.log("delete task", id);
  let payload = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  };

  fetch("/deleteTask", payload)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax a done";
      }
    })
    .then((task) => {
      remove(id);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function remove(id) {
  var div = document.getElementById(id);
  div.parentNode.removeChild(div);
}
