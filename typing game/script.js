"use strict";
let letters;
const text = document.getElementById("text");
const timeTag = document.getElementById("time");
const wpmTag = document.getElementById("wpm");
const errorTag = document.getElementById("point");
const keys = document.querySelectorAll(".keyboard div button");
const bar = document.getElementById("deadLine");
const heart = document.getElementById("heart");
const typingSound = new Audio(
  "Mechanical-Keyboard-single-button-presses-8-www.FesliyanStudios.com.mp3"
);
let starting = true;
let wpm = 0,
  error = 0,
  time = 0,
  rword = 0,
  second = 0,
  minute = 0,
  life = 5,
  intervalId,
  heartWidth = 150,
  letterArray = [];
let topp = 0;
errorTag.innerHTML = error;
//this function is for generating phrase
function generatePhrase() {
  for (let index = 0; index < 5; index++) {
    let randomCharcode = Math.floor(Math.random() * (122 - 97 + 1) + 97);
    letterArray.push(String.fromCharCode(randomCharcode));
    var span = document.createElement("span");
    span.classList.add("letter");
    span.innerHTML = String.fromCharCode(randomCharcode);
    text.appendChild(span);
  }
  letters = document.getElementsByClassName("letter");
}
generatePhrase();
let correct = 0;
/**
 * 1.start game
 * 2.checking the keys and the words
 * 3.check the word finish condition
 */
window.addEventListener("keyup", (event) => {
  typingSound.play();

  if (starting) {
    fall();
    //time start
    intervalId = setInterval(() => {
      time++;
      second++;
      if (second == 60) {
        second = 0;
        minute++;
      }
      var secondText = second < 10 ? "0" + second : second;
      var minuteText = minute < 10 ? "0" + minute : minute;
      timeTag.innerHTML = minuteText + ":" + secondText;
      wpm = rword / (time / 60) / 5;
      if (rword > 4 && time > 2) {
        wpmTag.innerHTML = Math.ceil(wpm); //wpm apppend
      }
    }, 1000);
  }

  starting = false; //to prevent
  for (let index = 0; index < keys.length; index++) {
    if (keys[index].innerHTML == event.key) {
      setTimeout(() => {
        keys[index].classList.remove("active");
      }, 300);
    }
  }
  for (let index = 0; index < letters.length; index++) {
    //checking the words and typed keys
    if (letters[index].innerHTML == event.key) {
      if (
        !letters[index].classList.contains("typed") && //ရိုက်ပြီးသားမဖြစ်ရင်
        (letters[index - 1] == undefined || //ရှေ့ဆုံးစာလုံး
          letters[index - 1].classList.contains("typed")) //နောက်စာလုံး
      ) {
        letters[index].classList.add("typed");
        rword++;
        correct++;
        break;
      }
      error += 1;
    }
  }
  if (!letterArray.includes(event.key)) {
    //to add error for not pretty wrong keypress
    error += 1;
  }
  errorTag.innerHTML = error; //appending error

  if (correct == 5) {
    //right condition

    restart();
  }
  for (let index = 0; index < keys.length; index++) {
    if (keys[index].innerHTML == event.key) {
      keys[index].classList.add("active");
    }
    setTimeout(() => {
      keys[index].classList.remove("active");
    }, 500);
  }
});

function fall() {
  setInterval(() => {
    console.log(life);
    if (
      topp + 25 >= 195 &&
      topp <= 195 + 5 //25 is the text height and 195 is top of bar
    ) {
      restart();

      heartWidth = heartWidth - 30;
      heart.style.width = heartWidth + "px";
      life--;
      if (life <= 0) {
        //game over conditon
        gameOver();
        clearInterval(intervalId);
        topp = Number(text.style.top.replace("px", ""));
        text.style.top = topp + 10 + "px";
      }
    } else {
      topp = Number(text.style.top.replace("px", ""));
      text.style.top = topp + 10 + "px";
    }
  }, 130);
}

// this function is for restart ball
function restart() {
  text.innerHTML = "";
  topp = 0;
  correct = 0;
  text.style.top = "0px";
  generatePhrase();
}
//this function is for game over display
let over = ["G", "A", "M", "E", "O", "V", "E", "R"];
function gameOver() {
  text.innerHTML = "";
  for (let index = 0; index < over.length; index++) {
    var span = document.createElement("span");
    span.classList.add("letter");
    span.innerHTML = over[index];
    text.appendChild(span);
  }
}


// //obj1.x + obj1.width >= obj2.x &&
// obj1.x <= obj2.x + obj2.width &&
