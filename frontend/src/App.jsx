import React, { useEffect,useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Search from './Pages/Search/Search.jsx';
import Home from './Pages/Home/Home.jsx';
import AllBuses from './Pages/AllBuses/AllBuses.jsx';
import Admin from './Pages/Admin/Admin.jsx'
import BusRoute from './Pages/BusRoute/BusRoute.jsx';
import BusIntro from './Components/BusIntro/BusIntro.jsx'; 
import AddBus from './Pages/AddBus/AddBus.jsx';
import EditBus from './Pages/EditBus/EditPage.jsx';
import ProtectedRoute from './Components/routes/ProtectedRoute.jsx';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="page-wrapper">
          <Navbar/>
          <BusIntro />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/allbuses" element={<AllBuses />} />
              <Route path="/search" element={<Search />} />
              <Route path="/bus/:busNo" element={<BusRoute />} />
              <Route path="/admin" element={
                  <Admin />} />
              <Route path="/addbus" element={
                <ProtectedRoute>
                  <AddBus />
                  </ProtectedRoute>
                } />
              <Route path="/bus/:busNo/editbus" element={
                <ProtectedRoute>
                  <EditBus />
                </ProtectedRoute>} />
            </Routes>
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
