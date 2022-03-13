import "./Card.css";
export default function Card(props) {
  //console.log("in card= " + props.calculate);
  return (
    <div className="card">
      <div className="card-image">
        <img
          width="200px"
          height="100px"
          src={props.item.map_url}
          alt="not found"
        />
      </div>
      <div className="card-content">
        <p>Ride id: {props.item.id}</p>
        <p>Origin station: {props.item.origin_station_code}</p>
        <p>station path: {props.item.station_path}</p>
        <p>Date: {props.item.date}</p>
        <p>Distance: {props.item.distance}</p>
      </div>
    </div>
  );
}
