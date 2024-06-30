import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Nav from './Nav';
import MyProfile from './MyProfile';

export const StoreContext = createContext();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <StoreContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
        </BrowserRouter>
      </StoreContext.Provider>
    </div>
  );
};

export default App;
