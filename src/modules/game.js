import { baseUrl, enpoints } from './app.js';

export const listitem = (name, score) => {
  const li = document.createElement('li');
  li.innerHTML = `${name}: ${score}`;
  return li;
};

export const getscore = async () => {
  const response = await fetch(baseUrl + enpoints.scores);
  const data = await response.json();
  return data.result;
};

export const savescore = async (score) => {
  const response = await fetch(baseUrl + enpoints.scores, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(score),
  });
  const data = await response.json();
  return data.result;
};
