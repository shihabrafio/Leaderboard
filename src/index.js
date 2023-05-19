import './index.css';
import { listitem, getscore, savescore } from './modules/game.js';
// import { baseUrl, enpoints } from './modules/app.js';

const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click', async () => {
  const scores = await getscore();
  const scoresList = document.getElementById('scores');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const li = listitem(score.user, score.score);
    scoresList.appendChild(li);
  });
});

const submit = document.querySelector('.submit');
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameinput = document.getElementById('name');
  const scoreinput = document.getElementById('score');
  const data = {
    user: nameinput.value,
    score: Number(scoreinput.value),
  };
  await savescore(data);
  nameinput.value = '';
  scoreinput.value = '';
});

submit.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submit.blur();
  }
});

// const clearAll = document.querySelector('.clear');
// clearAll.addEventListener('click', async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch(baseUrl + enpoints.scores, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     if (response.ok) {
//       // Clear the scores UI
//       // clearScores();
//     } else {
//       // console.error('Failed to clear scores:', data);
//     }
//   } catch (error) {
//     // console.error('Error deleting scores:', error);
//   }
// });
