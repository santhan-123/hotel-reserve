import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  // Correctly use useState for state initialization
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  // Initialize fromDate and toDate state variables
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  const [searchkey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      const from = moment(dates[0].toDate()).format("DD-MM-YYYY");
      const to = moment(dates[1].toDate()).format("DD-MM-YYYY");
      setFromDate(from);
      setToDate(to);
      var temprooms = [];
      var availability = false;
      for (const room of duplicaterooms) {
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(
                moment(moment(dates[0].toDate()).format("DD-MM-YYYY")).isBetween(
                  booking.fromDate,
                  booking.toDate
                )
              ) &&
              !moment(
                moment(moment(dates[1].toDate()).format("DD-MM-YYYY")).isBetween(
                  booking.fromDate,
                  booking.toDate
                )
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
              ) {
                availability = true;
              }
            }
          }
        }
        if (availability == true || room.currentbookings.length == 0) {
          temprooms.push(room);
        }
      }
      setRooms(temprooms);
    }
  }
  function filtereBysearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setRooms(temprooms);
  }

  function filterByType(selectedType) {
    setType(selectedType);
  
    if (selectedType === "all") {
      setRooms(duplicaterooms);
    } else {
      const temprooms = duplicaterooms.filter((room) =>
        room.type.toLowerCase().includes(selectedType.toLowerCase())
      );
      setRooms(temprooms);
    }
  }
  
  

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker
            format="DD-MM-YYYY"
            onChange={(dates) => filterByDate(dates)}
          />
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Search Rooms"
          value={searchkey} onChange={(e)=>{setSearchKey(e.target.value)}}onKeyUp={filtereBysearch}/>
        </div>
        <div className="col-md-3">
        <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="Luxury">Luxury</option>
          <option value="non-delux">Non- Delux</option>
        </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) :(
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2 " key={room._id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
