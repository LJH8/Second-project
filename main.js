// 1.text창에 값을 입력하고 오른쪽 화살표 버튼을 누르면 아래에 추가됨

let writetext = document.getElementById("input-text");
let sendbutton = document.getElementById("send-button");
let list = [];
sendbutton.addEventListener("click", additem);
writetext.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendbutton.click();
  }
});

// 텍스트 입력후 오른쪽 화살표 버튼을 누를시 render 함수 호출
function additem() {
  let content = {
    contentvalue: writetext.value,
    id: randomid(),
    status: false,
  };
  console.log(content);

  if (content.contentvalue == "") {
    alert("재입력");
  } else {
    list.push(content);
    writetext.value = "";
    writetext.focus();

    render();
  }
}

// 텍스트를 아래 list에 추가
function render() {
  console.log(list.length);
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].status == true) {
      result += `
  <ul id = "alllist">
    <li id = "check" onclick ="complete('${list[i].id}')">${list[i].contentvalue}
    <div>
      <i class="fa-solid fa-trash-can" id=deleteitem  ></i>
      </div>
    </li>
  </ul>
`;
    } else
      result += `
  <ul >
    <li onclick ="complete('${list[i].id}')">${list[i].contentvalue}
      <i class="fa-solid fa-trash-can" id=deleteitem ></i>
    </li>
  </ul>
`;

    document.getElementById("add-list").innerHTML = result;

    // delete 기능
    let itemdelete = document.querySelectorAll("#deleteitem");
    for (let i = 0; i < itemdelete.length; i++) {
      itemdelete[i].onclick = function () {
        list.splice(i, 1);
        render();
      };
    }
  }
}

// list 클릭 시 일정 완료 표시
function complete(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list[i].status = !list[i].status;
      console.log(list[i].status);
    }
  }

  render();
}

function randomid() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
