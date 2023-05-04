'use strict';

class SpeakUtils {
  constructor() {}

  speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
  }
}

export default SpeakUtils;
