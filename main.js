// < 구현할 기능 >
//랜덤번호지정
//유저가 번호 입력하고 GO 버튼을 누른다
// 결과가 나온다
//Reset 버튼을 누르면  게임이 리셋된다
//5번의 기회를 다쓰면 게임끝난다.

// 유저는 숫자를 입력할 수 있다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That’s right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다
// 게임이 종료되면 버튼은 비활성화된다
// 리셋버튼을 누르면 게임이 초기화된다
// 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
// 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI

let randomNum;
let chances = 5;
let gameOver = false;
let history = []
let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");

pickRandomNum();

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", ()=>{userInput.value ="" })
function pickRandomNum() {
  randomNum = Math.floor(Math.random() * 100 + 1); //1~100
  console.log("정답 " + randomNum);
}

function reset() {
  //user-input 창이 꺠끗하게 되고
  userInput.value = "";
  //새로운 난수 발급
  pickRandomNum();
  //배열 초기화
  history=[];
  //기회 재충전
  chances = 5;
  gameOver=false
  playButton.disabled = false;
    resultArea.textContent = "1~100인 숫자를 맞춰보세요";
}

function play() {
  //유효성 검사로직
  let userValue = userInput.value;

  if(userValue < 1 || userValue >100){
    resultArea.textContent = "범위안의 숫자만 입력해주세요"
    return;
  }

  if(history.includes(userValue)){
    resultArea.textContent = "이미 입력한 값입니다. 다시입력하세요"
    return
  }

   //실행 로직(검사로직 통과하면 실행하는코드)
  chances--;
  chanceArea.textContent = `남은 기회는 ${chances}번  입니다`;

  if (userValue > randomNum) {
    resultArea.textContent = "DOWN!!!";
  } else if (userValue < randomNum) {
    resultArea.textContent = "UP!!!";
  } else if (userValue == randomNum) {
    resultArea.textContent = "정답입니다!!! 게임종료";
    gameOver=true
  } else {
    resultArea.textContent = "잘못된 입력입니다 다시 입력하세요";
  }

  history.push(userValue)

  if (chances < 1) {
    gameOver = true;
  } 

 
  if (gameOver) {
    playButton.disabled = true;
  }
}
