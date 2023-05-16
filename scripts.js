// Get reference to <body>
const body = document.body;
const mainDiv = document.createElement('div');

function insertInputTag() {
  const inputTagEle = document.createElement('input');
  const toolsDiv = document.getElementById('toolsDiv');
  inputTagEle.setAttribute('id', 'inputTag');
  inputTagEle.setAttribute('type', 'number');
  inputTagEle.setAttribute('min', '1');
  inputTagEle.setAttribute('max', '100');
  toolsDiv.prepend(inputTagEle);
}

function setRandomColor() {
  // Generate a random hex color code
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return color;
}

function resizeGrid() {
  const inputTag = document.getElementById('inputTag');
  const createGridBtn = document.getElementById('createBtn');
  inputTag.addEventListener('input', (event) => {
    createGridBtn.addEventListener('click', () => {
      const newGrid = parseInt(event.target.value, 10);
      createDivGrid(newGrid);
    })
  });
}

function resetBtn() {
  mainDiv.innerHTML = '';
}

function createButtons() {
  // Create and append a interaction sketch div
  const toolsDiv = document.createElement('div');
  body.appendChild(toolsDiv);
  toolsDiv.setAttribute('id', 'toolsDiv');
  
  // Add interaction button for toolsDiv
  const createBtn = document.createElement('button');
  const blackBtn = document.createElement('button');
  const rainbowBtn = document.createElement('button');
  const resetBtn = document.createElement('button');
  createBtn.setAttribute('id', 'createBtn');
  blackBtn.setAttribute('id', 'blackBtn');
  rainbowBtn.setAttribute('id', 'rainbowBtn');
  resetBtn.setAttribute('id', 'resetBtn');
  createBtn.textContent = 'Create Grid';
  blackBtn.textContent = 'Black';
  rainbowBtn.textContent = 'Rainbow';
  resetBtn.textContent = 'Reset';
  toolsDiv.appendChild(createBtn);
  toolsDiv.appendChild(blackBtn);
  toolsDiv.appendChild(rainbowBtn);
  toolsDiv.appendChild(resetBtn);
}

function resizeSubDivChild(newGrid) {
  const childChildDiv = document.getElementsByClassName('childChildDiv');
  const mainDivWidth = mainDiv.offsetWidth;
  const mainDivHeight = mainDiv.offsetHeight;
  const gridItemSize = Math.sqrt(mainDivWidth * mainDivHeight);
  
  Array.from(childChildDiv).forEach(child => {
    child.style.flexBasis = `${gridItemSize}px`;
    child.style.height = `${gridItemSize}px`;
  });
}

function createMainDiv() {
  // Create and append a main div to contain the container of 16x16 div grid
  body.appendChild(mainDiv);
  mainDiv.setAttribute('id', 'mainDiv');
}

// Create and append a child Div that contain 16x16 div grid
function createDivGrid (newGrid) {
  mainDiv.innerHTML = ''; // Clear previous grid
  
  for (let divCount = 0; divCount < newGrid; divCount++) {
    const childDiv = document.createElement('div');
    mainDiv.appendChild(childDiv);
    childDiv.setAttribute('class', 'childDiv');
    console.log('child div appended.')
    
    // Create and append a child Div inside the 16x16 div container
    for (let childDivCount = 0; childDivCount < newGrid; childDivCount++) {
      const childDiv = document.getElementsByClassName('childDiv')[divCount]; 
      const childChildDiv = document.createElement('div');
      childDiv.appendChild(childChildDiv);
      childChildDiv.setAttribute('class', 'childChildDiv');
      console.log('sub child div appended.');
    }
  }
  
  resizeSubDivChild(newGrid);
}

function blackBtn () {
  const childChildDiv = document.getElementsByClassName('childChildDiv');
  Array.from(childChildDiv).forEach(div => {
    div.addEventListener('mouseenter', (event) => {
      event.target.style.backgroundColor = '#000';
    });
  })

  Array.from(childChildDiv).forEach(div => {
    div.addEventListener('mouseleave', (event) => {
      event.target.style.backgroundColor = '#000';
    });
  })
}

function rainbowBtn () {
  const childChildDiv = document.getElementsByClassName('childChildDiv');
  Array.from(childChildDiv).forEach(div => {
    div.addEventListener('mouseenter', (event) => {
      event.target.style.backgroundColor = setRandomColor();
    });
  });

  Array.from(childChildDiv).forEach(div => {
    div.addEventListener('mouseleave', (event) => {
      event.target.style.backgroundColor = setRandomColor();
    });
  })
}

function buttonEvents() {
  const blackColor = document.getElementById('blackBtn');
  const rainbowColor = document.getElementById('rainbowBtn');
  const allButtons = document.querySelectorAll('button');

  function handleClick(event) {
    switch (event.target.id) {
      case 'createBtn':
        resizeGrid();
        break;
      case 'resetBtn':
        resetBtn();
        break;
      case 'blackBtn':
        blackBtn();
        break;
      case 'rainbowBtn':
        rainbowBtn();
        break;
    }
  }

  allButtons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
}

createButtons();
createMainDiv();
insertInputTag();
resizeGrid();
resetBtn();
buttonEvents();
setRandomColor();


