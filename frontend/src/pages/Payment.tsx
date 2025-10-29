import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};
  const [promoCode, setPromoCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(data.total || 0);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data.name)
    return <p className="text-center text-gray-600">No booking info found!</p>;

  // ✅ Handle Promo Code Apply
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code!");
      return;
    }

    try {
      const response = await fetch("https://bookit-m3xn.onrender.com/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode,
          totalPrice: data.total,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setDiscount(result.discountAmount);
        setFinalTotal(result.newTotal);
        toast.success(
          `Promo applied! You saved ₹${result.discountAmount.toFixed(
            2
          )}. 🎉`
        );
      } else {
        toast.error(result.message || "Invalid promo code ");
      }
    } catch (error) {
      console.error("Error applying promo:", error);
      toast.error("Server error while applying promo code!");
    }
  };

  const handlePaymentDone = async () => {
    if (!userName || !email) {
      toast.error("Please fill out all required fields!");
      return;
    }

    try {
      const bookingData = {
        experienceId: data.Id || "000000000000000000000000",
        userName,
        email,
        date: data.selectedDate,
        time: data.selectedTime,
        numPeople: data.quantity,
        promoCode,
        totalPrice: finalTotal,
      };

      console.log(bookingData);
      const response = await fetch("https://bookit-m3xn.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Payment successful! Booking confirmed ");
        setTimeout(() => navigate("/success", { state: result }), 1000);
      } else {
        toast.error("Booking failed: " + (result.message || "Server error"));
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Something went wrong while saving booking!");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition"
        >
          <ArrowLeft size={22} />
          Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
    
        <div className="w-full md:w-2/3 bg-gray-100 rounded-2xl shadow-md p-5 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center md:text-left">
            Payment Details
          </h1>

          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Promo Code
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-grow border border-gray-300 rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-black hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-5 w-5 text-yellow-500 border-gray-300 rounded"
              />
              <p className="text-gray-700 text-sm sm:text-base">
                Billing info same as booking info
              </p>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-5 md:p-6 mt-6 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Billing Information
          </h2>

          <div className="text-gray-700 space-y-3 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Activity</span>
              <span>{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{data.selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{data.selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{data.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{data.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{data.taxes?.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePaymentDone}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg shadow-md transition"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
