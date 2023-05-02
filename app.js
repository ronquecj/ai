import Draft from './models/Draft.js';

const btnSpeak = document.querySelector('.speak');
const aiResponseParent = document.querySelector(
  '.ai-response-container'
);
const historyParent = document.querySelector(
  '.history-content-container'
);
const draftCollections = [];
let greetings = 'Good';

let questionCounter = 1;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const speak = (sentence) => {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
};

window.addEventListener('load', () => {
  const activatingM = 'Activating Maiden...';
  const goingOL = 'Going online...';

  var day = new Date();
  var hr = day.getHours();

  speak(activatingM);
  speak(goingOL);

  if (hr >= 0 && hr < 12) {
    greetings = 'Good Morning';
    speak(greetings);
  } else if (hr == 12) {
    greetings = 'Good Noon';
    speak(greetings);
  } else if (hr > 12 && hr <= 17) {
    greetings = 'Good Afternoon';
    speak(greetings);
  } else {
    greetings = 'Good Evening';
    speak(greetings);
  }

  const aiResParent = document.querySelector(
    '.ai-response-container'
  );

  const aiResHTML = `
  <div class="response greet">
     <p class="question-ai">
     ${greetings}!
     </p>
     <p class="answer">
     ${activatingM} ${goingOL}
     </p>
 </div>
  `;
  aiResParent.insertAdjacentHTML('beforeend', aiResHTML);
});

btnSpeak.addEventListener('click', (e) => {
  e.preventDefault();
  recognition.start();

  recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    //#region --- api ---
    let data = JSON.stringify({
      q: `${transcript.toLowerCase()}`,
    });

    let config = {
      method: 'post',
      url: 'https://google.serper.dev/search/',
      headers: {
        'X-API-KEY': '36c563478ef01222a9ea9ede32eeeef2814ffa46',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (transcript.includes('time')) {
          const time = new Date().toLocaleString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
          });
          const aiResParent = document.querySelector(
            '.ai-response-container'
          );

          const aiResHTML = `
          <div class="response greet">
             <p class="question-ai">
             ${transcript.toUpperCase()}
             </p>
             <p class="answer">
             ${time}
             </p>
         </div>
          `;
          aiResParent.insertAdjacentHTML('beforeend', aiResHTML);
          speak(time);
        } else if (transcript.includes('date')) {
          const date = new Date().toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
          });
          const aiResParent = document.querySelector(
            '.ai-response-container'
          );

          const aiResHTML = `
          <div class="response greet">
             <p class="question-ai">
             ${transcript.toUpperCase()}
             </p>
             <p class="answer">
             ${date}
             </p>
         </div>
          `;
          aiResParent.insertAdjacentHTML('beforeend', aiResHTML);
          speak(date);
        } else {
          const linkParent = document.querySelector(
            '.link-content-container'
          );

          while (linkParent.hasChildNodes()) {
            linkParent.removeChild(linkParent.firstChild);
          }

          const resultData = `${JSON.stringify(
            data.organic[0].snippet
          )}${JSON.stringify(
            data.organic[1].snippet
          )}${JSON.stringify(data.organic[2].snippet)}`;

          const linkStorage = [];

          data.organic.forEach((element) => {
            if (linkStorage.length < 10) {
              linkStorage.push(element.link);
            } else {
              return;
            }
          });

          const draft = new Draft(
            transcript.toUpperCase(),
            resultData,
            questionCounter,
            data.organic[0].link,
            linkStorage,
            draftCollections
          );

          draftCollections.push(draft);

          if (aiResponseParent.childElementCount > 2) {
            aiResponseParent.removeChild(
              aiResponseParent.firstElementChild
            );
          }

          if (historyParent.childElementCount > 9) {
            historyParent.removeChild(
              historyParent.firstElementChild
            );
          }

          draft.renderContentAI();
          draft.renderContentHistory();
          draft.renderContentLinks();

          if (
            document.querySelector('.history-content-container')
              .childElementCount > 0
          ) {
            speak(resultData);
            questionCounter += 1;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //#endregion
  };
});
