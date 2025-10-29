const Booking = require("../Models/BooksBill_modles");
const Package = require("../Models/Book_Models");

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const { experienceId, userName, email, date, time, numPeople, promoCode } = req.body;

    // 1️⃣ Validate input
    if (!experienceId || !userName || !email ||  !date || !time || !numPeople) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2️⃣ Find experience
    const experience = await Package.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found." });

    // 3️⃣ Check time slot availability
    const slot = experience.timeSlots.find(s => s.time === time);
    if (!slot || slot.left < numPeople) {
      return res.status(400).json({ message: "Selected time slot is not available." });
    }

    // 4️⃣ Decrease available seats
    slot.left -= numPeople;
    await experience.save();

    // 5️⃣ Calculate total price
    let totalPrice = experience.price * numPeople;

    // Apply promo if provided
    if (promoCode === "SAVE10") {
      totalPrice *= 0.9; // 10% off
    } else if (promoCode === "FLAT100") {
      totalPrice -= 100;
    }

    // 6️⃣ Create booking
    const booking = await Booking.create({
      experienceId,
      userName,
      email,
      date,
      time,
      numPeople,
      promoCode,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking confirmed successfully!",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
