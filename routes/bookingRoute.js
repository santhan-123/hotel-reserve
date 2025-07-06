const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/rooms");
const moment = require("moment");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/user");
const {
  sendBookingConfirmationEmail,
} = require("../utils/sendBookingConfirmationEmail");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/createorder", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_" + Math.floor(Math.random() * 10000),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// Book room
router.post("/bookroom", async (req, res) => {
  const {
    room,
    userid,
    fromDate,
    toDate,
    totalamt,
    totalDays,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  try {
    const generated_signature = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: userid,
      fromDate: moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      toDate: moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      totalamt: totalamt,
      totalDays: totalDays,
      transactionId: razorpay_payment_id,
    });

    const booking = await newbooking.save();

    const roomtemp = await Room.findById(room._id);
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromDate: booking.fromDate,
      toDate: booking.toDate,
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    const user = await User.findById(userid);
    await sendBookingConfirmationEmail(user, booking);

    res.send("Room booked successfully");
  } catch (error) {
    console.error("Booking error:", error);
    res.status(400).json({ error: "Booking failed" });
  }
});


// Cancel Booking
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });
    room.currentbookings = room.currentbookings.filter(
      (b) => b.bookingid.toString() !== bookingid.toString()
    );

    await room.save();

    res.send("Booking cancelled successfully");
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
