import './EditBusBanner.css';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditBusBanner = ({ busNo }) => {
    const navigate = useNavigate();
    return (
        <div className="EditBus-banner">
            <div className="back-button" onClick={() => {
                navigate(-1);
            }}>
                <i className="fa-solid arrow-left fa-arrow-left"></i>
                <p className='back-fn'>Back</p>
            </div>
            <div className="EditBusbanner-bus">
                <div className="EditBusbanner-bus-icon">
                    <FaEdit />
                </div>
                <div className="EditBusbanner-busheadings">
                    <div className="EditBusbanner-heading">
                        Edit Bus G{busNo}
                    </div>
                    <div className="EditBusbanner-subheading">
                        Update bus route information, stops and driver details
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditBusBanner;