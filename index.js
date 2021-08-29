const grid = document.querySelector('.game-grid');
const score = document.querySelector('#score');
const width = 28;
let squares = [];
let playerScore = 0;

  //28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard() {
  layout.forEach(item => {
    const square = document.createElement('div');

    if(item === 0) {
      square.classList.add('pac-dot')
    } else if (item === 1) {
      square.classList.add('wall')
    } else if (item === 2) {
      square.classList.add('ghost-lair')
    } else if (item === 3) {
      square.classList.add('power-pellet')
    } else if (item === 4) {
      square.classList.add('empty')
    } 

    grid.appendChild(square);
    squares.push(square);
  })
}

createBoard();


// --------------------------------------------------
// PACMAN
// --------------------------------------------------
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman');


// --------------------------------------------------
// CONTROLS
// --------------------------------------------------
function controls(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman');

  switch(e.key) {
    case 'ArrowLeft':
      if (
          pacmanCurrentIndex % width !== 0 && 
          !squares[pacmanCurrentIndex - 1].classList.contains('wall')
      ) { pacmanCurrentIndex -=1; }
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      }
      break;
    case 'ArrowUp':
      if (
        pacmanCurrentIndex - width >= 0 && 
        !squares[pacmanCurrentIndex - width].classList.contains('wall')
        ) { pacmanCurrentIndex -= width };
      break;
    case 'ArrowRight':
      if (
        pacmanCurrentIndex % width < width - 1 && 
        !squares[pacmanCurrentIndex + 1].classList.contains('wall')
        ) { pacmanCurrentIndex +=1; }
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      }
    break;
    case 'ArrowDown':
      if (
          pacmanCurrentIndex + width < width**2 && 
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
      ) { pacmanCurrentIndex += width; }
      break;
  }

  squares[pacmanCurrentIndex].classList.add('pacman');
  pacDotEaten();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();
}

document.addEventListener('keyup', controls);
// document.addEventListener('keydown', controls);


// PACMAN EATING
// --------------------------------------------

function pacDotEaten() {
  if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot');
    playerScore++;
    score.innerHTML = playerScore;
  }
}

function powerPelletEaten() {
  if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    playerScore += 10;
    ghosts.forEach(ghost => ghost.isScared = true);
    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false);
}


// GHOSTS
// --------------------------------------------
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
]

// place ghost on grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost');

});

// move ghost
function moveGhost(ghost) {
  const directions = [ -1, +1, -width, +width ];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  
  ghost.timerId = setInterval(() => {

    if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {

      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add('ghost');
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    if(ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }

    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      playerScore +=100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }

    checkForGameOver();
  }, ghost.speed);
}

ghosts.forEach(ghost => moveGhost(ghost));


// GAME OVER
function checkForGameOver() {
  if (
      squares[pacmanCurrentIndex].classList.contains('ghost') && 
       !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
      document.removeEventListener('keyup', controls);
      score.innerHTML = 'You Lose! Game Over';
    }
}

// GAME WIN
function checkForWin() {
  if (playerScore >= 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', controls);
    score.innerHTML = 'You Win, Buddy!';
  }
}