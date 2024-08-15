require('dotenv').config();

const { PORT, CROSS_ORIGIN } = process.env;

const io = require("socket.io")(PORT || 8080, {
  cors: {
    origin: CROSS_ORIGIN || "https://mountains-and-rivers.netlify.app",
  },
});

console.log(CROSS_ORIGIN);
console.log(PORT);

io.on("connection", (socket) => {
  const userAgent = socket.handshake.headers['user-agent'];

  console.log('User Agent: ', userAgent)

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
