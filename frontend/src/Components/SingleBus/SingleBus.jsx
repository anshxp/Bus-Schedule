import { Container ,Button} from "react-bootstrap"
import './SingleBus.css';
import { useNavigate } from "react-router-dom";
import { addRecentBuses } from '../../utills/RecentBuses';

const SingleBus=({bus,busNumber,driverName,mobile,totalStops,stops})=>{
    const navigate = useNavigate();
    const handleClick=()=>{
        addRecentBuses(bus)
        navigate(`/bus/${busNumber}`);
    }
    return(
        <Container className="single-bus">
            <div className="upper-part">
                <div className="about-bus-parts">
                    <div className="about-right-part">
                        <div className="single-bus-icon">
                        <i className="fa-solid fa-bus actual-icon"></i>
                        </div>
                        <div className="bus-data">
                            <div className="busn"><strong>Bus G{busNumber}</strong></div>
                            <div className="total-stops"> <i className="fa-solid fa-location-dot"> </i>{totalStops} Stops</div>
                        </div>
                    </div>
                    <button className="about-left-part-button">
                        <p onClick={handleClick}>View Route</p>
                    </button>
                </div>
            </div>
            <div className="lower-part">
                <div className="about-driver">
                    <div className="driver-icon">
                        <i className="fa-solid user-icon fa-user"></i>
                    </div>
                    <div className="driver-info">
                        <div className="drivername">
                            {driverName}
                        </div>
                        <div className="driver-num">
                            <i className="fa-solid fa-phone"></i>
                            {mobile?mobile:"Not Available"}
                        </div>
                    </div>
                </div>
                <div className="route-guide">
                    <div className="route-heading">
                        <i className="fa-solid fa-location-dot"></i>
                        Route Stops
                    </div>
                    <div className="routes">
                            {stops && stops.slice(0,3).map((stop,index)=>(
                                <div key={index} className="singlebus-stop">
                                        <div className="singlebus-stop-name">
                                            {stop.stopName}
                                        </div>
                                        <div className="timings">
                                            <i className="fa-solid fa-clock"></i>
                                            {stop.firstShift} || {stop.secondShift}
                                        </div>
                                </div>
                            ))}
                        <div className="more-buses">
                            {
                                totalStops > 3 && <p>+ {totalStops-3} more stops</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="seperate-line"></div>
            <div className="first-stop">
                <div className="left-first">
                    <i className="fa-solid fa-clock"></i>
                     {stops[0].firstShift}
                </div>
                <div className="right-second">
                    <i className="fa-solid fa-clock"></i>
                     {stops[0].secondShift}
                </div>
            </div>
        </Container>
    )
}

export default SingleBus;