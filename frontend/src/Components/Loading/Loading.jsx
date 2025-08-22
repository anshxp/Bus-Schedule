import './Loading.css';
const Loading = () => {
  return (
    <div className="loader-container">
    <div className="traffic-light">
        <div className="light-row">
        <div className="light red-light"></div>
        </div>

        <div className="light-row">
        <div className="light yellow-light"></div>
        </div>

        <div className="light-row">
        <div className="light green-light"></div>
        </div>
    </div>
    </div>
  );
}
export default Loading;