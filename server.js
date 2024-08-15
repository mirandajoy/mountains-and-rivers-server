const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("gameDetails", (key, sessionValue) => {
    io.emit("gameDetails", key, sessionValue);
  });

  socket.on("gameSetup", (setupDetails) => {
    io.emit("gameSetup", setupDetails);
  });

  socket.on("boardPosition", (positionDetails) => {
    io.emit("boardPosition", positionDetails);
  });

  socket.on("winner", (winner) => {
    io.emit("winner", winner);
  });

  socket.on("activePlayer", (player) => {
    io.emit("activePlayer", player);
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("diceRoll", (rollValues) => {
    io.emit("diceRoll", rollValues);
  });
});
