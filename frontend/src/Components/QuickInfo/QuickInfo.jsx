import './QuickInfo.css';
const QuickInfo=({BusNumber,totalstops,firstxfirst,secondxfirst})=>{
    return(
        <div className="quickinfo">
            <div className="quickinfo-heading">
                <p>Quick Info</p>
            </div>
            <div className="bus-info">
                <p className='info'>Bus Number</p>
                <p className='quick'>{BusNumber}</p>
            </div>
            <div className="line"></div>
            <div className="bus-info">
                <p className='info'>Total Stops</p>
                <p className='quick'>{totalstops}</p>
            </div>
            <div className="line"></div>
            <div className="bus-info">
                <p className='info'>First Shift</p>
                <p className='quick'>{firstxfirst}</p>
            </div>
            <div className="line"></div>
            <div className="bus-info">
                <p className='info'>Second Shift</p>
                <p className='quick'>{secondxfirst}</p>
            </div>
        </div>
    )
}
export default QuickInfo;