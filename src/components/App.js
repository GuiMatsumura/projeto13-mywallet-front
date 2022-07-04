import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./css/reset.css";
import LoginScreen from "./LoginScreen";
import SingupScreen from "./SingupScreen";
import EntryScreen from "./EntryScreen";
import OutputScreen from "./OutputScreen";
import HomeScreen from "./HomeScreen";
import TokenContext from "./context/Token";
import NameContext from "./context/Name";

export default function App() {
  const [token, setToken] = React.useState("");
  const [userName, setUserName] = React.useState("");
  return (
    <TokenContext.Provider value={[token, setToken]}>
      <NameContext.Provider value={[userName, setUserName]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/singup" element={<SingupScreen />} />
            <Route path="/entry" element={<EntryScreen />} />
            <Route path="/spend" element={<OutputScreen />} />
          </Routes>
        </BrowserRouter>
      </NameContext.Provider>
    </TokenContext.Provider>
  );
}
