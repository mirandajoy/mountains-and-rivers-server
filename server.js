require("dotenv").config();
const { generateNewRoom } = require("./roomsGenerator.js");

const { PORT, CROSS_ORIGIN } = process.env;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const rooms = io.of("/").adapter.rooms;

console.log(CROSS_ORIGIN);
console.log(PORT);

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("playerList", (list, room) => {
    io.to(room).emit("playerList", list);
  });

  socket.on("gameSetup", (setupDetails, room) => {
    io.to(room).emit("gameSetup", setupDetails);
  });

  socket.on("boardPosition", (positionDetails, room) => {
    io.to(room).emit("boardPosition", positionDetails);
  });

  socket.on("winner", (winner, room) => {
    io.to(room).emit("winner", winner);
  });

  socket.on("activePlayer", (player, room) => {
    io.to(room).emit("activePlayer", player);
  });

  socket.on("message", (message, room) => {
    io.to(room).emit("message", message);
  });

  socket.on("diceRoll", (rollValues, room) => {
    io.to(room).emit("diceRoll", rollValues);
  });

  socket.on("createRoom", () => {
    async function logRoomData() {
      try {
        const newRoom = await generateNewRoom(rooms);
        socket.join(newRoom);
        io.to(socket.id).emit("joinRoom", newRoom);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }
    logRoomData();
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    io.to(socket.id).emit("joinRoom", roomId);
    socket.to(roomId).emit("getPlayerList");
  });

  socket.on("resetRoom", (roomId) => {
    io.to(roomId).emit("resetRoom");
    console.log("reset");
  });
});

httpServer.listen(8080);
