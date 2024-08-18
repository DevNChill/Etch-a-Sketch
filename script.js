//-------------Variables-----------------------
let container = document.querySelector(".container");
let limit = 16;
const gridSize = 960;
let globalOpacity = 0.2;

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
      const red = getRandomColorComponent();
      const green = getRandomColorComponent();
      const blue = getRandomColorComponent();
      cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      globalOpacity += 0.1;
      if (globalOpacity >= 1) {
        globalOpacity = 0.2;
      }
      cell.style.opacity = globalOpacity;
    });
  });
}

function resetGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
setGrid();

function setLimit() {
  limit = parseInt(
    prompt("Enter the size of grid . (should be less than 100)"),
  );
  if (limit > 100 || Number.isNaN(limit)) {
    alert("Grid Size should be less than 100");
    return;
  }
  setGrid();
}

function reset() {
  limit = 16;
  setGrid();
}
document.querySelector("#limit-button").addEventListener("click", setLimit);
document.querySelector("#reset-button").addEventListener("click", reset);
