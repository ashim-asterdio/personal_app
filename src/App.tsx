import React from "react";
import "./App.css";
// import { state } from "./store";
import { Route, Routes,useLocation } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";

function App() {
  const location=useLocation()
  console.log(location.search);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day" element={<Detail />} />
    </Routes>
  );
}

export default App;
