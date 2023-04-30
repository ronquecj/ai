import Draft from './Draft.js';

const btnSpeak = document.querySelector('.speak');
const aiResponseParent = document.querySelector(
  '.ai-response-container'
);
const historyParent = document.querySelector(
  '.history-content-container'
);

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
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        const linkParent = document.querySelector(
          '.link-content-container'
        );

        while (linkParent.hasChildNodes()) {
          linkParent.removeChild(linkParent.firstChild);
        }

        const resultData = `${JSON.stringify(
          data.organic[0].snippet
        )}${JSON.stringify(data.organic[1].snippet)}${JSON.stringify(
          data.organic[2].snippet
        )}`;

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
          linkStorage
        );

        if (aiResponseParent.childElementCount > 2) {
          aiResponseParent.removeChild(
            aiResponseParent.firstElementChild
          );
        }
        if (historyParent.childElementCount > 9) {
          historyParent.removeChild(historyParent.firstElementChild);
        }
        // if (historyParent.childElementCount > 0) {
        //   const q = document.querySelector('.question');

        //   q.addEventListener('click', (e) => {
        //     console.log('test');
        //   });
        // }

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
      })
      .catch((error) => {
        console.log(error);
      });
    //#endregion
  };
});