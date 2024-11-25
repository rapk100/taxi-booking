import React, { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        { pickup, dropoff }
      );
      setMessage("Booking confirmed! Your booking ID is: " + response.data.id);
    } catch (error) {
      console.error(error);
      setMessage("Error while booking. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h1>Taxi Booking System</h1>
        <div>
          <label>Pickup Location: </label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label>Drop-off Location: </label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
            style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Book Now
        </button>
        <p style={{ marginTop: "10px" }}>{message}</p>
      </form>
    </div>
  );
};

export default BookingForm;
