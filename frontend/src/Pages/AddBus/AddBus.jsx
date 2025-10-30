import './AddBus.css';
import { API } from '../../utils/api';
import AddBusBanner from '../../Components/AddBusBanner/AddBusBanner.jsx';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBus = () => {
    const navigate = useNavigate();
    const [busNo, setBusNo] = useState("");
    const [DriverName, setDriverName] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [stops, setStops] = useState([
        { stopName: "", firstShift: "", secondShift: "" }
    ]);
    const [type, setType] = useState(false);
    const [isActive, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStop = () => {
        setStops([...stops, { stopName: "", firstShift: "", secondShift: "" }]);
    };

    const handleRemoveStop = (index) => {
        if (stops.length > 1) {
            setStops(stops.filter((_, i) => i !== index));
        }
    };

    const handleStopChange = (index, field, value) => {
        const updatedStops = [...stops];
        updatedStops[index][field] = value;
        setStops(updatedStops);
    };

    const validateForm = () => {
        // Validate bus number
        const busNumber = parseInt(busNo);
        if (!busNo || isNaN(busNumber) || busNumber <= 0) {
            return false;
        }

        // Validate driver name
        if (!DriverName || !DriverName.trim()) {
            return false;
        }

        // Validate contact number
        const contactNumber = parseInt(ContactNo);
        if (!ContactNo || isNaN(contactNumber) || contactNumber <= 0) {
            return false;
        }

        // Validate contact number length (assuming 10 digits)
        if (ContactNo.toString().length < 10) {
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setBusNo("");
        setDriverName("");
        setContactNo("");
        setStops([{ stopName: "", firstShift: "", secondShift: "" }]);
        setType(false);
        setActive(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const busNumber = parseInt(busNo);
        const contactNumber = parseInt(ContactNo);

        // Prepare stops data
        const validStops = stops.filter(stop => stop.stopName && stop.stopName.trim() !== "").map(stop => ({
            stopName: stop.stopName.trim(),
            firstShift: stop.firstShift.trim() || "",
            secondShift: stop.secondShift.trim() || ""
        }));

        const busData = {
            busNo: busNumber,
            DriverName: DriverName.trim(),
            ContactNo: contactNumber,
            type: type ? "permanent" : "temporary",
            isActive: isActive,
            stops: validStops
        };

        try {
            const token = localStorage.getItem('admintoken');
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API}/admin/addbus`, {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(busData),
            });
            let data;
            try {
                data = await res.json();
            } catch (parseError) {
                throw new Error('Invalid response from server',parseError);
            }

            if (res.ok && data.success) {
                const newBusNumber = busNumber;
                resetForm();
                navigate(`/bus/${newBusNumber}`);
            } else {
                const errorMessage = data.message || data.error || 'Unknown error occurred';
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="AddBus">
            <AddBusBanner />
            <div className="AddBus-form">
                <form onSubmit={handleSubmit}>
                    <div className="AddBus-BusInfo">
                        <div className="AddBus-BusInfo-heading">
                            Bus Information
                        </div>
                        <label htmlFor="busNo">Bus Number</label>
                        <input
                            id="busNo"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Enter bus number (e.g., 21)"
                            value={busNo}
                            onChange={(e) => setBusNo(Number(e.target.value))}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="AddBus-DriverInfo">
                        <div className="AddBus-DriverInfo-heading">
                            Driver Information
                        </div>
                        <label htmlFor="DriverName">Driver Name</label>
                        <input
                            id="DriverName"
                            type="text"
                            placeholder="Enter driver's full name"
                            value={DriverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <label htmlFor="ContactNo">Driver Contact Number</label>
                        <input
                            id="ContactNo"
                            type="number"
                            min="1000000000"
                            max="9999999999"
                            placeholder="Enter 10-digit contact number"
                            value={ContactNo}
                            onChange={(e) => setContactNo(Number(e.target.value))}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="AddBus-RouteInfo">
                        <div className="AddBus-RouteInfo-heading">
                            <div className="mainheading">Route Stops</div>
                            <button
                                type="button"
                                className="AddStop-button"
                                onClick={handleStop}
                                disabled={loading}
                            >
                                + Add Stop
                            </button>
                        </div>
                        {stops.map((stop, index) => (
                            <div key={index} className="stop-box">
                                <div className="stop-header">
                                    <h3>Stop {index + 1}</h3>
                                    {stops.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={() => handleRemoveStop(index)}
                                            disabled={loading}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                                <div className="stop-detail">
                                    <label htmlFor={`stopName-${index}`}>Stop Name</label>
                                    <input
                                        id={`stopName-${index}`}
                                        type="text"
                                        value={stop.stopName}
                                        className="stopName"
                                        onChange={(e) =>
                                            handleStopChange(index, "stopName", e.target.value)
                                        }
                                        placeholder="Enter stop name"
                                        disabled={loading}
                                    />
                                    <div className="stop-timings">
                                        <div className="firstshift">
                                            <label htmlFor={`firstShift-${index}`}>First Shift</label>
                                            <input
                                                id={`firstShift-${index}`}
                                                type="text"
                                                value={stop.firstShift}
                                                className="timing"
                                                onChange={(e) =>
                                                    handleStopChange(index, "firstShift", e.target.value)
                                                }
                                                placeholder="e.g., 08:00 AM"
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="secondShift">
                                            <label htmlFor={`secondShift-${index}`}>Second Shift</label>
                                            <input
                                                id={`secondShift-${index}`}
                                                type="text"
                                                className="timing"
                                                value={stop.secondShift}
                                                onChange={(e) =>
                                                    handleStopChange(index, "secondShift", e.target.value)
                                                }
                                                placeholder="e.g., 02:00 PM"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="settype">
                        <div className="type">
                            <label htmlFor="type">Permanent</label>
                            <input 
                                type="checkbox" 
                                id='type'
                                role='switch'
                                className='liquid-3'
                                checked={type}
                                onChange={(e)=>setType(e.target.checked)}/>
                        </div>
                        <div className="isActive">
                            <label htmlFor="isActive">Active</label>
                            <input 
                                type="checkbox" 
                                id='isActive'
                                role='switch'
                                className='liquid-3'
                                checked={isActive}
                                onChange={(e)=>setActive(e.target.checked)}/>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Adding Bus...' : 'Add Bus'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBus;