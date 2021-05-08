let scrollItems = [["blue", true], ["yellow", false], ["green", false]];
const nameIndex = 0;
const booleanIndex = 1; 
let currentIndex = 0;
let positionLeftValue = Number(window.innerWidth);



/**
 * 
 * Scroll horizontally between elements.
 * 
 * @param {object} scrollDirection 
 * @param {string} scrollItems 
 * 
 */
const scroll = (scrollDirection, scrollItems) => {
    let currentModifyingValue = gcd_two_numbers(positionLeftValue, Number(10));
    //get the elements from array where boolean is true
    currentIndex = getCurrentItemPosition(scrollItems);
    let currentItemName = scrollItems[currentIndex][nameIndex];
    let nextItemName = "";


    if(currentIndex !== scrollItems.length-1){
         nextItemName = scrollItems[currentIndex + 1][nameIndex];
    }

    let currentItem = document.getElementById(currentItemName);
    let nextItem = document.getElementById(nextItemName);

    if (scrollDirection === 'right') {
        // console.log('positionRightValue: ' + positionRightValue);

        // Move the next div container into the viewport.
        positionLeftValue = (positionLeftValue - currentModifyingValue);

        if (positionLeftValue <= Number(0)) {
            positionLeftValue = 0;
            currentItem.style.width = 0;

            // Determine current and next div container from scrollItems array.
            scrollItems[currentIndex][booleanIndex] = false;

            scrollItems[currentIndex + 1][booleanIndex] = true;
            currentIndex = getCurrentItemPosition(scrollItems);
            // console.log('After: '+ scrollItems);
            positionLeftValue = Number(window.innerWidth);
            return;
        }

        // console.log(' current pixel width: ' + positionRightValue);
        if(nextItem !== null){
            nextItem.style.left = positionLeftValue - currentModifyingValue + 'px';
        }
    }
    // if (scrollDirection === 'right') {
    //     Isabeau leef je uit!!
    // }
}

const getCurrentItemPosition = (scrollItems) => {

    for (var i = 0; i < scrollItems.length; i++) {
        var scrollItem = scrollItems[i];
        for (var j = 0; j < scrollItem.length; j++) {
            if (j === 1 && scrollItems[i][j] === true) {
                return i;
            }
        }
    }

}

document.addEventListener('wheel', function (e) {
    let direction = detectMouseWheelDirection(e);
    scroll(direction, scrollItems);
});


const detectMouseWheelDirection = (e) => {
    let delta = null;
    let direction = '';

    if (!e) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if (e.wheelDelta) { // will work in most cases
        delta = e.wheelDelta / 60;
    } 
    else if (e.deltaY) { // fallback for Firefox
        delta = -e.deltaY;
    }
    if (delta !== null) {
        direction = delta > 0 ? 'left' : 'right';
    }
    return direction;
}

const gcd_two_numbers = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}
