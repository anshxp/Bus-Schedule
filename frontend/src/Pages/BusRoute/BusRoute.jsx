import './BusRoute.css';
import { useParams } from 'react-router-dom';
import Stop from '../../Components/Stop/Stop.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import DriverInfo from '../../Components/DriverInfo/DriverInfo.jsx';
import RouteBanner from '../../Components/RouteBanner/RouteBanner.jsx';
import QuickInfo from '../../Components/QuickInfo/QuickInfo.jsx';

const BusRoute=()=>{
    const { busNo } = useParams();
    const [bus, setbus]= useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch(`http://localhost:3000/buses/${busNo}`)
        .then(res=> res.json())
        .then(data=>{
            console.log("Fetched Bus:", data);
            setbus(data || []);
            setLoading(false);
        })
        .catch(err => {
                console.error("Error fetching bus route:", err);
                setLoading(false);
            });
        }, [busNo])
    if (loading) {
        return(
            <div className="load">
                <Loading />
            </div>
        ) 
    }
    if (!bus || !bus.stops) {
        console.log("No stops found for bus:", busNo);
    }
    return (
        <div className="bus-route-container">
            <RouteBanner 
                busNumber={busNo}
                totalstops={bus.stops.length}
            />
            <div className="busroute-bottom">
                <div className="busroute-main">
                    <DriverInfo 
                        drivername={bus.DriverName || "N/A"}
                        mobile={bus.ContactNo || "N/A"}
                    />
                    <div className="route-stops">
                        <div className="busroute-stops">
                            <i class="fa-solid loc-icon fa-location-dot"></i>
                            <p className='route-heading'>Route Stops</p>
                        </div>
                        <div className="all-stops">
                            {bus.stops && bus.stops.map((stop, index) => (
                                <motion.div 
                                    className="stop"
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    >
                                <Stop
                                className="stop-item"
                                    index={index+1}
                                    stopName={stop.stopName}
                                    first={stop["firstShift"] || "N/A"}
                                    second={stop["secondShift"] || "N/A"}
                                />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="busroute-side">
                    <QuickInfo 
                        BusNumber={busNo}
                        totalstops={bus.stops.length}
                        firstxfirst={bus.stops[0]?.["firstShift"] || "N/A"}
                        secondxfirst={bus.stops[0]?.["secondShift"] || "N/A"}
                    />
                </div>
            </div>
            
        </div>
    )
}
export default BusRoute;