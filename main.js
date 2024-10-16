//업 앤 다운 게임

//제목
//목숨칸
//결과칸
//입력칸
//실행칸
//리셋

//랜덤숫자
//사용자 숫자
//숫자 비교
//리셋
//목숨
//숫자 범위

let randomNum = 0;
let userNum = document.getElementById("userNum");
let playArea = document.getElementById("playArea");
let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chanceArea");
let resetArea = document.getElementById("resetArea");
let chance = 5;
let disabled = false;
let userNumArr = [];

playArea.addEventListener("click", comparisonNum);
resetArea.addEventListener("click", reset);
userNum.addEventListener("click", function () {
  userNum.value = "";
});

function randomNumMk() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(randomNum);
}
randomNumMk();

function comparisonNum() {
  if (userNum.value <= 0 || userNum.value > 100) {
    resultArea.textContent = "1~100사이의 숫자를 입력해주세요!";
    return;
  }
  if (userNumArr.includes(userNum.value)) {
    resultArea.textContent = "이미 입력한 숫자입니다!";
    return;
  }

  chance--;
  chanceArea.textContent = `남은 기회 : ${chance}번`;

  if (userNum.value > randomNum) {
    resultArea.textContent = "DOWN!";
  } else if (userNum.value < randomNum) {
    resultArea.textContent = "UP!";
  } else {
    resultArea.textContent = "맞췄습니다!";
    chanceArea.textContent = "!@#$%^&*()_+";
    playArea.disabled = true;
  }

  userNumArr.push(userNum.value);

  if (chance == 0) {
    playArea.disabled = true;
    chanceArea.textContent = "남은 기회가 없습니다!";
    resultArea.textContent = "아쉽군요!";
    userNum.value = "";
  }
}

function reset() {
  chance = 5;
  chanceArea.textContent = "남은 기회 : 5번";
  resultArea.textContent = "시작 해볼까요?";
  playArea.disabled = false;
  userNum.value = "";
  randomNumMk();
}
