import {Navigate} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext.jsx'
import Loading from "../Loading/Loading.jsx";


const ProtectedRoute=({children})=>{
    const {admin,loading}=useAuth();
    if(loading){
        return(
            <div className="load">
                <Loading />
            </div>
        ) 
    }
    if (!admin) {
        return <Navigate to="/admin" replace />;
    }
    return children;
}
export default ProtectedRoute;