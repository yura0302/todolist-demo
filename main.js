// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 보여준다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let TaskList = [];
const TaskInput = document.getElementById("task-input");
const PlusButton = document.getElementById("plus-button");

PlusButton.addEventListener("click", plusTask);

function plusTask() {
  let TaskContent = TaskInput.value;
  TaskList.push(TaskContent);
  console.log(TaskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 1; i < TaskList.length; i++) {
    resultHTML += `<div class="task">
            <div>${TaskList[i]}</div>
            <div>
              <button>Check</button>
              <button>Delete</button>
            </div>
          </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

plusTask();
