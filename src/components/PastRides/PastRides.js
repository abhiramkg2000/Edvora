import "./PastRides.css";
export default function PastRides(props) {
  console.log("PastRides");
  return (
    <div className="center">
      {props.location.state !== true ? <h1>PastRides</h1> : null}
    </div>
  );
}
