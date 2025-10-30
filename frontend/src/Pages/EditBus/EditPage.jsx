import { useEffect, useState } from 'react';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import EditBusBanner from '../../Components/EditBusBanner/EditBusBanner.jsx';
import { API } from '../../utils/api';
import './EditBus.css';

const EditPage = () => {
    const { busNo } = useParams();
    const navigate = useNavigate();
    const parsedBusNo = parseInt(busNo);
    if (!busNo || isNaN(parsedBusNo) || parsedBusNo <= 0) {
        // Redirect to bus list if invalid bus number
        useEffect(() => {
            navigate("/allbuses");
        }, [navigate]);
        return <div>Invalid bus number</div>;
    }
    
    const [busnumber, setbusnumber] = useState(busNo);
    const [drivername, setdrivername] = useState("");
    const [contact, setcontact] = useState("");
    const [Stops, setStops] = useState([]);
    const [active, setactive] = useState(false);
    const [Type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleStop = () => {
        setStops([...Stops, { stopName: "", firstShift: "", secondShift: "" }]);
    };

    const handleRemoveStop = (index) => {
        if (Stops.length > 1) {
            setStops(Stops.filter((_, i) => i !== index));
        }
    };

    const validateForm = () => {
        const busNum = parseInt(busnumber);
        if (!busnumber || isNaN(busNum) || busNum <= 0) {
            return false;
        }

        if (!drivername || !drivername.trim()) {
            return false;
        }

        const contactNum = parseInt(contact);
        if (!contact || isNaN(contactNum) || contactNum <= 0) {
            return false;
        }

        if (contact.toString().length < 10) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('admintoken');
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API}/admin/${busNo}/editbus`, {
                method: "POST",
                credentials: "include",
                headers: headers,
                body: JSON.stringify({
                    busNo: parseInt(busnumber),
                    DriverName: drivername.trim(),
                    ContactNo: parseInt(contact),
                    stops: Stops,
                    type: Type,
                    isActive: active,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                navigate(`/bus/${busnumber}`);
            } else {
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    const fetchBus = async () => {
        try {
            const res = await fetch(`${API}/buses/${busNo}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (res.ok) {
                const data = await res.json();
                setbusnumber(data.busNo || "");
                setdrivername(data.DriverName || "");
                setcontact(data.ContactNo || "");
                setStops(data.stops || []);
                setType(data.type || "");
                setactive(data.isActive || false);
            } else {
            }
        } catch (err) {
        }
    };

    const handleStopChange = (index, field, value) => {
        const updatedStops = [...Stops];
        updatedStops[index][field] = value;
        setStops(updatedStops);
    };

    const resetForm = () => {
        fetchBus();
        navigate(`/bus/${busNo}`);
    };

    useEffect(() => {
        fetchBus();
    }, [busNo]);

    return (
        <div className="edit-page">
            <EditBusBanner busNo={busNo}/>
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <div className="edit-businfo">
                        <h3>Bus Information</h3>
                        <label htmlFor="busnumber">Bus Number</label>
                        <input 
                            type="number" 
                            id="busnumber"
                            value={busnumber}
                            onChange={(e) => setbusnumber(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    
                    <div className="edit-driverinfo">
                        <h3>Driver Information</h3>                        
                        <div className="edit-drivername">
                            <label htmlFor="drivername">Driver Name</label>
                            <input 
                                type="text" 
                                id="drivername"
                                value={drivername}
                                onChange={(e) => setdrivername(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="edit-drivernumber">
                            <label htmlFor="drivernumber">Contact Number</label>
                            <input 
                                type="number" 
                                id="drivernumber"
                                value={contact}
                                onChange={(e) => setcontact(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="edit-routestops">
                        <div className="edit-routeInfo">
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
                        {Stops.map((stop, index) => (
                            <div className="stop-item" key={index}>
                                <div className="stop-header">
                                    <h5>Stop {index + 1}</h5>
                                    {Stops.length > 1 && (
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
                                <label htmlFor={`stopname-${index}`}>Stop Name</label>
                                <input 
                                    type="text" 
                                    id={`stopname-${index}`}
                                    value={stop.stopName} 
                                    onChange={(e) => handleStopChange(index, "stopName", e.target.value)}
                                    disabled={loading}
                                />
                                <div className="shift-timings">
                                    <div className="first-shift">
                                        <label htmlFor={`firstshift-${index}`}>First Shift</label>
                                        <input 
                                            type="text" 
                                            id={`firstshift-${index}`}
                                            value={stop.firstShift} 
                                            onChange={(e) => handleStopChange(index, "firstShift", e.target.value)}
                                            disabled={loading}
                                            placeholder="e.g., 08:00 AM"
                                        />
                                    </div>
                                    <div className="second-shift">
                                        <label htmlFor={`secondshift-${index}`}>Second Shift</label>
                                        <input 
                                            type="text" 
                                            id={`secondshift-${index}`}
                                            value={stop.secondShift} 
                                            onChange={(e) => handleStopChange(index, "secondShift", e.target.value)}
                                            disabled={loading}
                                            placeholder="e.g., 02:00 PM"
                                        />
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
                                checked={Type === "permanent"}
                                onChange={(e) => setType(e.target.checked ? "permanent" : "temporary")}
                                disabled={loading}
                            />
                        </div>
                        <div className="isActive">
                            <label htmlFor="isActive">Active</label>
                            <input 
                                type="checkbox" 
                                id='isActive'
                                role='switch'
                                className='liquid-3'
                                checked={active}
                                onChange={(e) => setactive(e.target.checked)}
                                disabled={loading}
                            />
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
                            {loading ? 'Updating Bus...' : 'Update Bus'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPage;