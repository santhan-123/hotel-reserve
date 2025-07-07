const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const dbconfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

// Enable CORS *before* routes
app.use(cors({
  origin: [
    'https://hotel-reserve-eta.vercel.app'
  ],
  credentials: true
}));

// Parse incoming JSON
app.use(express.json());

// Routes
app.use("/api/rooms", roomsRoute);
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all handler: for any request that doesn't match API routes, send back React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server Started using nodemon`));

