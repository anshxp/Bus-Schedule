import './RouteBanner.css'
import {useNavigate} from "react-router-dom";
const RouteBanner=({busNumber,totalstops})=>{
    const navigate =useNavigate();
    return(
        <div className="route-banner">
            <div className="back-button" onClick={()=>{
                navigate(-1);
            }}>
                <i class="fa-solid arrow-left fa-arrow-left"></i>
                <p className='back-fn'>Back</p>
            </div>
            <div className="routebanner-bus">
                <div className="routebanner-bus-icon">
                    <i className="fa-solid fa-bus-side route-bus-icon"></i>
                </div>
                <div className="routebanner-busheadings">
                    <div className="routebanner-busn">
                        Bus G{busNumber}
                    </div>
                    <div className="routebanner-totalstops">
                        {totalstops} Stops
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RouteBanner;