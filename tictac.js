let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg"); 

let turnO = true; // Player O starts
let moveCount = 0; // Count moves to detect draw

const winpatterns = [
  [0,1,2], [0,3,6], [0,4,8],
  [1,4,7], [2,5,8], [2,4,6],
  [3,4,5], [6,7,8]
];

const resetgame = () => {
  turnO = true;
  moveCount = 0;
  enableboxes();
  msgContainer.classList.add("hide");
  turnMsg.innerText = "Player O's Turn";
};

boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    if(turnO){
      box.innerText = 'O';
      box.style.color = "#d62828"; 
      turnO = false;
      turnMsg.innerText = "Player X's Turn"; 
    } else {
      box.innerText = 'X';
      box.style.color = "#003049"; 
      turnO = true;
      turnMsg.innerText = "Player O's Turn"; 
    }
    box.disabled = true;
    moveCount++;
    checkwinner();
  });
});

const disableboxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableboxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};

const showMessage = (text) => {
  msg.innerText = text;
  msgContainer.classList.remove("hide");
  turnMsg.innerText = ""; 
};

const checkwinner = () => {
  for (pattern of winpatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showMessage(`🎉 Congratulations! Winner is ${pos1Val}`);
        disableboxes();
        return;
      }
    }
  }

  // If all 9 moves are played & no winner → Draw
  if(moveCount === 9){
    showMessage("🤝 It's a Draw!");
  }
};

newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);

