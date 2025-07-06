const express = require("express");
const app = express();
const cors = require("cors");

const dbconfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

// Enable CORS *before* routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse incoming JSON
app.use(express.json());

// Routes
app.use("/api/rooms", roomsRoute);
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server Started using nodemon`));