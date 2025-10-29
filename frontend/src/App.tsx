import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./pages/Nav";
import Body from "./pages/Body";
import Details from "./pages/Details";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Body search={search} />} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/details" element={<Details />} />
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </>
  );
};

export default App;
