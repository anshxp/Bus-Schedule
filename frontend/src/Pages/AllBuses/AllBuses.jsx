import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading.jsx";
import './AllBuses.css';
import AllRoute from "../../Components/AllRoute/AllRoute.jsx";
import AllBusBanner from "../../Components/AllBusBanner/AllBusBanner.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

const AllBuses = () => {
  const {admin}=useAuth();
  const [viewtype, setViewType] = useState('list');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/buses") 
      .then(res => res.json())
      .then(data => {
        setBuses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching buses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return(
        <div className="load">
            <Loading />
        </div>
    ) 
  }

  if (!buses.length) return <p className="nobus">No buses found.</p>;

  return (
    <>
      <AllBusBanner />
      <Container className="mt-5">
        <AllRoute viewtype={viewtype} setViewType={setViewType} buses={buses} isAdmin={admin}/>
      </Container>
    </>
  );
};

export default AllBuses;
