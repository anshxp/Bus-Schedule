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

function App() {
  const [darkMode, setDarkMode] = useState(()=>{
    return localStorage.getItem("theme") === "dark";
  });
  const toggleDarkMode = () => {
  setDarkMode((prev) => {
    const newMode = !prev;
    localStorage.setItem("theme", newMode ? "dark" : "light");
    return newMode;
    });
  };
  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark");
    }
    else{
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
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
              <Route path="/admin" element={<Admin />} />
              <Route path="/addbus" element={<AddBus />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
