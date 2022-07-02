import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./css/reset.css";
import SingupScreen from "./SingupScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/singup" element={<SingupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
