const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const listitem = (name, score) => {
  const li = document.createElement('li');
  li.innerHTML = `${name}: ${score}`;
  return li;
};

export const getscore = async (gameId) => {
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`);
  const data = await response.json();
  return data.result;
};

export const savescore = async (gameId, name, score) => {
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  const data = await response.json();
  const scoresResponse = await fetch(`${apiUrl}games/${gameId}/scores/`);
  const scoresData = await scoresResponse.json();
  const sortedScores = scoresData.result.sort((a, b) => b.score - a.score);
  return sortedScores;
};
