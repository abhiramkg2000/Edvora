import "./UpcomingRides.css";
export default function UpcomingRides(props) {
  console.log("UpcomingRides");
  return (
    <div className="center">
      {props.location.state !== true ? <h1>UpcomingRides</h1> : null}
    </div>
  );
}
