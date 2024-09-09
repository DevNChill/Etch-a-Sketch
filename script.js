//-------------Variables-----------------------
let container = document.querySelector(".container");
let limit = 16;
const gridSize = 960;
let globalOpacity = 0.2;
let randomButton = document.querySelector(".rainbow");
let opacityButton = document.querySelector(".opacitybutton");
let randomColor = false;
let opacityEnable = false;

//--------------Function to Generate Random Color of divs----------------
function getRandomColorComponent() {
  return Math.floor(Math.random() * 256);
}

//----------Creates 16*16 grid------------
function setGrid() {
  resetGrid();
  const cellsize = gridSize / limit;
  for (let index = 0; index < limit; index++) {
    let rowcontainer = document.createElement("div");
    rowcontainer.classList.add("row-container");
    for (let j = 0; j < limit; j++) {
      let rowdiv = document.createElement("div");
      rowdiv.classList.add("row-div");
      rowdiv.style.width = `${cellsize}px`;
      rowdiv.style.height = `${cellsize}px`;
      rowcontainer.appendChild(rowdiv);
    }
    container.appendChild(rowcontainer);
  }
  const cells = document.querySelectorAll(".row-div");
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      if (randomColor) {
        const red = getRandomColorComponent();
        const green = getRandomColorComponent();
        const blue = getRandomColorComponent();
        cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      } else {
        cell.style.backgroundColor = "grey";
      }
      if (opacityEnable) {
        globalOpacity += 0.1;
        if (globalOpacity >= 1) {
          globalOpacity = 0.2;
        }
      } else {
        globalOpacity = 1;
      }
      cell.style.opacity = globalOpacity;
    });
  });
}

function resetGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  randomColor = false;
  opacityEnable = false;
  randomButton.style.backgroundColor = "#5783db";
  opacityButton.style.backgroundColor = "#5783db";
}
setGrid();

function setLimit() {
  limit = parseInt(
    prompt("Enter the size of grid . (should be less than 100)"),
  );
  if (limit > 100 || Number.isNaN(limit)) {
    alert("Grid Size should be less than or equal to 100");
    return;
  }
  setGrid();
}

function reset() {
  limit = 16;
  setGrid();
}
randomButton.addEventListener("click", () => {
  randomColor == false
    ? ((randomColor = true), (randomButton.style.backgroundColor = "pink"))
    : ((randomColor = false), (randomButton.style.backgroundColor = "#5783db"));
});

opacityButton.addEventListener("click", () => {
  opacityEnable == true
    ? ((opacityEnable = false),
      (opacityButton.style.backgroundColor = "#5783db"))
    : ((opacityEnable = true), (opacityButton.style.backgroundColor = "pink"));
});
document.querySelector("#limit-button").addEventListener("click", setLimit);
document.querySelector("#reset-button").addEventListener("click", reset);
