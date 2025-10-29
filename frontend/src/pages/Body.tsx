import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BodyProps = {
  search: string;
};

// Define data structure for each package
interface Package {
  _id: string;
  name: string;
  image: string;
  state: string;
  description: string;
  price: number;
}

const Body: React.FC<BodyProps> = ({ search }) => {
  const [data, setData] = useState<Package[]>([]);
  const [moved,Setmoved]=useState<String[]>([]);
  const navigate = useNavigate();

  const dataall = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/experiences", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result.result || []); 
    } catch (error) {
      console.error(" Error fetching data:", error);
    }
  };

  const handlenavigate = async (id:string) => {
  try {
    const res = await fetch(`http://localhost:8080/api/experiences/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json(); 

    if (res.ok) {
      Setmoved(data || []);
      navigate("/details",{state:data});
      console.log("Data successfully fetched by ID:", data);
    } else {
      console.error("Failed to fetch data:", data.message);
    }
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
};


  useEffect(() => {
    dataall();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.state.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span className="text-sm text-gray-500">{item.state}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-yellow-600">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={()=>handlenavigate(item._id)}
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition text-black"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          <h2 className="text-2xl font-semibold">No Results Found</h2>
          <p className="text-sm mt-2">
            Try searching for another destination or state.
          </p>
        </div>
      )}
    </div>
  );
};

export default Body;
