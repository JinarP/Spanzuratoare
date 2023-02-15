const btn = document.getElementById("btn");
const picture = document.getElementById("picture");
const letters = document.getElementById("letter");
const wrong = document.getElementById("wrong");

let word;
let maxwrong = 6;

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("keyup", onKeyUp);

function onLoad () {
    onReset();
    btn.addEventListener("click", onReset);
}
function onReset () {
    maxwrong = 6;
    wrong.innerHTML = '';
    picture.querySelectorAll("[id]")
           .forEach(x => x.style.display = "none");
    word = chooseWord();
    drowWord(word);
    document.getElementById("text").innerHTML = "";
}

function chooseWord () {
    let words = ['incorporat', 'telescop', 'termopan', 'calatorie', 'masina', 'razboi']
    let rdm = generateNumber(0, words.length);
    return words[rdm];
}

function drowWord () {
    let letter;
    letters.innerHTML = '';
    word.split('').forEach((l, i) => {
        letter = document.createElement('span');
        if (i == 0 || i == word.length - 1) {
            letter.textContent = l;
        } else {
            letter.k = l;
        }
        letters.appendChild(letter);
    });
}

function generateNumber (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

function onKeyUp (tast) {
    if (tast.keyCode < 65 || tast.keyCode > 90 || getEmptySlots().length == 0 || maxwrong <= 0) {
        return;
    }
    let letter = tast.key;
    let empty = getEmptySlots();
    let finde = 0;
    empty.forEach(l => {
        if(l.k == letter) {
            l.textContent = letter;
            delete l.k;
            ++finde;
        }
    });
    if (finde == 0) {
        wrong.textContent += letter + " ";
        drowPerson(maxwrong);
        --maxwrong;
    }
    if(getEmptySlots().length == 0) {
        document.getElementById("text").innerHTML =
            'AI CASTIGAT';
    }
    if (maxwrong == 0) {
        document.getElementById("text").innerHTML =
            'AI PIERDUT';
    }
}

function  getEmptySlots () {
    return Array.from(letters.querySelectorAll('span'))
        .filter(l =>l.textContent == "");
}

function drowPerson (gresit) {
    let id = 'id' + gresit;
    picture.getElementById(id).style.display = "inherit";
}