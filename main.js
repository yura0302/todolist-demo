// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 1. check 버튼 클릭하면, true, false
// 2. true -> 끝난걸로 간주하고 밑줄 보여주기
// 3. false-> 안끝난걸로 간주하고 그대로
// delete버튼을 누르면 할 일이 삭제된다.
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 보여준다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taps = document.querySelectorAll(".task-taps div");
let TaskList = [];
let mode = "all";
let filterList = [];
const TaskInput = document.getElementById("task-input");
const PlusButton = document.getElementById("plus-button");

TaskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("plus-button").click();
  }
});

PlusButton.addEventListener("click", plusTask);

for (let i = 1; i < taps.length; i++) {
  taps[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function plusTask() {
  let task = {
    id: randomIDGenerate(),
    TaskContent: TaskInput.value,
    isComplete: false,
  };
  TaskList.push(task);
  console.log(TaskList);
  render();
}
function render() {
  let list = [];
  if (mode == "all") {
    list = TaskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      // 바꼈을때
      resultHTML += `<div class="task">
            <div class="task-done">${list[i].TaskContent}</div>
            <div class="task-buttons">
        <button class="first-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-reply"></i></button>
        <button class="second-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
    } else {
      // 안바꼈을때
      resultHTML += `<div class="task">
            <div class="task-no-done">${list[i].TaskContent}</div>
            <div class="task-buttons">
              <button class="no-first-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-circle-check"></i></button>
              <button class="no-second-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < TaskList.length; i++) {
    if (TaskList[i].id == id) {
      TaskList[i].isComplete = !TaskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(TaskList);
}

function deleteTask(id) {
  for (let i = 0; i < TaskList.length; i++) {
    if (TaskList[i].id == id) {
      TaskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";
  // 상황별 필터링
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < TaskList.length; i++) {
      if (TaskList[i].isComplete == false) {
        filterList.push(TaskList[i]);
      }
    }

    render();
  } else if (mode == "done") {
    for (let i = 0; i < TaskList.length; i++) {
      if (TaskList[i].isComplete == true) {
        filterList.push(TaskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
