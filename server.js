require("dotenv").config();
const { PORT, CROSS_ORIGIN } = process.env;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

console.log(CROSS_ORIGIN);
console.log(PORT);

io.on("connection", (socket) => {
  console.log("Connected");

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

httpServer.listen(8080);