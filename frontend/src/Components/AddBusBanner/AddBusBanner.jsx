import './AddBusBanner.css'
const AddBusBanner=()=>{
    return(
        <div className="AddBus-banner">
            <div className="back-button" onClick={()=>{
                navigate(-1);
            }}>
                <i className="fa-solid arrow-left fa-arrow-left"></i>
                <p className='back-fn'>Back</p>
            </div>
            <div className="AddBusbanner-bus">
                <div className="AddBusbanner-bus-icon">
                    <i className="fa-solid fa-bus-side route-bus-icon"></i>
                </div>
                <div className="AddBusbanner-busheadings">
                    <div className="AddBusbanner-heading">
                        Add New Bus
                    </div>
                    <div className="AddBusbanner-subheading">
                        Create a new bus route with stops and driver information
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddBusBanner;