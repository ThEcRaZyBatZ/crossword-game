"use strict";
const inputArray = ["FATMAN", "HISORRY", "MERYLSTREEP", "GOURI", "SPARKLES", "MAVERICK", "YELAGIRI", "THEONES", "SMALLFINGERS", "MRUDULA", "BUTTERGARLIC", "ANIRUDH", "LALBAGH", "RAJAN", "VLADISLAV"];
const buttonArray = [];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let isRambutanThere = false;
if (getRandomInt(0, 2) % 2) {
    inputArray.push("RAMBUTAN");
    console.log("rambutan");
    isRambutanThere = true;
}
const numberChart = {
    0: "horizontal",
    1: "vertical",
    2: "diagonal_right",
    3: "diagonal_left"
};
const direction = {
    0: "front",
    1: "backward"
};
const GRID_SIZE = 20; // or 16
document.documentElement.style.setProperty("--grid-size", GRID_SIZE.toString());
let textArray = [];
for (let i = 0; i < GRID_SIZE; i++) {
    let tempArray = [];
    for (let j = 0; j < GRID_SIZE; j++) {
        tempArray.push(' ');
    }
    textArray.push(tempArray);
}
const check = (p, q, len, direction, element) => {
    let count = 0;
    switch (direction) {
        case 0:
            if (q + len <= GRID_SIZE) {
                for (let i = q; i < q + len; i++) {
                    if (textArray[p][i] != " " && textArray[p][i] != element[count]) {
                        return false;
                    }
                    count += 1;
                }
                return true;
            }
            break;
        case 1:
            if (p + len <= GRID_SIZE) {
                for (let i = p; i < p + len; i++) {
                    if (textArray[i][q] != " " && textArray[i][q] != element[count]) {
                        return false;
                    }
                    count += 1;
                }
                return true;
            }
            break;
        case 2:
            if (p + len <= GRID_SIZE && q + len <= GRID_SIZE) {
                for (let i = 0; i < len; i++) {
                    if (textArray[p + i][q + i] != " " && textArray[p + i][q + i] != element[count]) {
                        return false;
                    }
                    count += 1;
                }
                return true;
            }
            break;
        case 3:
            if (p + len <= GRID_SIZE && q - (len - 1) >= 0) {
                for (let i = 0; i < len; i++) {
                    if (textArray[p + i][q - i] != " " && textArray[p + i][q - i] != element[count]) {
                        return false;
                    }
                    count += 1;
                }
                return true;
            }
            break;
        default:
            return false;
    }
    return false;
};
inputArray.forEach(element => {
    let possible = false;
    let randomDirection = 0;
    let randomIndexI = 0;
    let randomIndexJ = 0;
    while (!possible) {
        randomDirection = getRandomInt(0, 3);
        randomIndexI = getRandomInt(0, GRID_SIZE - 1);
        randomIndexJ = getRandomInt(0, GRID_SIZE - 1);
        if (check(randomIndexI, randomIndexJ, element.length, randomDirection, element)) {
            possible = true;
        }
    }
    let randomTextDirection = getRandomInt(0, 1);
    const placeChar = (row, col, ch) => {
        if (textArray[row][col] === " ") {
            textArray[row][col] = ch;
        }
    };
    switch (randomDirection) {
        case 0: // horizontal
            for (let i = 0; i < element.length; i++) {
                const col = randomIndexJ + i;
                const ch = randomTextDirection ? element[element.length - i - 1] : element[i];
                placeChar(randomIndexI, col, ch);
            }
            break;
        case 1: // vertical
            for (let i = 0; i < element.length; i++) {
                const row = randomIndexI + i;
                const ch = randomTextDirection ? element[element.length - i - 1] : element[i];
                placeChar(row, randomIndexJ, ch);
            }
            break;
        case 2: // diagonal right
            for (let i = 0; i < element.length; i++) {
                const row = randomIndexI + i;
                const col = randomIndexJ + i;
                const ch = randomTextDirection ? element[element.length - i - 1] : element[i];
                placeChar(row, col, ch);
            }
            break;
        case 3: // diagonal left
            for (let i = 0; i < element.length; i++) {
                const row = randomIndexI + i;
                const col = randomIndexJ - i;
                const ch = randomTextDirection ? element[element.length - i - 1] : element[i];
                placeChar(row, col, ch);
            }
            break;
    }
});
const AnsArray = textArray.map(row => [...row]);
console.log(AnsArray);
const word = inputArray.join("");
const letters_set = new Set(word);
const letters = [...letters_set];
console.log(letters);
for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
        if (textArray[i][j] == " ") {
            textArray[i][j] = letters[getRandomInt(0, letters.length - 1)];
        }
    }
}
console.log(textArray);
window.onload = () => {
    // populate buttonArray as you already do
    for (let i = 0; i < GRID_SIZE; i++) {
        let tempArray = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            const id = `${i < 10 ? '0' + i : i}${j < 10 ? '0' + j : j}`;
            const btn = document.getElementById(id);
            tempArray.push(btn);
        }
        buttonArray.push(tempArray);
    }
    // fill text
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            buttonArray[i][j].innerText = textArray[i][j];
        }
    }
    const activate = (b) => b.classList.add("active");
    const deactivate = (b) => b.classList.remove("active");
    const fix = (b) => b.classList.add("fix");
    const completed = (arr) => arr.forEach(e => fix(e[0]));
    const popAllElements = (arr) => arr.forEach(e => deactivate(e[0]));
    const isPartialWord = (s) => {
        for (const w of inputArray) {
            if (w.startsWith(s))
                return true;
            const rev = w.split("").reverse().join("");
            if (rev.startsWith(s))
                return true;
        }
        return false;
    };
    const isCompleteWord = (s) => {
        if (s == "RAMBUTAN") {
            alert("AYO YOU FOUND IT");
            return true;
        }
        for (const w of inputArray) {
            if (w === s)
                return true;
            const rev = w.split("").reverse().join("");
            if (rev === s)
                return true;
        }
        return false;
    };
    let head = "";
    let curr_array = [];
    let stepDelta = null;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const btn = buttonArray[i][j];
            btn.addEventListener("click", () => {
                const letter = btn.innerText;
                if (curr_array.length === 0) {
                    activate(btn);
                    head = letter;
                    curr_array = [[btn, [i, j]]];
                    stepDelta = null;
                    if (isCompleteWord(head)) {
                        completed(curr_array);
                        head = "";
                        curr_array = [];
                        stepDelta = null;
                    }
                    return;
                }
                if (curr_array.length === 1) {
                    const [prevBtn, [pI, pJ]] = curr_array[0];
                    const dI = i - pI;
                    const dJ = j - pJ;
                    const maxAbs = Math.max(Math.abs(dI), Math.abs(dJ));
                    if (maxAbs !== 1 || (dI === 0 && dJ === 0)) {
                        popAllElements(curr_array);
                        activate(btn);
                        head = letter;
                        curr_array = [[btn, [i, j]]];
                        stepDelta = null;
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                    stepDelta = [dI, dJ];
                    const newHead = head + letter;
                    if (isPartialWord(newHead)) {
                        activate(btn);
                        head = newHead;
                        curr_array.push([btn, [i, j]]);
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                    else if (isCompleteWord(newHead)) {
                        activate(btn);
                        curr_array.push([btn, [i, j]]);
                        completed(curr_array);
                        head = "";
                        curr_array = [];
                        stepDelta = null;
                        return;
                    }
                    else {
                        popAllElements(curr_array);
                        activate(btn);
                        head = letter;
                        curr_array = [[btn, [i, j]]];
                        stepDelta = null;
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                }
                if (curr_array.length >= 2) {
                    const last = curr_array[curr_array.length - 1][1];
                    const prev = curr_array[curr_array.length - 2][1];
                    const expectedDelta = [last[0] - prev[0], last[1] - prev[1]];
                    const actualDelta = [i - last[0], j - last[1]];
                    const sameDirection = (expectedDelta[0] === actualDelta[0] && expectedDelta[1] === actualDelta[1]);
                    if (!sameDirection) {
                        popAllElements(curr_array);
                        activate(btn);
                        head = letter;
                        curr_array = [[btn, [i, j]]];
                        stepDelta = null;
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                    const newHead = head + letter;
                    if (isPartialWord(newHead)) {
                        activate(btn);
                        head = newHead;
                        curr_array.push([btn, [i, j]]);
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                    else if (isCompleteWord(newHead)) {
                        activate(btn);
                        curr_array.push([btn, [i, j]]);
                        completed(curr_array);
                        head = "";
                        curr_array = [];
                        stepDelta = null;
                        return;
                    }
                    else {
                        popAllElements(curr_array);
                        activate(btn);
                        head = letter;
                        curr_array = [[btn, [i, j]]];
                        stepDelta = null;
                        if (isCompleteWord(head)) {
                            completed(curr_array);
                            head = "";
                            curr_array = [];
                            stepDelta = null;
                        }
                        return;
                    }
                }
            });
        }
    }
};
