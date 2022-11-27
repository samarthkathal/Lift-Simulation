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
    let lift = document.createElement('div');
    lift.id = 'lift-' + i;
    lift.classList.add('lift');

    let liftInside = document.createElement('div');
    liftInside.classList.add('lift-inside');

    lift.appendChild(liftInside);
    section.appendChild(lift)
  }
  return section;
}

function offset(el) {
  var rect = el.getBoundingClientRect()
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function liftAvailibilitySevice(callingFloorTopPos) {
  let lifts = document.getElementsByClassName('lift')

  let closestLift = lifts[0];
  for (let i = 0; i < lifts.length; i++) {

    let currLiftDiff = Math.abs(offset(lifts[i]).top - callingFloorTopPos);
    let closestLiftDiff = Math.abs(offset(closestLift).top - callingFloorTopPos);

    if (currLiftDiff < closestLiftDiff) {
      closestLift = lifts[i]
    }
  }

  return closestLift
}

function liftButtonHandler() {
  // extract style info for the calling floor
  // query lift availbility service
  // set styling to move available lift to the calling floor
  // console.log(offset(this))
  let callingFloor = this.parentElement.parentElement
  let callingFloorTopPos = offset(callingFloor).top

  let avaliableLift = liftAvailibilitySevice(callingFloorTopPos)

  avaliableLift.style.top = (callingFloorTopPos - 22) + 'px'
}

function generateLiftsLeftOffset(leftClamp, rightClamp, liftCount) {
  // var increment = Math.floor((rightClamp - leftClamp) / (liftCount - 1));
  // var arr = [leftClamp];
  // for (var i = 1; i < liftCount - 1; ++i) {
  //   arr.push(i * increment + leftClamp);
  // }
  // arr.push(rightClamp)

  // return arr;

  let increment = (rightClamp - leftClamp) / (liftCount + 1)
  let arr = []
  for (let i = leftClamp + increment; i < rightClamp; i += increment) {
    arr.push(i)
  }

  return arr
}


function horizontallySpaceLifts(liftCount) {
  let lifts = document.getElementsByClassName("lift");
  let leftClamp = 20;
  let rightClamp = 80;

  let leftOffsets = generateLiftsLeftOffset(leftClamp, rightClamp, liftCount);

  console.log(leftOffsets);

  for (let i = 0; i < liftCount; i++) {
    lifts[i].style.position = 'absolute';
    lifts[i].style.left = leftOffsets[i] + '%';
  }

}

function main() {
  let floorCount = 6;
  let liftCount = 2;

  if ((liftCount >= floorCount / 2)) {
    alert("not allowed")
    return
  }

  let section = generateFloors(floorCount, liftCount)
  section = generateLifts(section, liftCount)

  horizontallySpaceLifts(liftCount)
}

main()