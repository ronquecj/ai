'use strict';

const desc = document.querySelector('.desc-content');

let i = 0;

let txt = `INTRODUCING AN INNOVATIVE AI THAT AWAITS YOUR
VOICEE COMMAND AND REPLIES WITH A VOICE TO
PROVIDE SWIFT AND EFFECTIVE SOLUTIONS TO YOUR
PROBLEMS. SAY GOODBYE TO COMPLEX PROBLEM-SOLVING
AND SAY HELLO TO SIMPLIFIED AND EFFICIENT
SOLUTIONS WITH OUR INTELLIGENT VOICE-ACTIVATED
AI.`;

let speed = 30;

const typeDesc = () => {
  if (i < txt.length) {
    desc.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeDesc, speed);
  }
};
