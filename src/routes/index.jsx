// src/routes/index.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Hero'; // Adjust the path as needed
import Demo from '../components/Demo';  // Adjust the path as needed

const AppRoutes = () => (
 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      {/* Add more routes as needed */}
    </Routes>
 
);

export default AppRoutes;
