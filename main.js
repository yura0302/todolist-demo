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

let TaskList = [];
const TaskInput = document.getElementById("task-input");
const PlusButton = document.getElementById("plus-button");

PlusButton.addEventListener("click", plusTask);

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
  let resultHTML = "";
  for (let i = 1; i < TaskList.length; i++) {
    if (TaskList[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${TaskList[i].TaskContent}</div>
      <div>
        <button onclick="toggleComplete('${TaskList[i].id}')">Check</button>
        <button onclick="deleteTask('${TaskList[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${TaskList[i].TaskContent}</div>
            <div>
              <button onclick="toggleComplete('${TaskList[i].id}')">Check</button>
              <button onclick="deleteTask('${TaskList[i].id}')">Delete</button>
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

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

plusTask();
