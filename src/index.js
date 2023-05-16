import './index.css';

const scorelist = document.getElementById('scores');
const submit = document.querySelector('.submit');
const nameinput = document.getElementById('name');
const scoreinput = document.getElementById('score');

const listitem = (name, score) => {
  const li = document.createElement('li');
  li.textContent = `${name} : ${score}`;
  return li;
};

submit.addEventListener('click', () => {
  const name = nameinput.value;
  const score = scoreinput.value;

  const newscore = listitem(name, score);
  scorelist.append(newscore);

  nameinput.value = '';
  scoreinput.value = '';
});