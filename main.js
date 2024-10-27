let taskInput = document.getElementById("task-input");
let addTask = document.getElementById("add-task");
let taskSeparation = document.querySelectorAll("#task-separation div");
let taskList = [];
let someList = taskList;
let sectionChoose = "All";
let taskContent = "";

let buttonSection = (event) => {
  sectionChoose = event.target.textContent;
  someList = [];

  taskSeparation.forEach((item) => {
    item.classList.remove("background");
  });

  event.target.classList.add("background");

  if (sectionChoose === "All") {
    render();
  } else if (sectionChoose === "Doing") {
    taskList.forEach((task) => {
      if (!task.isComplete) {
        someList.push(task);
      }
    });
  } else if (sectionChoose === "Done") {
    taskList.forEach((task) => {
      if (task.isComplete) {
        someList.push(task);
      }
    });
  }

  render();
};

taskSeparation.forEach((item) => {
  item.addEventListener("click", buttonSection);
});

let taskPush = () => {
  if (taskInput.value.trim() === "") return;
  taskContent = {
    value: taskInput.value,
    id: randomID(),
    isComplete: false,
  };
  taskList.push(taskContent);
  taskInput.value = "";
  render();
};

addTask.addEventListener("click", taskPush);

let render = () => {
  let List = [];
  if (sectionChoose === "All") {
    List = taskList;
  } else {
    List = someList;
  }

  let result = "";
  List.forEach((items) => {
    result += `
      <div class="task-flex">
        <div class="${items.isComplete ? "complete" : ""}">${items.value}</div>
        <div>
          <button onclick="taskComplete('${items.id}')">check</button>
          <button onclick="taskDelete('${items.id}')">delete</button>
        </div>
      </div>`;
  });
  document.getElementById("task").innerHTML = result;
};

let taskComplete = (event) => {
  taskList.forEach((items) => {
    if (event === items.id) {
      items.isComplete = !items.isComplete;
    }
  });
  render();
};

let taskDelete = (event) => {
  taskList.forEach((items, index) => {
    if (event === items.id) {
      taskList.splice(index, 1);
    }
  });
  someList.forEach((items, index) => {
    if (event === items.id) {
      someList.splice(index, 1);
    }
  });
  render();
};

let randomID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

render();
