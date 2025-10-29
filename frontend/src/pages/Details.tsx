import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from Body component
  const data = location.state?.data;

  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [info, setInfo] = useState<any>({});

  if (!data) return <p>No data found.</p>;


    useEffect(()=>{
      console.log("details pages",data)
    },[data]);
  
  // Dynamic values
  const subtotal = data.price * quantity;
  const taxRate = 0.18;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  // Confirm booking
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time!");
      return;
    }

    const bookingInfo = {
      Id:data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity,
      subtotal,
      taxes,
      total,
      selectedDate,
      selectedTime,
    };

    console.log("Booking confirmed:", bookingInfo);
    setInfo(bookingInfo);
    navigate("/payment", { state: bookingInfo });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 p-8 bg-gray-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="left w-full md:w-2/3 bg-white rounded-2xl p-6 shadow-md">
        {/* Image */}
        <img
          src={data.image}
          alt={data.name}
          className="rounded-xl w-full h-64 object-cover"
        />

        <h1 className="text-3xl font-bold mt-4 text-gray-900">{data.name}</h1>
        <p className="text-gray-700 mb-4">{data.description}</p>

        {/* Date Selection */}
        <h1 className="text-2xl font-bold mt-6">Choose Date</h1>
        <div className="flex flex-wrap gap-3 mt-4">
          {data.availableDates?.map((date: string) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-lg border ${
                selectedDate === date
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Time Slots (Always Visible) */}
        <h1 className="text-2xl font-bold mt-6">Choose Time</h1>
        <div className="flex flex-wrap gap-3 mt-4">
          {data.timeSlots?.map((slot: { time: string; left: number }) => (
            <button
              key={slot.time}
              onClick={() => {
                if (slot.left <= 0) {
                  alert("This slot is fully booked!");
                  return;
                }
                setSelectedTime(slot.time);
              }}
              className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition-all ${
                selectedTime === slot.time
                  ? "bg-yellow-500 text-white"
                  : slot.left <= 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
              disabled={slot.left <= 0}
            >
              <span>{slot.time}</span>
              <span
                className={`${
                  slot.left <= 0
                    ? "text-red-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }`}
              >
                {slot.left > 0 ? `${slot.left} left` : "Full"}
              </span>
            </button>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900">About</h1>
          <p className="bg-gray-100 text-gray-600 rounded-lg p-3 mt-4">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg shadow-md transition"
        >
          Confirm Booking
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="right w-full md:w-1/3 bg-gray-200 rounded-2xl shadow-xl p-6 h-fit">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 font-medium">Start At</span>
          <span className="text-gray-700 font-semibold">₹{data.price}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 font-medium">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 rounded-full border border-gray-400"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 rounded-full border border-gray-400"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes (18%)</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Details;
