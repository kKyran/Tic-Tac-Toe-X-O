const X_CLASS = "x"; // Крестикке арналған CSS класы.
const CIRCLE_CLASS = "circle"; // Ноликке арналған CSS класы.
const WINNING_COMBINATIONS = [ // Жеңіс комбинациялары.
  [0, 1, 2], // Бірінші қатар.
  [3, 4, 5], // Екінші қатар.
  [6, 7, 8], // Үшінші қатар.
  [0, 3, 6], // Бірінші баған.
  [1, 4, 7], // Екінші баған.
  [2, 5, 8], // Үшінші баған.
  [0, 4, 8], // Негізгі диагональ.
  [2, 4, 6], // Қарама-қарсы диагональ.
];
const cellElements = document.querySelectorAll("[data-cell]"); // Тақтадағы барлық ұяшықтар.
const borad = document.getElementById("board"); // Ойын тақтасы.
const restartButton = document.getElementById("restartButton"); // Қайта бастау батырмасы.
const winningMessageElement = document.getElementById("winningMessage"); // Жеңіс хабарламасы контейнері.
const winningMessageTextElement = document.querySelector("[data-winning-message-text]"); // Жеңіс мәтіні.
let circleTurn; // Ойыншы кезегі: нолик (true) немесе крестик (false).

startGame(); // Ойынды бастау.

restartButton.addEventListener("click", startGame); // Қайта бастау батырмасына оқиға қосу.

function startGame() {
  circleTurn = false; // Алғашқы кезек крестикке тиесілі.
  cellElements.forEach((cell) => { // Әр ұяшықты тазалап, тыңдағыш қосу.
    cell.classList.remove(X_CLASS); // Крестиктің CSS класын алып тастау.
    cell.classList.remove(CIRCLE_CLASS); // Ноликтің CSS класын алып тастау.
    cell.removeEventListener("click", handleClick); // Бұрын қосылған тыңдағыштарды алып тастау.
    cell.addEventListener("click", handleClick, { once: true }); // Ұяшыққа тек бір рет басу мүмкіндігін қосу.
  });
  setBoardHoverClass(); // Курсордың тақта үстіндегі көрінісін орнату.
  winningMessageElement.classList.remove("show"); // Жеңіс хабарламасын жасыру.
}

function handleClick(e) {
  const cell = e.target; // Қай ұяшыққа басылғанын анықтау.
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // Ағымдағы ойыншының символы.
  placeMark(cell, currentClass); // Ұяшыққа ағымдағы символды қою.
  if (checkWin(currentClass)) { // Егер жеңіс анықталса:
    endGame(false); // Жеңіс нәтижесін көрсету.
  } else if (isDraw()) { // Егер тең нәтиже болса:
    endGame(true); // Тең нәтижені көрсету.
  } else {
    swapTurns(); // Ойыншыны ауыстыру.
    setBoardHoverClass(); // Курсор символын ауыстыру.
  }
}

function swapTurns() {
  circleTurn = !circleTurn; // Ойыншыны ауыстыру: крестик → нолик немесе керісінше.
}

function endGame(draw) {
  if (draw) { // Егер тең нәтиже болса:
    winningMessageTextElement.innerText = "Draw!"; // "Тең нәтиже!" хабарламасын көрсету.
  } else { // Егер жеңіс болса:
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`; // Жеңген ойыншыны көрсету.
  }
  winningMessageElement.classList.add("show"); // Жеңіс хабарламасын көрсету.
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass); // Ұяшыққа ағымдағы ойыншының класын қосу.
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => { // Жеңіс комбинацияларының біреуін тексеру.
    return combination.every((index) => { // Комбинацияның барлық ұяшықтары ағымдағы ойыншыға тиесілі ме?
      return cellElements[index].classList.contains(currentClass); // Ұяшық ағымдағы ойыншының символын қамти ма?
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => { // Барлық ұяшықтарды тексеру.
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) // Егер барлық ұяшықтар толған болса.
    );
  });
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS); // Тақтадан крестиктің класын алып тастау.
  board.classList.remove(CIRCLE_CLASS); // Тақтадан ноликтің класын алып тастау.
  if (circleTurn) { // Егер ноликтің кезегі болса:
    board.classList.add(CIRCLE_CLASS); // Ноликтің курсорын қосу.
  } else { // Егер крестиктің кезегі болса:
    board.classList.add(X_CLASS); // Крестиктің курсорын қосу.
  }
}
