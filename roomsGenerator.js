const fs = require("fs").promises;
const path = require("path");

async function readRoomData(room) {
  try {
    const jsonString = await fs.readFile("rooms.json", "utf8");
    const parsedJson = JSON.parse(jsonString);
    const checkExisting = parsedJson.findIndex((r) => r === room);
    return { index: checkExisting, data: parsedJson };
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

const addRoomData = (arr) => {
  const data = JSON.stringify(arr);
  fs.writeFile("rooms.json", data, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File has been written successfully.");
    }
  });
};

const generateNewRoom = async (rooms) => {
  try {
    const newRoom = Math.floor(1000 + Math.random() * 9000);
    if (rooms.has(newRoom)) {
      generateNewRoom(rooms);
    } else {
      return newRoom;
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
  //   const check = await readRoomData(newRoom);
  //   if (check.index === -1) {
  //     addRoomData([...check.data, newRoom]);
  //     return newRoom;
  //   } else {
  //     generateNewRoom();
  //   }
  // } catch (err) {
  //   console.error("Error reading file:", err);
  // }
};

const removeRoom = async (closedRoom) => {
  try {
    const check = await readRoomData(closedRoom);
    if (check.index !== -1) {
      check.data.splice(check.index, 1);
      addRoomData(check.data);
    } else {
      console.error("No room found");
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

module.exports = {
  generateNewRoom,
};
