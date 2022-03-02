function displayScores(data) {
  const scores = document.querySelector("tbody");
  scores.innerHTML = "";
  data.map((score) => {
    scores.innerHTML += `<tr><td>${score.username}</td><td>${score.score}</td></tr>`;
  });
}

function displayHighScore(data) {
  const highScore = document.querySelector("#highScore");
  highScore.innerHTML = "";
  highScore.innerHTML = `Le joueur ${data.username} a le plus grand score en cours avec ${data.score} points`;
}
