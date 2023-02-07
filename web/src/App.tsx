import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Password from "./pages/Password";
import Playground from "./pages/Playground";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/password" element={<Password />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
