//input에 내용을 받는다.
//+를 눌러 내용을 task로 보낸다.
//check를 누르면 삭선&회색 으로 됐다는 표시를 한다.
//delete를 누르면 삭제되게 한다.
//section에 따라 변하게한다.
//input에 글씨가 없으면 button을 비활성화 시킨다.

let addInput = document.getElementById("add-input");
let addButton = document.getElementById("add-button");
let taskSection = document.querySelectorAll("#task-section div");
let slideLine = document.getElementById("slide-line");
let filterList = [];
let taskList = [];
let selection = "all";

const task = document.getElementById("task");

addButton.addEventListener("click", pushTask);

addInput.addEventListener("input", eraser);
addInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && addInput.value.trim() != "") {
    pushTask();
  }
});

function eraser() {
  if (addInput.value.trim() != "") {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}

for (let i = 1; i < taskSection.length; i++) {
  taskSection[i].addEventListener("click", section);
}

function pushTask() {
  taskContent = {
    value: addInput.value,
    IsComplete: false,
    id: randomId(),
  };
  taskList.push(taskContent);
  console.log(taskList);
  render();
  addInput.value = "";
  addButton.disabled = true;
}

function render() {
  let list = [];
  if (selection === "all") {
    list = taskList;
  } else if (selection === "done" || selection === "doing") {
    list = filterList;
  }
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].IsComplete === false) {
      result += `<div class="task-content">
      <div class="task-width">${list[i].value}</div>
      <div div class="check-button">
        <button onclick="taskComplete ('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="taskDelete ('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
      </div>`;
    } else if (list[i].IsComplete === true) {
      result += `<div class="task-content">
      <div class="task-complete task-width">${list[i].value}</div>
      <div class="check-button">
        <button onclick="taskComplete ('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="taskDelete ('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
      </div>`;
    }
  }
  task.innerHTML = result;
}

function taskComplete(event) {
  for (let i = 0; i < taskList.length; i++) {
    if (event === taskList[i].id) {
      taskList[i].IsComplete = !taskList[i].IsComplete;
    }
  }
  render();
}

function taskDelete(event) {
  for (let i = 0; i < taskList.length; i++) {
    if (event === taskList[i].id) {
      taskList.splice(i, 1);
    }
  }
  render();
  console.log(taskList);
}

function section(event) {
  selection = event.target.id;
  filterList = [];
  if (selection === "all") {
    render();
  } else if (selection === "done") {
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].IsComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (selection === "doing") {
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].IsComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
