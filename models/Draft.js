'use strict';

class Draft {
  aiResParent = document.querySelector('.ai-response-container');
  historyParent = document.querySelector(
    '.history-content-container'
  );
  linksParent = document.querySelector('.link-content-container');

  constructor(
    questionJSON,
    answerJSON,
    qNumber,
    continueReading,
    links = []
  ) {
    this.questionJSON = questionJSON;
    this.answerJSON = answerJSON;
    this.qNumber = qNumber;
    this.continueReading = continueReading;
    this.links = links;
  }

  renderContentAI() {
    const aiResHTML = `
    <div class="response">
       <p class="question-ai">
      ${this.questionJSON}
       </p>
       <p class="answer">
       ${this.answerJSON}
       </p>
       <a href="${this.continueReading}" target="_blank" class="continue"
       >continue reading...</a
       >
   </div>
    `;
    this.aiResParent.insertAdjacentHTML('beforeend', aiResHTML);
  }

  renderContentHistory() {
    const historyHTML = `
    <div class="history-content" >
        <div class="q-number-container">
        <p class="q-number">Q${this.qNumber}</p>
        </div>
        <div class="question-container" data-question="${
          this.questionJSON
        }">
        <button class="question" >${this.questionJSON.slice(0, 45)}${
      this.questionJSON.length > 45 ? '...' : ' '
    }</button>
        </div>
    </div>
    `;

    this.historyParent.insertAdjacentHTML('beforeend', historyHTML);

    const btn = document.querySelectorAll('.question');

    btn.forEach((el) => {
      el.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        const qu = document.querySelector('.q');
        const an = document.querySelector('.a');
        const close = document.querySelector('.close');
        const bod = document.querySelector('body');
        const cont = document.querySelector('.cont');
        const overlay = document.querySelector('.overlay');

        modal.classList.remove('hidden');

        qu.innerHTML = `${this.questionJSON}`;
        an.innerHTML = `${this.answerJSON}`;
        cont.href = `${this.continueReading}`;

        close.addEventListener('click', () => {
          modal.classList.add('hidden');
        });

        overlay.addEventListener('click', (e) => {
          modal.classList.add('hidden');
        });

        bod.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            modal.classList.add('hidden');
          }
        });
      });
    });
  }

  renderContentLinks() {
    this.links.forEach((link) => {
      this.linksTemplate(link);
    });
  }

  linksTemplate(link) {
    const linksHTML = `
    <div class="link-content">
        <div class="link-container">
            <a href="${link}" class="link" target="_blank">
            ${link.slice(0, 45)}${link.length > 45 ? '...' : ' '}
            </a>
        </div>
     </div>
    `;

    this.linksParent.insertAdjacentHTML('beforeend', linksHTML);
  }
}

export default Draft;
