const ioClient = io({
  reconnection: true,
});

ioClient.on("connect", () => {
  console.log("Connected to server");
});

ioClient.on("addScore", (data) => {
  displayScores(data);
});

ioClient.on("highScore", (data) => {
  displayHighScore(data);
});
