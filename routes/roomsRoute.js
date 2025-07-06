const express = require("express");

const router = express.Router();

const Room = require("../models/rooms");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/getroombyid", async (req, res) => {
  console.log("Incoming request body:", req.body);
  const { roomid } = req.body;

  try {
    const room = await Room.findById(roomid);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.send(room);
  } catch (error) {
    console.error("Error in getroombyid:", error);
    return res.status(400).json({ message: error.message });
  }
});


router.post("/addroom", async (req, res) => {
  const newRoom = new Room(req.body);
  try {
    await newRoom.save();
    res.send("Room Added Successfully");
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
