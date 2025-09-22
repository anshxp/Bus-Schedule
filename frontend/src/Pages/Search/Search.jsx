import React, { useEffect, useState,useRef} from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import "./Search.css";
import Loading from "../../Components/Loading/Loading.jsx";
import SingleBus from "../../Components/SingleBus/SingleBus.jsx";
import RecentBuses from "../../Components/RecentBuses/RecentBuses";
import { motion } from "framer-motion";
import { Stack } from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/buses") 
      .then(res => res.json())
      .then(data => {
        setBuses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching buses:", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if(query.trim()){
        const filtered=buses.filter(bus=>{
          if(!bus || !bus.busNo || !bus.stops) return false;
          const matchbusNo = bus.busNo.toString().toLowerCase().includes(query.toLowerCase());
          const matchRoute = 
            Array.isArray(bus.stops) && bus.stops.some(stop =>
            stop && stop.stopName?.toLowerCase().includes(query.toLowerCase())
          );
          return matchbusNo || matchRoute;
        }).map((bus) => {
          let score = 0;
          if (bus.busNo.toString().toLowerCase() === query.toLowerCase()) score += 100;
          else if (bus.busNo.toString().toLowerCase().startsWith(query.toLowerCase())) score += 50;
          else if (bus.busNo.toString().toLowerCase().includes(query.toLowerCase())) score += 25;
          if (
            bus.stops.some((stop) =>
              stop?.stopName?.toLowerCase().includes(query.toLowerCase())
            )
          ) {
            score += 10;
          }
          return {...bus,score}
        }).sort((a, b) => b.score - a.score); 
        setResults(filtered);
      }
      else{
        setResults([]);
      }
    },300);
    return () => clearTimeout(delayDebounce);
  }, [query,buses]);

   useEffect(() => {
      const q = searchParams.get("q");
      if (q) {
        setQuery(q);
      }
      inputRef.current?.focus();
    }, [searchParams]);
    if (loading) {
      return(
          <div className="load">
              <Loading />
          </div>
      ) 
    }

  return (
    <div className="whole-page">
      <div className="search-page">
        <div className="banner-heading">
          <h1>Seach Your Bus Route</h1>
        </div>
        <div className="banner-subheading">
            <p>Find your bus route easily</p>   
        </div>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            ref={inputRef}
            className="search-input-field"
            type="text"
            placeholder="Enter bus number or route..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="search-bus">
        {results.length > 0 && (
          <Stack gap={1} className="search-results">
            {results.filter(bus=>bus.isActive).map((bus, index) => (
                <motion.div
                    className="search-result-item"
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                <SingleBus 
                key={index}
                bus={bus}
                busNumber={bus.busNo}
                driverName={bus.DriverName}
                mobile={bus.ContactNo}
                totalStops={bus.stops.length}
                stops={bus.stops}
              />
              </motion.div>
            ))}
          </Stack>
        )}
      </div>
      <div className="recent-buses">
        <RecentBuses></RecentBuses>
      </div>
    </div>
  );
};

export default Search;
