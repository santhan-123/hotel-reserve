import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="mt-5 ms-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <div className="col-md-4 bs p-3 ms-3">
            <h1>My Profile</h1>
            <hr style={{ width: "100%" }} />
            <p>
              <b>Name</b>: {user.data.name}
            </p>
            <p>
              <b>Email</b>: {user.data.email}
            </p>
            <p>
              <b>IsAdmin</b>: {user.data.isAdmin ? "YES" : "NO"}
            </p>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user.data._id,
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error);
        Swal.fire(
          "Oops",
          "Something went wrong while fetching bookings",
          "error"
        );
      }
    };

    fetchBookings();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      await axios.post("/api/bookings/cancelbooking", {
        bookingid: bookingid,
        roomid: roomid,
      });
      setLoading(false);
      Swal.fire("Success", "Booking Cancelled Successfully", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
      Swal.fire("Oops", "Cancellation failed", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 ms-3">
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs" key={booking._id}>
                <h1>{booking.room}</h1>
                <hr />
                <p>
                  <b>Booking ID:</b> {booking._id}
                </p>
                <p>
                  <b>Check-In:</b> {booking.fromDate}
                </p>
                <p>
                  <b>Check-Out:</b> {booking.toDate}
                </p>
                <p>
                  <b>Amount:</b> ₹{booking.totalamt}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {booking.status === "cancelled" ? (
                    <Tag color="red">Cancelled</Tag>
                  ) : (
                    <Tag color="green">Confirmed</Tag>
                  )}
                </p>

                {booking.status !== "cancelled" && (
                  <div style={{textAlign: "right"}}>
                    <button
                      className="btn btn-primary"
                      onClick={() => cancelBooking(booking._id, booking.roomid)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
