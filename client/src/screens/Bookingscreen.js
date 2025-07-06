import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_URL;

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const startDate = moment(fromDate, "DD-MM-YYYY");
  const endDate = moment(toDate, "DD-MM-YYYY");
  const totalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;
  const [totalamt, settotalamt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/login";
        return;
      }
      try {
        setloading(true);
        const { data } = await axios.post(`${API_URL}/api/rooms/getroombyid`, {
          roomid,
        });
        settotalamt(data.rentperday * totalDays);
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchData();
  }, [roomid, totalDays]);

  const openRazorpay = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))?.data;

    try {
      const { data: order } = await axios.post(`${API_URL}/api/bookings/createorder`, {
        amount: totalamt,
      });

      const options = {
        key:process.env.RAZORPAY_KEY_ID, // Replace with your key
        amount: order.amount,
        currency: "INR",
        name: "Hotel Reservation",
        description: `Booking for ${room.name}`,
        order_id: order.id,
        handler: async function (response) {
          const bookingDetails = {
            room,
            userid: currentUser._id,
            fromDate,
            toDate,
            totalamt,
            totalDays,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            setloading(true);
            await axios.post(`${API_URL}/api/bookings/bookroom`, bookingDetails);
            setloading(false);
            swal.fire("Success", "Booking successful!", "success").then(() => {
              window.location.href = "/bookings";
            });
          } catch (error) {
            setloading(false);
            swal.fire("Error", "Something went wrong!", "error");
          }
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      swal.fire("Error", "Failed to initialize payment", "error");
    }
  };

  return (
    <div className="m-5">
      {loading ? (
        <h1><Loader /></h1>
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt="Room" />
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name: {JSON.parse(localStorage.getItem("currentUser"))?.data?.name}</p>
                <p>From Date: {fromDate}</p>
                <p>To Date: {toDate}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days: {totalDays}</p>
                <p>Rent per day: {room.rentperday}</p>
                <p>Total Amount: ₹{totalamt}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <button className="btn btn-primary" onClick={openRazorpay}>
                Pay with Razorpay
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
