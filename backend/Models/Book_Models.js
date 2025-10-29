const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  // 🗓️ Available booking dates (e.g. ["OCT22", "OCT23", "OCT24"])
  availableDates: {
    type: [String],
    default: ["OCT22", "OCT23", "OCT24", "OCT25", "OCT26"],
  },

  // ⏰ Time slots for each date
  timeSlots: {
    type: [
      {
        time: { type: String, required: true }, // e.g. "9:00 AM"
        left: { type: Number, default: 5 }, // e.g. 5 slots left
      },
    ],
    default: [
      { time: "7:00 AM", left: 4 },
      { time: "9:00 AM", left: 2 },
      { time: "11:00 AM", left: 5 },
      { time: "1:00 PM", left: 4 },
    ],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
