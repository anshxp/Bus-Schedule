import './AddBus.css';
import AddBusBanner from '../../Components/AddBusBanner/AddBusBanner.jsx';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
const AddBus=()=>{
    const [busNo,setbusNo]=useState("");
    const [driverName,setdriverName]=useState("");
    const [ContactNo,setContactNo]=useState("");
    const [stops,setStops]=useState([
        {stopName:"",firstShift:"",secondShift:""}
    ]);
    const handleStop=()=>{
        setStops([...stops,{stopName:"",firstShift:"",secondShift:""}])
    };
    const handleRemoveStop=(index)=>{
        setStops(stops.filter((_,i)=>i!==index))
    };
    const handleStopChange = (index, field, value) => {
        const updatedStops = [...stops];
        updatedStops[index][field] = value;
        setStops(updatedStops);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const busData = {
        busNo,
        DriverName:driverName,
        ContactNo,
        stops,
    }
    try {
        const res = await fetch('http://localhost:3000/buses/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(busData),
        });

        const data = await res.json();

        if (data.success) {
            alert('Bus added successfully!');
            setbusNo("");
            setdriverName("");
            setContactNO("");
            setStops([{ stopName: "", firstShift: "", secondShift: "" }]);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Something went wrong!');
    }}
    ;
    return(
        <div className="AddBus">
            <AddBusBanner/>
            <div className="AddBus-form">
                <form onSubmit={handleSubmit}>
                    <div className="AddBus-BusInfo">
                        <div className="AddBus-BusInfo-heading">
                            Bus Information
                        </div>
                        <label htmlFor="busNo">Bus Number</label>
                        <input
                        id="busNo"
                        placeholder="Only enter Bus number"
                        value={busNo}
                        onChange={(e) => setBusNumber(e.target.value)}
                        />
                    </div>
                    <div className="AddBus-DriverInfo">
                        <div className="AddBus-DriverInfo-heading">
                            Driver Information
                        </div>
                        <label htmlFor="driverName">Driver Name</label>
                        <input
                        id="driverName"
                        placeholder="Enter Driver's Name"
                        value={busNo}
                        onChange={(e) => setdriverName(e.target.value)}
                        />
                        <label htmlFor="ContactNo">Driver Contact Number</label>
                        <input
                        id="ContactNo"
                        placeholder="Enter Driver's Contact Number"
                        value={driverName}
                        onChange={(e) => setContactNo(e.target.value)}
                        />
                    </div>
                    <div className="AddBus-RouteInfo">
                        <div className="AddBus-RouteInfo-heading">
                            <div className="mainheading">
                                Route Stops
                            </div>
                            <div className="AddStop-button" onClick={handleStop}>
                                + Add Stop
                            </div>
                        </div>
                        {stops.map((stop,index)=>(
                            <div key={index} className="stop-box">
                                <div className="stop-header">
                                    <h3>Stop {index+1}</h3>
                                {stops.length > 1 && (
                                    <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => handleRemoveStop(index)}
                                    >
                                    <FaTrash/>
                                    </button>
                                )}
                                </div>
                                <div className="stop-detail">
                                    <label className='stopName' htmlFor="stopName">Stop Name</label>
                                    <input type="text"
                                        value={stop.stopName}
                                        className='stopName'
                                        onChange={(e) =>
                                            handleStopChange(index, "stopName", e.target.value)
                                        }
                                        placeholder='Enter the Stop Name'
                                    />
                                    <div className="stop-timings">
                                        <div className="firstshift">
                                            <label htmlFor="firstShift">First Shift</label>
                                            <input type="text"
                                                value={stop.firstShift}
                                                className='timing'
                                                onChange={(e) =>
                                                    handleStopChange(index, "firstShift", e.target.value)
                                                }
                                                placeholder='Enter the First Shift Timing'
                                            />
                                        </div>
                                        <div className="secondShift">
                                                <label htmlFor="secondhift">Second Shift</label>
                                                <input type="text"
                                                className='timing'
                                                    value={stop.secondShift}
                                                    onChange={(e) =>
                                                        handleStopChange(index, "secondShift", e.target.value)
                                                    }
                                                    placeholder='Enter the Second Shift Timing'
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="settype">
                        <label htmlFor="type"></label>
                        <div className="type">
                                Permanent 
                                <input type="checkbox" id='type' />
                        </div>
                        <label htmlFor="isActive"></label>
                        <div className="isActive">
                                Active
                                <input type="checkbox" id='isActive'/>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button 
                            type='button'
                            className='cancel-btn'
                            onClick={
                                () => {
                                setBusNo("");
                                setDriverName("");
                                setContactNo("");
                                setStops([{ stopName: "", firstShift: "", secondShift: "" }]);
                            }}
                            >
                            Cancel
                        </button>
                        <button type='submit' className='submit-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBus;