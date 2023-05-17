import "./index.css";
import { listitem, getscore, savescore } from "../modules/game.js";

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let ID;
const createGame = async () => {
  let stored = localStorage.getItem("ID");
  if (stored) {
    ID = stored;
  } else {
    const response = await fetch(`${apiUrl}games/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Your Game" }),
    });
    const data = await response.json();
    ID = data.result;
    localStorage.setItem("ID", ID);
  }
};
createGame();

const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click', async () => {
  const scores = await getscore(ID);
  const scoresList = document.getElementById('scores');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const li = listitem(score.user, score.score);
    scoresList.appendChild(li);
  });
});

const submit = document.querySelector(".submit");
submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameinput = document.getElementById("name");
  const scoreinput = document.getElementById("score");
  const name = nameinput.value.trim();
  const score = parseInt(scoreinput.value);
  await savescore(ID, name, score);
  nameinput.value = "";
  scoreinput.value = "";
});

submit.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submit.click(); 
  }
});

const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click',  () => {
  const scoresList = document.getElementById('scores');
  scoresList.innerHTML = '';
  localStorage.removeItem("ID");
  location.reload();
});