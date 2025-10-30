import './RouteBanner.css'
import { useState,useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import { API } from '../../utils/api';
const RouteBanner=({busNumber,totalstops,isActive,type})=>{
    const navigate =useNavigate();
    const [isAdmin,setIsAdmin]=useState(()=>!!localStorage.getItem('admintoken'));
    useEffect(() => {
        setIsAdmin(!!localStorage.getItem("admintoken"));
      }, [location]);
    const DeleteBus=async (busNumber)=>{
        if(!busNumber){
            return;
        }
        
        try{
            const token = localStorage.getItem('admintoken');
            const headers = {
                "Content-Type":"application/json",
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res=await fetch(`${API}/admin/${busNumber}`,{
                method:'DELETE',
                headers: headers,
                credentials:"include"
            });
            
            const data = await res.json();
            
            if (res.ok && data.success) {
                let recentBuses = JSON.parse(localStorage.getItem("recentBuses")) || [];
                recentBuses = recentBuses.filter((bus) => bus.busNo !== parseInt(busNumber));
                localStorage.setItem("recentBuses", JSON.stringify(recentBuses));
                
                navigate('/allbuses');
            } else {
            }
        } catch (err) {
        }
  }
    return(
        <div className="route-banner">
            <div className="route-banner-left">
                <div className="back-button" onClick={()=>{
                    navigate(-1);
                }}>
                    <i className="fa-solid arrow-left fa-arrow-left"></i>
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
                        <div className="routebanner-below">
                            <div className="routebanner-totalstops">
                                {totalstops} Stops
                            </div>
                            <div className="active-status">
                                {isActive?"Active":"Inactive"}
                            </div>
                        </div>
                        <div className="bustype">
                            {type==="permanent"?"Permanent":"Temporary"}
                        </div>
                    </div>
                </div>
            </div>
            {isAdmin && <div className="route-banner-right">
                <button 
                    className='editbus'
                    onClick={()=>navigate(`/bus/${busNumber}/editbus`)}
                    ><MdEdit/> Edit Bus</button>
                <button className='delete-bus' onClick={()=>DeleteBus(busNumber)}><FiTrash2/> Delete Bus</button>
            </div>}
        </div>
    )
}
export default RouteBanner;