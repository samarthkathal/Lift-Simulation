function generateControlsForFloor(floorNumber, maxAllowedFloors) {
  let controlsWrapper = document.createElement('div');
  controlsWrapper.classList.add('controls');
  controlsWrapper.id = 'controls-' + floorNumber;

  if (floorNumber == 0) {
    let upButton = document.createElement('button');

    upButton.classList.add('button', 'button-up');
    upButton.type = "button";
    upButton.id = "floor-" + floorNumber + "up";

    controlsWrapper.appendChild(upButton)
  }
  else {
    if (floorNumber == maxAllowedFloors - 1) {
      let downButton = document.createElement('button');

      downButton.classList.add('button', 'button-down');
      downButton.type = "button";
      downButton.id = "floor-" + floorNumber + "down";

      controlsWrapper.appendChild(downButton)
    }
    else {
      let upButton = document.createElement('button');
      let downButton = document.createElement('button');

      upButton.classList.add('button', 'button-up');
      downButton.classList.add('button', 'button-down');
      upButton.type = "button";
      downButton.type = "button";
      upButton.id = "floor-" + floorNumber + "up";
      downButton.id = "floor-" + floorNumber + "down";

      controlsWrapper.appendChild(upButton);
      controlsWrapper.appendChild(downButton);
    }
  }

  return controlsWrapper;
}

function generateFloors(floorCount, liftCount) {
  let section = document.getElementById("main");
  for (let i = 0; i < floorCount; i++) {
    let floor = document.createElement('div');
    floor.classList.add('floor');
    floor.id = 'floor-' + i;

    let floorWithControls = generateControlsForFloor(i, floorCount);
    section.appendChild(floorWithControls);

    let liftSpace = document.createElement('div')
    liftSpace.classList.add("list-space");

    let floorLabel = document.createElement('div');
    floorLabel.classList.add("floor-label");
    floorLabel.createTextNode('floor ' + i)

    section.appendChild(liftSpace);
    section.appendChild(floorLabel);
  }
}

function main() {
  let floorCount = 6;
  let liftCount = 2;

  if (!(liftCount > floorCount / 2)) {
    alert("not allowed")
    return
  }

  generateFloors(floorCount, liftCount)
}