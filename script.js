const container = document.querySelector(`#container`);
const colorDisplay = document.getElementById(`color-display`);
const colorSquares = document.querySelectorAll(`.square`);
const newColorsBtn = document.getElementById(`reset`);
const selectedMode = document.querySelector(`.mode selected`);
const modesSelectors = document.querySelectorAll(`.mode`);
const rgbColorValue = document.querySelector(`#rgb-color-value`);
const chanceCounter = document.querySelector(`#chances`);

let gameMode = 'hard'
let chancesRemaining = 3

// let gameModes = {
//   easy: {
//     modeString: 'easy',
//     chancesNumber: 1,
//     squaresToShow: 3
//   },
//   hard: {
//     modeString: 'hard',
//     chancesNumber: 3,
//     squaresToShow: 6
//   },
//   extreme: {
//     modeString: 'extreme',
//     chances: 3,
//     squaresToShow: 9
//   }
// }

function randomBetween (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomRGB () {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

document.addEventListener(`DOMContentLoaded`, () => {
  handleGameStart(gameMode)
  modesSelectors.forEach(function (modeSelector) {
    modeSelector.addEventListener(`click`, function(evt) {
      const id = evt.target.id;
      handleGameStart(id);
      gameMode = id;
    })
  })
})

function handleGameStart(mode) {
  colorSquares.forEach(square => {
    square.style.display = 'flex'
  })

  let squaresToShow = 0
  if (mode === 'easy') {
    selectModeByIndex(0)
    squaresToHide(colorSquares, 2);
    squaresToShow = 3;
    chancesRemaining = 1;
    chanceCounter.textContent = chancesRemaining;
  } else if (mode === 'hard') {
    selectModeByIndex(1)
    squaresToHide(colorSquares, 5);
    squaresToShow = 6;
    chanceCounter.textContent = 3;
    chancesRemaining = 3;
  } else if(mode === 'extreme') {
    selectModeByIndex(2)
    squaresToHide(colorSquares, 8);
    squaresToShow = 9;
    chanceCounter.textContent = 3;
    chancesRemaining = 3;
  }


  const rightColor = randomRGB()
  rgbColorValue.textContent = rightColor;
  colorSquares.forEach(function(square, index) {
    square.style.backgroundColor = randomRGB()
    square.style.cursor = `pointer`;
    square.style.pointerEvents = `auto`;
  })

  randomCorrectSquare(rightColor, squaresToShow)
}

function selectModeByIndex(selectedModeIndex) {
  modesSelectors.forEach(function (modesSelector, index) {
    modesSelector.classList.remove(`selected`);
    if (index === selectedModeIndex) {
      modesSelector.classList.add(`selected`);
    }
  });
}

function squaresToHide(squares, limit) {
  squares.forEach(function (square, index) {
    if (index > limit) {
      square.style.display = `none`;
    }
  })
}

function createSquare() {
  const squareDiv = document.createElement('div');
  squareDiv.classList.add('square');
  squareDiv.style.backgroundColor = randomRGB();
  container.insertAdjacentElement('beforeend', squareDiv);
}

function randomCorrectSquare(color, maxSquares) {
  const randomSquareIndex = randomBetween(0, maxSquares - 1);
  const selectedSquare = colorSquares[randomSquareIndex]
  selectedSquare.style.backgroundColor = color;
}

newColorsBtn.addEventListener(`click`, () => handleGameStart(gameMode));

colorSquares.forEach((square, index) => {
  square.addEventListener(`click`, onSquareClick)
})

function onSquareClick(evt) {
  const clickedSquare = evt.target;
  const clickedSquareRGB = clickedSquare.style.backgroundColor;
  if(clickedSquareRGB == rgbColorValue.textContent) {
    confetti();
    rgbColorValue.textContent = `You're da bomb!`;
    hideAllOther(clickedSquare)
    setTimeout(() => {
      handleGameStart(gameMode)
    }, 2000)
  } else {
    clickedSquare.style.backgroundColor = `transparent`;
    clickedSquare.style.cursor = `default`;
    clickedSquare.style.pointerEvents = `none`;
    clickedSquare.style.border = `none`;
    chancesRemaining--;
    chanceCounter.textContent = chancesRemaining;
    if (chancesRemaining === 0) {
      handleGameStart(gameMode);
      const confettiConfig = {
        colors: ['#FF0000']
      }
      confetti(confettiConfig);
    }
  }
}

function hideAllOther(exceptionNode) {
  colorSquares.forEach(square => {
    if (square !== exceptionNode) {
     square.style.backgroundColor = `transparent`;
    }
  })
}


