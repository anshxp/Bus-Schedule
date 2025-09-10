import './Stop.css';
import { Container, Col,Row } from 'react-bootstrap';
const Stop=({index,stopName,first,second})=>{
    return (

        <div className="stop">
            <div className="stop-num">{index}</div>
            <div className="stop-detail">
                <div className="stop-name">{stopName}</div>
                <div className="stop-timing">
                    <div className="first">
                        <div className="clock-icon"><i className="fa-regular clock fa-clock"></i></div>
                        <p className='shift'>First:</p>
                        <p className='time'>{first}</p>
                    </div>
                    <div className="second">
                        <div className="clock-icon"><i className="fa-regular clock fa-clock"></i></div>
                        <p className='shift'>Second:</p>
                        <p className='time'>{second}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Stop;