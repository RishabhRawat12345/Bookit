const PromoCode = require("../Models/PromoCode_Model");

// ✅ Apply Promo Code
exports.applyPromoCode = async (req, res) => {
  try {
    const { code, totalPrice } = req.body;

    if (!code || !totalPrice) {
      return res.status(400).json({ message: "Promo code and total price are required" });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res.status(404).json({ message: "Invalid promo code" });
    }

    if (!promo.isActive || new Date() > promo.expiresAt) {
      return res.status(400).json({ message: "Promo code has expired or is inactive" });
    }

    // ✅ Calculate discounted price
    const discount = (promo.discountPercentage / 100) * totalPrice;
    const newTotal = totalPrice - discount;

    res.status(200).json({
      message: "Promo code applied successfully",
      discountAmount: discount,
      newTotal,
      discountPercentage: promo.discountPercentage,
    });
  } catch (error) {
    console.error("Error applying promo code:", error);
    res.status(500).json({ message: "Server error while applying promo code" });
  }
};
