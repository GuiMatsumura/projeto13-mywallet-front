import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./css/reset.css";
import LoginScreen from "./LoginScreen";
import SingupScreen from "./SingupScreen";
import EntryScreen from "./EntryScreen";
import TokenContext from "./context/Token";

export default function App() {
  const [token, setToken] = React.useState("");
  return (
    <TokenContext.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/singup" element={<SingupScreen />} />
          <Route path="/entry" element={<EntryScreen />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}
