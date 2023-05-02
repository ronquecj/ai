'use strict';

class LoadEvent {
  constructor(func, greetings) {
    this.func = func;
    this.greetings = greetings;
  }

  load() {
    window.addEventListener('load', () => {
      const activatingM = 'Activating Maiden...';
      const goingOL = 'Going online...';

      var day = new Date();
      var hr = day.getHours();

      this.func(activatingM);
      this.func(goingOL);

      if (hr >= 0 && hr < 12) {
        this.greetings = 'Good Morning';
        this.func(this.greetings);
      } else if (hr == 12) {
        this.greetings = 'Good Noon';
        this.func(this.greetings);
      } else if (hr > 12 && hr <= 17) {
        this.greetings = 'Good Afternoon';
        this.func(this.greetings);
      } else {
        this.greetings = 'Good Evening';
        this.func(this.greetings);
      }

      const aiResParent = document.querySelector(
        '.ai-response-container'
      );

      const aiResHTML = `
        <div class="response greet">
           <p class="question-ai">
           ${this.greetings}!
           </p>
           <p class="answer">
           ${activatingM} ${goingOL}
           </p>
       </div>
        `;
      aiResParent.insertAdjacentHTML('beforeend', aiResHTML);
    });
  }
}

export default LoadEvent;
