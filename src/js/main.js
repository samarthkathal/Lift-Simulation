function generateControlsForFloor(floorNumber, maxAllowedFloors) {
  let controlsWrapper = document.createElement('div');
  controlsWrapper.classList.add('controls');
  controlsWrapper.id = 'controls-' + floorNumber;

  if (floorNumber == 0) {
    let upButton = document.createElement('button');

    upButton.classList.add('button', 'button-up');
    upButton.type = "button";
    upButton.id = "floor-" + floorNumber + "-up";
    upButton.addEventListener('click', liftButtonHandler, false)

    controlsWrapper.appendChild(upButton)
  }
  else {
    if (floorNumber == maxAllowedFloors - 1) {
      let downButton = document.createElement('button');

      downButton.classList.add('button', 'button-down');
      downButton.type = "button";
      downButton.id = "floor-" + floorNumber + "-down";
      downButton.addEventListener('click', liftButtonHandler, false)

      controlsWrapper.appendChild(downButton)
    }
    else {
      let upButton = document.createElement('button');
      let downButton = document.createElement('button');

      upButton.classList.add('button', 'button-up');
      downButton.classList.add('button', 'button-down');
      upButton.type = "button";
      downButton.type = "button";
      upButton.id = "floor-" + floorNumber + "-up";
      downButton.id = "floor-" + floorNumber + "-down";
      upButton.addEventListener('click', liftButtonHandler, false);
      downButton.addEventListener('click', liftButtonHandler, false)

      controlsWrapper.appendChild(upButton);
      controlsWrapper.appendChild(downButton);
    }
  }

  return controlsWrapper;
}

function generateFloors(floorCount) {
  let section = document.getElementById("main");
  for (let i = floorCount - 1; i >= 0; i--) {
    let floor = document.createElement('div');
    floor.classList.add('floor');
    floor.id = 'floor-' + i;

    let floorWithControls = generateControlsForFloor(i, floorCount);
    floor.appendChild(floorWithControls);

    let liftSpace = document.createElement('div')
    liftSpace.classList.add("lift-space");

    let floorLabel = document.createElement('div');
    floorLabel.classList.add("floor-label");
    let floorText = document.createTextNode('floor ' + i);
    floorLabel.appendChild(floorText);

    floor.appendChild(liftSpace);
    floor.appendChild(floorLabel);

    section.appendChild(floor);
  }

  return section;
}

function generateLifts(section, liftCount) {
  for (let i = 0; i < liftCount; i++) {
    let lift = document.createElement('div')
    lift.classList.add('lift', 'lift-' + i)

    section.appendChild(lift)
  }
  return section;
}

function liftButtonHandler() {
  alert('1');
}

function main() {
  let floorCount = 6;
  let liftCount = 1;

  if ((liftCount >= floorCount / 2)) {
    alert("not allowed")
    return
  }

  let section = generateFloors(floorCount, liftCount)
  section = generateLifts(section, liftCount)
}

main()