const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true }, // e.g., 10 for 10%
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("PromoCode", PromoCodeSchema);
