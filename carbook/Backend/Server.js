const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
  pickup: String,
  dropoff: String,
  date: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

// Routes
app.post("/api/bookings", async (req, res) => {
  const { pickup, dropoff } = req.body;
  try {
    const booking = new Booking({ pickup, dropoff });
    await booking.save();
    res.status(201).json({ message: "Booking successful", id: booking._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
