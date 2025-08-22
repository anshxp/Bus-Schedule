import { useNavigate } from 'react-router-dom';
import SingleBus from '../SingleBus/SingleBus';
import './AllRoute.css';
import { motion } from 'framer-motion';

const AllRoute=({viewtype,setViewType,buses})=>{
    return (
        <div className="allroute-area">
            <div className="Total-buses">
                <p><i className="fa-solid fa-bus-side route-bus-icon"></i>{buses.length} Routes Available</p>
                <div className="griding">
                    <div className={`grid ${viewtype === 'grid' ? 'active' : ''}`} onClick={() => setViewType('grid')}>
                        <span className="material-symbols-outlined">grid_view</span>
                    </div>
                    <div className= {`list ${viewtype === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}>
                        <i className="fa-solid fa-list"></i>
                    </div>
                </div>
            </div>
            <div className={`all-buses ${viewtype}`}>
                {buses.map((bus,idx)=>(
                    <motion.div
                        key={idx}
                        initial={{opacity:0,y:-50}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:0.5,delay:0.5}}
                        >
                        <SingleBus 
                            onClick={()=>(
                                addRecentBuses(bus)
                        )}
                            bus={bus}
                            busNumber={bus.Busno}
                            driverName={bus.DriverName}
                            mobile={bus.ContactNo}
                            totalStops={bus.stops.length}
                            stops={bus.stops}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
export default AllRoute;