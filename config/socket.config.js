const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
const socketio = require("socket.io");
let currentUsers = [];

const initSocketServer = () => {
  const io = socketio(server, {
    allowRequest: ensureAuthenticatedOnSocketHandshake,
  });

  io.on("connect", (socket) => {
    userLeaveGame(socket);
    currentUsers.push({
      score: 0,
      username: socket.request.user.local.username,
      _id: socket.request.user._id,
    });
    socket.on("userLeaveGame", () => {
      userLeaveGame(socket);
      io.emit("addScore", currentUsers);
      socket.disconnect(true);
    });
    socket.on("disconnect", () => {
      userLeaveGame(socket);
      io.emit("addScore", currentUsers);
    });
    socket.on("addingScore", (data) => {
      currentUsers.forEach((user) => {
        if (user._id.toString() == socket.request.user._id.toString()) {
          return (user.score = data);
        }
      });
      io.emit("addScore", currentUsers);
      const sortedUsers = currentUsers.sort(function (a, b) {
        return a.score - b.score;
      });
      console.log(sortedUsers);
      io.emit("highScore", sortedUsers[sortedUsers.length - 1]);
    });
    socket.on("close", () => {
      socket.disconnect(true);
    });
    io.emit("addScore", currentUsers);
  });
};

const userLeaveGame = (socket) => {
  if (currentUsers.length == 0) return;
  currentUsers = currentUsers.filter((user) => {
    return user._id.toString() != socket.request.user._id.toString();
  });
};
initSocketServer();
