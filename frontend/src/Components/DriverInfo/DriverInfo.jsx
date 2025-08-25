import './DriverInfo.css';
const DriverInfo=({drivername,mobile})=>{
    return (
        <div className="driver-information">
            <div className="driver-head">
                <i className="fa-regular fa-user user-icon"></i>
                <div className="driver-main-head">Driver Information</div>
            </div>
            <div className="driver-data">
                <div className="driver-left">
                    <div className="driverName">{drivername}</div>
                    <div className="drivermobile">
                        <i class="fa-classic fa-phone contact"></i>{mobile}
                    </div>
                </div>
                <button 
                    className="driver-right"
                    onClick={()=>{
                        window.location.href=`tel:${mobile}`
                    }}>
                    <i class="fa-solid fa-phone contact"></i>
                    <div className="call-driver">Call Driver</div>
                </button>
            </div>
        </div>
    )
}
export default DriverInfo;