const x = window.matchMedia('(max-width: 768px)');
const answer = document.querySelector('.answer');

const mQuery = (x) => {
  if (x.matches) {
    answer.innerHTML.slice(0, 30);
  }
};

mQuery(x);
x.addEventListener(mQuery);
