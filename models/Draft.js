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
