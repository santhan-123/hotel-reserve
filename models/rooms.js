const mongoose = require("mongoose");

const roomScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxcount: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbookings: [
      {
        bookingid: {
          type: String,
          required: true,
        },
        fromDate: {
          type: String,
          required: true,
        },
        toDate: {
          type: String,
          required: true,
        },
        userid: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          default: "booked",
        },
      },
    ],
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomScheme);
module.exports = roomModel;
