import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Password from './pages/Password';
import Playground from './pages/Playground';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/password" element={<Password />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
