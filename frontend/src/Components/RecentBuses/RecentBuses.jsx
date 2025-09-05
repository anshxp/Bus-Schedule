import { getRecentBuses } from '../../utills/RecentBuses';
import { useEffect,useState } from 'react';
import './RecentBuses.css';
import { addRecentBuses } from '../../utills/RecentBuses';
import { useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SingleBus from '../SingleBus/SingleBus';
const RecentBuses=()=>{
    const navigate = useNavigate();
    const [recentbuses,setrecentbuses]=useState([]);
    useEffect(()=>{
        setrecentbuses(getRecentBuses());
    },[]);
    return(
        <div className="recent-buses-container mt-3">
            <h4 className='section-heading'>
                <i className="fa-solid fa-clock-rotate-left"></i>
                Recent Buses Visited
            </h4>
            <p className='about-recent'>Discover the Recent routes you have visited.</p>
            {recentbuses.length===0?(
                <p className="no-recent">No recent buses found</p>
            ):(
                <Stack gap={1} className="recent-bus-list">
                    {recentbuses.map((bus, index) => (
                        <motion.div 
                            className="bus-item"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                        <SingleBus 
                            onClick={()=>{
                                    addRecentBuses(bus);
                                    navigate(`/bus/${bus.busNo}`)
                                }}
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
    )
}
export default RecentBuses;