'use strict';

const mediaQuery = window.matchMedia('(max-width: 500px)');
const btnHistory = document.querySelector('.history-btn');
const btnLink = document.querySelector('.link-btn');
const btnReturn = document.querySelector('.btn-return');

const historyContent = document.querySelector(
  '.history-content-container'
);
const aiContainer = document.querySelector('.ai-response-container');
const linkContent = document.querySelector('.link-content-container');

const handleViewportChange = (event) => {
  btnReturn.addEventListener('click', (e) => {
    console.log('test');
    aiContainer.classList.remove('hidden');
    aiContainer.style.width = '100%';
    linkContent.style.width = '0%';
    linkContent.style.display = 'none';
    historyContent.style.width = '0%';
    historyContent.style.display = 'none';
  });

  btnHistory.addEventListener('click', (e) => {
    if (event.matches) {
      aiContainer.classList.add('hidden');
      linkContent.style.width = '0%';
      linkContent.style.display = 'none';
      historyContent.style.width = '100%';
      historyContent.style.display = 'block';
    }
  });

  btnLink.addEventListener('click', (e) => {
    if (event.matches) {
      aiContainer.classList.add('hidden');
      historyContent.style.width = '0%';
      historyContent.style.display = 'none';
      linkContent.style.width = '100%';
      linkContent.style.display = 'block';
    }
  });

  if (event.matches) {
    console.log('Viewport is smaller than 500px');
    aiContainer.style.width = '100%';
    linkContent.style.width = '0%';
    linkContent.style.display = 'none';
    historyContent.style.width = '0%';
    historyContent.style.display = 'none';

    btnReturn.style.display = 'flex';
  } else {
    console.log('Viewport is larger than 500px');

    aiContainer.classList.remove('hidden');
    btnReturn.style.display = 'none';
    linkContent.style.width = '27%';
    linkContent.style.display = 'block';
    aiContainer.style.width = '46%';
    historyContent.style.width = '27%';
    historyContent.style.display = 'block';
  }
};

mediaQuery.addListener(handleViewportChange);
handleViewportChange(mediaQuery);
