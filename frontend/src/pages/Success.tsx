import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Success = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img
        className="h-[201px] w-[216px] mb-6"
        src="https://cdn-icons-png.flaticon.com/128/14090/14090371.png"
        alt="Success Icon"
      />
      <h1 className="text-4xl  text-black mb-2">Booking Confirmed</h1>
      <p className="text-gray-600 text-lg mb-8">Ref ID: HUF56&SO</p>

      <button
        onClick={() => navigate('/')}
        className="bg-gray-400 hover:bg-gray-400 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-300 ease-in-out"
      >
        Back to Home
      </button>
    </div>
  )
}

export default Success
